import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path={"/"} component={Home}></Route>
            <Route exact path={"/dashboard"} component={Dashboard}></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
