import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';

class PageLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value, error: '' });

  login = async () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      await this.props.firebase.login(credentials);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h2>Login</h2>
        <div>
          <div>{this.state.error}</div>
          <input
            name="email"
            onChange={this.handleChange}
            placeholder="Email"
            value={this.state.email}
          />
          <br />
          <input
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            type="password"
            value={this.state.password}
          />
        </div>
        <br />
        <button onClick={this.login}>Login!</button>
        <hr />
        <Link to="/">Home</Link>
        <br />
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isLoggedIn: state.firebase.auth.uid };
};

export default compose(firebaseConnect(), connect(mapStateToProps))(PageLogin);
