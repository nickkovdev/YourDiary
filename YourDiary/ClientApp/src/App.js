import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import {
  Nav,
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";
import Editor from "./components/editor/Editor";
import Drafts from "./components/diary/Drafts";
import EntryCard from "./components/diary/EntryCard";
import Published from "./components/diary/Published";

const App = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <Navbar bg="dark" expand="lg">
          <Navbar.Brand>
            <Link to={"/home"} className="navbar-brand">
              YourDiary
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {currentUser ? (
                <Nav.Link>
                  <Link to={"/home"} className="nav-link">
                    Diary
                  </Link>
                </Nav.Link>
              ) : (
                <div></div>
              )}
              {currentUser ? (
                <Nav.Link className="text-light">
                  <Link to={"/editor"} className="nav-link">
                    New Entry
                  </Link>
                </Nav.Link>
              ) : (
                <div></div>
              )}
            </Nav>
            {currentUser ? (
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search for Diary Entries"
                  className="mr-sm-2 search"
                />
                <Button variant="outline-light">Search</Button>
              </Form>
            ) : (
              <div></div>
            )}
            
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    Exit
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Register
                  </Link>
                </li>
              </div>
            )}
          </Navbar.Collapse>
        </Navbar>
        {currentUser ? (
              <Navbar bg="secondary" className="secondNav">
                <Nav.Link>
                  <Link to={"/drafts"} className="nav-link">
                    Drafts
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to={"/published"} className="nav-link">
                    Published
                  </Link>
                </Nav.Link>
              </Navbar>
            ) : (
              <div></div>
            )}
        <div className="container mt-4">
          <Switch>
            <Route exact path={"/home"} component={Home} />
            <Route exact path={["/", "/login"]} component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/editor" component={Editor} />
            <Route exact path="/drafts" component={Drafts} />
            <Route exact path="/published" component={Published} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
