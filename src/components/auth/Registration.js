import React, { Component } from "react";
// import { axiosInstance } from "../../utils/API";
import axios from "axios";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      registrationErrors: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    const { username, email, password, passwordConfirmation } = this.state;

    axios
      .post(
        "http://localhost:3001/api/v1/registrations",
        {
          user: {
            name: username,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange}
          required
        ></input>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
          required
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        ></input>
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Password Confirmation"
          value={this.state.passwordConfirmation}
          onChange={this.handleChange}
          required
        ></input>

        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

export default Registration;
