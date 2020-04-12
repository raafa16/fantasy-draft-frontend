import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Container from "react-bootstrap/Container";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    this.loginStatus();
    console.log(this.state.user);
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  };

  loginStatus = () => {
    axios
      .get("http://localhost:3001/api/v1/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          this.handleLogin(response.data);
        } else {
          this.handleLogout();
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  render() {
    return (
      <Container className="App">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <NavigationBar
                  {...props}
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(props) => (
                <div>
                  <NavigationBar
                    {...props}
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                  <Login
                    {...props}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                </div>
              )}
            />
            <Route
              exact
              path="/signup"
              render={(props) => (
                <div>
                  <NavigationBar
                    {...props}
                    user={this.state.user}
                    handleLogout={this.handleLogout}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                  <Signup
                    {...props}
                    handleLogin={this.handleLogin}
                    loggedInStatus={this.state.isLoggedIn}
                  />
                </div>
              )}
            />
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
