import React, { Component } from "react";
// import { axiosInstance } from "../../utils/API";
import axios from "axios";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      registrationErrors: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { username, email, password, passwordConfirmation } = this.state;

    axios
      .post(
        "http://localhost:3001/api/v1/registrations",
        {
          user: {
            name: username,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 201) {
          this.props.handleLogin(response.data);
          this.redirect();
        } else {
          console.log(response);
          this.setState({
            errors: response.data.errors,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  redirect = () => {
    this.props.history.push("/");
  };

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map((error, index) => {
            return <li key={index}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <Container>
        <h1>Sign Up</h1>

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

          <Button type="submit">Sign Up</Button>
        </form>
        <div>
          or <Link to="/login">Log In</Link>
        </div>
        <div>{this.state.errors ? this.handleErrors() : null}</div>
      </Container>
    );
  }
}

export default Signup;
