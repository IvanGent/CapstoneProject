import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { login } from "../../services/auth";
import './LoginForm.css'
import Forms from "./Forms";
import SignUpForm from "./SignUpForm";
import HomePage from "../HomePage/HomePage";


const background = {
  visible: {
     opacity: 1,
     x: 0,
     transition: {
       duration: .25,
     }
    },
  hidden: { 
    opacity: 0,
    x: -1100,
  }
}


const LoginForm = ({ authenticated, setAuthenticated, showLogin, setShowLogin, setShowSignUp, setShowForms}) => {
  // const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      setShowForms(false)
      localStorage.setItem("userId", user.id)
      // return <HomePage authenticated={authenticated} setShowForms={setShowForms} />
      return <Redirect to='/' />
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
    return <Forms 
      authenticated={authenticated}
      setAuthenticated={setAuthenticated}
      showLogin={showLogin}
      setShowLogin={setShowLogin}
      setShowSignUp={setShowSignUp}
      />
  }

  if (authenticated) {
    // setShowForms(false)
    // return <HomePage authenticated={authenticated} setShowForms={setShowForms} />
    return <Redirect to="/" />;
  }


  return (
    <AnimatePresence exitBeforeEnter>
    {/* <> */}
      {showLogin && (
        // <motion.div className='formContainer'
        //   variants={background}
        //   initial='hidden'
        //   animate='visible'
        // >
          <motion.div className='loginModal'
            variants={background}
            initial='hidden'
            animate='visible'
            exit={{ y: -1100, opacity: 0}}
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
      {/* {showSignUp && (
      <SignUpForm 
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
        setShowLogin={setShowLogin}/>
      )} */}
    {/* </> */}
    </AnimatePresence>
  );
};

export default LoginForm;
