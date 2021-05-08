import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { BrowserRouter, Route} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import * as sessionActions from './store/session';
import * as formActions from './store/formModals';
import ProtectedRoute from './components/auth/ProtectedRoute';
import NavBar from "./components/NavBar/NavBar";
import User from "./components/User/User";
import HomePage from './components/HomePage/HomePage';
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
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false);
  const showLogin = useSelector(state => state.forms.showLogin);
  const showSignUp = useSelector(state => state.forms.showSignUp);
  const [showForms, setShowForms] = useState(false);
  const [showRoll, setShowRoll] = useState(false);

  //            MAIN THING TO TAKE CARE OF
  // Session has user and user info so if late you add friends, check the session id against
  // the url param and if they === then just use the data from session instead of make a fetch call.

  useEffect(() => {
    (async() => {
      const user = await dispatch(sessionActions.authenticate())
      if (!user.errors) {
        setAuthenticated(true);
        setShowHomePage(true);
      } 
    })();
    setLoaded(true);
    setShowRoll(false)
  }, [dispatch]);

  const homeBody = (
    // HOMEPAGE NEEDS TO BE FIXED WHEN IT COMES TO MOBILE
    <HomePage 
      showRoll={showRoll} 
      setShowRoll={setShowRoll} 
      setShowHomePage={setShowHomePage}
    />
  )

  const handleForms = () => {
    setShowForms(true)
    return dispatch(formActions.showLogin());
  }


  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
    {/* NAVBAR NEEDS TO BE WORKED WITH MOBILE SIZE */}
      <NavBar
        authenticated={authenticated} 
        setAuthenticated={setAuthenticated} 
        setShowForms={setShowForms}
        setShowHomePage={setShowHomePage}
        setShowRoll={setShowRoll}
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
            onClick={handleForms}
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
              setShowForms={setShowForms}
              setShowHomePage={setShowHomePage}
            />
          )}
          {showSignUp && (
            <SignUpForm
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
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