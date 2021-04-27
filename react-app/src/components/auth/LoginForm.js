import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import * as sessionActions from '../../store/session';
// import { login } from "../../services/auth";
import './LoginForm.css'

const background = {
  visible: {
     opacity: 1,
     x: 0,
     transition: {
       duration: .25,
       delay: .5,
     }
    },
  hidden: { 
    opacity: 0,
    x: -1000,
  },
  exit: {
    opacity: 0,
    x: -1000,
    transition: {
      duration: .25,
    }
  }
}

const LoginButton = {
  hover: {
    scale: 1.1
  },
  tap: {
    scale: 0.8
  }
}

const LoginForm = ({ setAuthenticated, showLogin, setShowLogin, setShowSignUp, setShowForms, setShowHomePage}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(sessionUser)

  const onLogin = async (e) => {
    e.preventDefault();
    // const user = await login(email, password);
    const user = dispatch(sessionActions.login({email, password}))
    if (!user.errors) {
      setAuthenticated(true);
      setShowLogin(false)
      setShowForms(false)
      setShowHomePage(true)
      localStorage.setItem("userId", user.id)
      localStorage.setItem("currUser", user.id)
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupClick = () => {
    setShowLogin(false)
    setShowSignUp(true)
  }

  const LoginDemo = async (e) => {
    e.preventDefault();
    // const user = await login('demo@aa.io', 'password')
    const demoCredentials = {email: 'demo@aa.io', password: 'password'}
    const user = await dispatch(sessionActions.login(demoCredentials))
    console.log('THIS IS FOR THE USER', user)
    setAuthenticated(true);
    setShowLogin(false)
    setShowForms(false)
    setShowHomePage(true)
    localStorage.setItem("userId", user.id)
    localStorage.setItem("currUser", user.id)
  }

  return (
    <AnimatePresence exitBeforeEnter>
    {/* <> */}
      {showLogin && (
          <motion.div className='loginModal'
            variants={background}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <form className='loginForm' onSubmit={onLogin}>
              <div className='innerLogin'>
              <div className='errors'>
                {errors.map((error, i) => (
                  // console.log(error)
                  <div key={i}>{error}</div>
                  
                ))}
              </div>
                {/* <label htmlFor="email">Email</label> */}
              <div>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={updateEmail}
                />
              </div>
                {/* <label htmlFor="password">Password</label> */}
              <div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={updatePassword}
                />
              </div>
                  <motion.button
                    variants={LoginButton}
                    whileHover='hover'
                    whileTap='tap'
                    type='submit'
                  >
                    Login
                  </motion.button>
                  <motion.button
                    variants={LoginButton}
                    whileHover='hover'
                    whileTap='tap'
                    type='submit'
                    id='demo'
                    onClick={LoginDemo}
                  >
                    Login Demo
                  </motion.button>
                {/* <button type="submit">Login</button> */}
              <div id='signupClick' onClick={handleSignupClick}>Don't have an account? Sign Up</div>
              </div>
            </form>
          </motion.div>
        // </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginForm;
