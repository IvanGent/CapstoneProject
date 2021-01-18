import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { login } from "../../services/auth";
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


const LoginForm = ({ authenticated, setAuthenticated, showLogin, setShowLogin, setShowSignUp, setShowForms, setShowHomePage}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      setShowLogin(false)
      setShowForms(false)
      setShowHomePage(true)
      localStorage.setItem("userId", user.id)
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

  // if (authenticated) {
  //   return <Redirect to="/" />;
  // }


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
                <button type="submit">Login</button>
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
