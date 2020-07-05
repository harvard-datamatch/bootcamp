import React from 'react';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Homepage = props => {
  if (!isLoaded(props.homepage)) {
    return <div>Loading...</div>;
  }

  const decks = Object.keys(props.homepage).map(deckId => {
    const deck = props.homepage[deckId];
    if (deck.visibility === 'private' && deck.owner !== props.isLoggedIn) {
      return null;
    }
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
      {props.isLoggedIn ? (
        <div>
          <div>{props.email}</div>
          <button onClick={() => props.firebase.logout()}>Logout</button>
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
};

const mapStateToProps = state => {
  return {
    homepage: state.firebase.data.homepage,
    email: state.firebase.auth.email,
    isLoggedIn: state.firebase.auth.uid,
  };
};

export default compose(
  firebaseConnect(['/homepage']),
  connect(mapStateToProps),
)(Homepage);
