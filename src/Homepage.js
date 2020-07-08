import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const getHomepage = this.props.firebase
      .functions()
      .httpsCallable('getHomepage');
    const homepage = await getHomepage();
    this.setState({ homepage: homepage.data });
  }

  render() {
    if (!isLoaded(this.state.homepage)) {
      return <div>Loading...</div>;
    }

    const decks = Object.keys(this.state.homepage).map(deckId => {
      const deck = this.state.homepage[deckId];
      return (
        <div key={deckId}>
          <Link to={`/viewer/${deckId}`}>{deck.name}</Link>
        </div>
      );
    });

    return (
      <div>
        <h2>Homepage</h2>
        <Link to="/editor">Create a new flashcards deck!</Link>
        <h3>Flashcards</h3>
        {decks}
        <h3>Account</h3>
        {this.props.isLoggedIn ? (
          <div>
            <div>{this.props.email}</div>
            <button onClick={() => this.props.firebase.logout()}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/register">Register</Link>
            <br />
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.firebase.auth.email,
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default compose(firebaseConnect(), connect(mapStateToProps))(Homepage);
