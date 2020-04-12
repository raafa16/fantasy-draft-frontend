import React from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = (props) => {
  const handleClick = () => {
    axios
      .delete("http://localhost:3001/api/v1/logout", { withCredentials: true })
      .then((response) => {
        props.handleLogout();
        props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Fantasy Draft</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {props.loggedInStatus ? (
              <Nav.Link href="/drafts">Drafts</Nav.Link>
            ) : null}
          </Nav>
          <Nav>
            {props.loggedInStatus ? (
              <>
                <Navbar.Text>
                  Logged in as: <strong>{props.user.name}</strong>
                </Navbar.Text>
                <Nav.Link onClick={handleClick}>Log Out</Nav.Link>
              </>
            ) : (
              <Nav.Link href="/login">Log In</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default NavigationBar;
