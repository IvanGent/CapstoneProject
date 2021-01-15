import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import HomePage from './components/HomePage/HomePage';
import { authenticate } from "./services/auth";
import BackgroundImage from './components/HomePage/back.jpg';
import Main from './images/mainPage.jpg';
import Forms from "./components/auth/Forms";

const OpenModalButton = styled(motion.button)`
  position: absolute;
  margin-left: 44%;
  margin-top: 30%;
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
  const [showButton, setShowButton] = useState(true);
  const [showHomePage, setShowHomePage] = useState(false);
  const [showForms, setShowForms] = useState(false)
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setShowForms(false)
        setAuthenticated(true);
        setShowHomePage(true)

      }
      setLoaded(true);
      setShowButton(true)
      setShowForms(false)
    })();
  }, []);


  const handleLogin = () => {
    setShowButton(false)
    setShowForms(true)
    setShowLogin(true)
  }


  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar 
        authenticated={authenticated} 
        setAuthenticated={setAuthenticated} 
        setShowButton={setShowButton}
        showForms={showForms}
        setShowForms={setShowForms}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setShowSignUp={setShowSignUp}
        showSignUp={showSignUp}
        />
      {/* {show && !authenticated ? ( */}
        {/* <img id='background' src={Main} alt='Background' /> */}
      {/* ) : null
      } */}
      <Route path='/' exact={true} >
      {showButton && !authenticated ? (
        <OpenModalButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9}} onClick={handleLogin}>Don't Know Where To Eat?</OpenModalButton>
      ) 
      : null }
        <Forms 
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
          showForms={showForms}
          setShowForms={setShowForms}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setShowSignUp={setShowSignUp}
          showSignUp={showSignUp}
          />
      </Route>
      <Route path="/users/:userId" exact={true} authenticated={authenticated}>
        <User authenticated={authenticated}/>
      </Route>
      <Route path='/' exact={true}>
        {authenticated && showHomePage ? (
          <HomePage setShowForms={setShowForms} />
        ): null}
      </Route>
      {/* <ProtectedRoute path="/" exact={true} authenticated={authenticated}> */}
        {/* <h1>My Home Page</h1> */}
        {/* {authenticated ? (
       <HomePage setShowForms={setShowForms} />
        ) : null } */}
      {/* </ProtectedRoute> */}
    </BrowserRouter>
  );
}

export default App;
