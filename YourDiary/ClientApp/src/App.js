import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";

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
import Published from "./components/diary/Published";
import Entry from "./components/diary/Entry";
import EditEntry from "./components/editor/EditEntry";

const App = () => {
  const [term, setTerm] = useState("");
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

  const handleChange = (e) => {
    const termValue = e.target.value;
    setTerm(termValue);
  };

  const handleSubmit = (term) => {
    console.log(term)
  }

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <Router history={history}>
      <div>
        <Navbar bg="dark" expand="lg" >
          <Navbar.Brand>
            <Link to={"/home"} className="navbar-brand">
              YourDiary
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {currentUser ? (
                <Link to={"/home"} className="nav-link">
                  Diary
                </Link>
              ) : (
                <div></div>
              )}
              {currentUser ? (
                <Link to={"/editor"} className="nav-link">
                  New Entry
                </Link>
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
                  value={term}
                  onChange={handleChange}
                />
                <Button variant="outline-light" onClick={handleSubmit(term)} onSubmit={handleSubmit(term)}>Search</Button>
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
            <Link to={"/drafts"} className="nav-link">
              Drafts
            </Link>
            <Link to={"/published"} className="nav-link">
              Published
            </Link>
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
            <Route exact path="/entry/:id" children={<Entry />} component={Entry} />
            <Route exact path="/edit/:id" children={<EditEntry />} component={EditEntry} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
