import React from 'react';
import { firebaseConnect } from 'react-redux-firebase';

class PageRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value, error: '' });

  register = async () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };

    try {
      await this.props.firebase.createUser(credentials);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    return (
      <div>
        <h2>Register</h2>
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
        <button onClick={this.register}>Register!</button>
      </div>
    );
  }
}

export default firebaseConnect()(PageRegister);
