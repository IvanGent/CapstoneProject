import React, { useState, useEffect } from "react";
import { BrowserRouter, Route} from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import NavBar from "./components/NavBar/NavBar";
import User from "./components/User/User";
import HomePage from './components/HomePage/HomePage';
import { authenticate } from "./services/auth";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";

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
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [showRoll, setShowRoll] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        setShowHomePage(true);
        setShowButton(false)
      } else {
        setShowButton(true);
      }
    })();
    setLoaded(true);
  }, []);


  const handleLogin = () => {
    setShowForms(true)
    setShowButton(false)
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
        setShowForms={setShowForms}
        setShowButton={setShowButton}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setShowSignUp={setShowSignUp}
        showSignUp={showSignUp}
        setShowHomePage={setShowHomePage}
        />
        <img id='background' src={process.env.PUBLIC_URL + '/NewBack.jpg'} alt='Background' />
      <Route path='/' exact={true} >
      {showButton && !authenticated ? (
        <OpenModalButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9}} onClick={handleLogin}>Don't Know Where To Eat?</OpenModalButton>
      ) : (
        null
      )}
      {showHomePage && (
          <HomePage showRoll={showRoll} setShowRoll={setShowRoll} />
      )}
      {showForms && (
        <motion.div className='formContainer'>
          <LoginForm 
            authenticated={authenticated}
            setAuthenticated={setAuthenticated} 
            showLogin={showLogin} 
            setShowLogin={setShowLogin}
            setShowSignUp={setShowSignUp}
            setShowForms={setShowForms}
            setShowHomePage={setShowHomePage}
            />
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setShowLogin={setShowLogin}
            setShowSignUp={setShowSignUp}
            showSignUp={showSignUp}
            setShowForms={setShowForms}
            setShowHomePage={setShowHomePage}
          />
        </motion.div> 
      )}
        {/* {authenticated && showHomePage ? (
          <HomePage />
        ): null} */}
      </Route>
      <Route path="/users/:userId" exact={true} authenticated={authenticated}>
        <User authenticated={authenticated}/>
      </Route>
      <Route path='/' exact={true}>
      </Route>
    </BrowserRouter>
  );
}

export default App;
