import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../../context/authContext";

export function Navigation(props) {
  const { authObj, dispatch } = useAuth();

  function logout(e) {
    e.preventDefault();
    dispatch({ type: "cleanUser" });
    return true;
  }

  return (
    <header>
      <Navbar className="navbar-dark bg-primary" collapseOnSelect  expand="md">
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link eventKey="1" as={Link} to="/">Home</Nav.Link>
            <Nav.Link eventKey="3" as={Link} to="/about">About</Nav.Link>
            <Nav.Link eventKey="2" as={Link} to="/dashboard">Dashboard</Nav.Link>
            {
              (authObj && authObj.user && /^\d+$/.test(authObj.user.userId))
              ?
                <Nav.Link eventKey="4" onClick={logout} as={Link} to="/">
                  Logout
                </Nav.Link>
              :
                <Nav.Link eventKey="4" as={Link} to="/auth/login">Login</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}