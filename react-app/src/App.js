import React, { useState, useEffect } from "react";
import { BrowserRouter, Route} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from "./components/NavBar/NavBar";
import User from "./components/User/User";
import HomePage from './components/HomePage/HomePage';
import { authenticate } from "./services/auth";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";


// Framer Motion animations
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

const mainButton = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: .5
    }
  }, 
  hidden: {
    opacity: 0,
    y: 100
  },
  exit: {
    opacity: 0
  },
  tap: {
    scale: .9
  },
  hover: {
    scale: 1.1,
    spring: 2
  }
}

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [showRoll, setShowRoll] = useState(false);
  const [mobileSize, setMobileSize] = useState(false);

  useEffect(() => {
    (async() => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        setShowHomePage(true);
      } 
    })();
    setLoaded(true);
    setShowRoll(false)
    setMobileSize(false)
  }, []);

  const homeBody = (
    <HomePage 
      showRoll={showRoll} 
      setShowRoll={setShowRoll} 
      mobileSize={mobileSize} 
      setShowHomePage={setShowHomePage}
    />
  )


  const handleLogin = () => {
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
        setShowForms={setShowForms}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setShowSignUp={setShowSignUp}
        showSignUp={showSignUp}
        setShowHomePage={setShowHomePage}
        setShowRoll={setShowRoll}
        mobileSize={mobileSize}
        />
      <div id='background'>
        <ProtectedRoute path='/users/:id' authenticated={authenticated}>
          <User />
        </ProtectedRoute>
      <Route path='/' exact={true} >
      {!showForms && !authenticated && (
      <div className='splash'>
          <motion.h1
            variants={main}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            Not Sure What To Eat? We'll Pick For You
          </motion.h1>
          <motion.button
            variants={mainButton}
            initial='hidden'
            animate='visible'
            exit='exit'
            whileTap='tap'
            whileHover='hover'
            onClick={handleLogin}
          >
            Get Started?
          </motion.button>
        </div>
      )}

      {showHomePage && homeBody}
      {showForms && (
        <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          exit={{ opacity: 0}}
          className='formContainer'
        >
          {showLogin && (
            <LoginForm 
              authenticated={authenticated}
              setAuthenticated={setAuthenticated} 
              showLogin={showLogin} 
              setShowLogin={setShowLogin}
              setShowSignUp={setShowSignUp}
              setShowForms={setShowForms}
              setShowHomePage={setShowHomePage}
            />
          )}
          {showSignUp && (
            <SignUpForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              setShowLogin={setShowLogin}
              setShowSignUp={setShowSignUp}
              showSignUp={showSignUp}
              setShowForms={setShowForms}
              setShowHomePage={setShowHomePage}
            />
          )}
        </motion.div> 
        </AnimatePresence>
      )}
      </Route>
    </div>
    </BrowserRouter>
  );
}

export default App;