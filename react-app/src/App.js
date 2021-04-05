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
  const [showButton, setShowButton] = useState(true);
  const [showHomePage, setShowHomePage] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showForms, setShowForms] = useState(false);
  const [showRoll, setShowRoll] = useState(false);
  const [mobileSize, setMobileSize] = useState(false);
  const [showProfilePage, setShowProfilePage] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showVisited, setShowVisited] = useState(false);
  const [showFaves, setShowFaves] = useState(false);


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
    setMobileSize(false)
    if(Number(window.screen.width) < 900) {
      setMobileSize(true);
    }
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
        mobileSize={mobileSize}
        setShowProfilePage={setShowProfilePage}
        setShowFriends={setShowFriends}
        setShowFaves={setShowFaves}
        setShowVisited={setShowVisited}
        />
      <div id='background'>
        <ProtectedRoute path='/users/:userId' authenticated={authenticated}>
          <User />
        </ProtectedRoute>
      <Route path='/' exact={true} >
      {showHomePage && !authenticated ? (
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .5 } }}
            exit={{ opacity: 0 }}
            // whileHover={{ scale: 1. }}
            whileTap={{ scale: 1.5 }}
            onClick={handleLogin}>Get Started?
          </motion.button>
        </div>
      ) : (
        <>
      {showHomePage && (
          <HomePage 
            showRoll={showRoll} 
            setShowRoll={setShowRoll} 
            mobileSize={mobileSize} 
            setShowHomePage={setShowHomePage}
            setShowProfilePage={setShowProfilePage}
            setShowVisited={setShowVisited}
            setShowFriends={setShowFriends}
            />
      )}
      {showForms && (
        <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          exit={{ opacity: 0}}
          className='formContainer'
        >
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
        </AnimatePresence>
      )}
      </>
      )}
        {/* {authenticated && showHomePage ? (
          <HomePage />
        ): null} */}
        {/* {showProfilePage && 
        <User 
          authenticated={authenticated} 
          showRoll={showRoll} 
          setShowRoll={setShowRoll} 
          mobileSize={mobileSize} 
          showFriends={showFriends}
          showVisited={showVisited}
          showFaves={showFaves}
          setShowFriends={setShowFriends}
          setShowFaves={setShowFaves}
          setShowVisited={setShowVisited}
          setShowProfilePage={setShowProfilePage}
          />
        } */}
      </Route>
    </div>
    </BrowserRouter>
  );
}

export default App;
