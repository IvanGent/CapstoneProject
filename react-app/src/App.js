import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import HomePage from './components/HomePage/HomePage';
import { authenticate } from "./services/auth";
import BackgroundImage from './components/HomePage/StockSnap_N0KS0SFLO2.jpg';
import Main from './images/mainPage.jpg';

const OpenModalButton = styled(motion.button)`
  position: absolute;
  margin-left: 47%;
  margin-top: 35%;
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 20px;
  border: none;
  background-color: rgba(220, 0, 0, 0.9);
  color: white;
  outline: none;
  box-shadow: -3px -5px 20px 10px whitesmoke;
`;

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
      setShow(true)
    })();
  }, []);



  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      {/* {show && !authenticated ? ( */}
        <img src={Main} alt='Background' />
      {/* ) : null
      } */}
      <Route path='/' exact={true} >
      {show && !authenticated ? (
        <>
      <NavLink to='/login'>
        <OpenModalButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9}}>Don't Know Where To Eat?</OpenModalButton>
      </NavLink>
        </>
      ) 
      : null}
      </Route>
      <Route path="/login" exact={true}>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/sign-up" exact={true}>
        <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
      <Route path="/users/:userId" exact={true} authenticated={authenticated}>
        <User authenticated={authenticated}/>
      </Route>
      <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
        {/* <h1>My Home Page</h1> */}
        {authenticated ? (
          <HomePage />
        ) : null }
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
