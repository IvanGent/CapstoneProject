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
  font-size: 1.2rem;
  padding: 20px;
  border-radius: 20px;
  border: none;
  background-color: rgba(220, 0, 0, 0.9);
  color: white;
  outline: none;
  width: 200px;
  box-shadow: -3px -5px 20px 10px whitesmoke;
`;

const main = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: .5,
    }
  },
  hidden: {
    y: -1000,
    opacity: 0
  },
  exit: {
    opacity: 0
  }
}

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
    setShowRoll(false)
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
        setShowRoll={setShowRoll}
        />
    <div id='background'>
        {/* <img id='background' src={process.env.PUBLIC_URL + '/NewBack.jpg'} alt='Background' /> */}
      <Route path='/' exact={true} >
      {showButton && !authenticated ? (
        <div className='splash'>
          <motion.h1
            variants={main}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            Not Sure What To Eat? We'll Pick For You
          </motion.h1>
          <OpenModalButton 
            initial={{ opacity: 0 }}
            animate={{opacity: 1, transition: {duration: .5} }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9}} 
            onClick={handleLogin}>Get Started?</OpenModalButton>
        </div>
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
        <User authenticated={authenticated} showRoll={showRoll} setShowRoll={setShowRoll} />
      </Route>
      <Route path='/' exact={true}>
      </Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
