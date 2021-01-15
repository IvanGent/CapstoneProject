import React, { useState } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { signUp } from '../../services/auth';
import Forms from './Forms'
import './SignUpForm.css';

const background ={
  visible: { opacity: 1},
  hidden: { opacity: 0}
}

const SignUpForm = ({authenticated, setAuthenticated, showSignUp, setShowSignUp, setShowLogin, setShowForms}) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, firstName, email, password);
      if (!user.errors) {
        setAuthenticated(true);
        setShowForms(false)
        localStorage.setItem("userId", user.id)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = e => {
    setFirstName(e.target.value);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleLoginClick = () => {
    setShowSignUp(false)
    setShowLogin(true)
    return <Forms
      authenticated={authenticated}
      setAuthenticated={setAuthenticated}
      setShowLogin={setShowLogin}
      showSignUp={showSignUp}
      setShowSignUp={setShowSignUp}
    />
    // return history.push('/login')
  }

  if (authenticated) {
    return <Redirect to="/" />;
  }


  return (
    <AnimatePresence exitBeforeEnter>÷
      {/* <> */}
      {showSignUp && (
      // <motion.div className='formContainer'
      //   variants={background}
      //   initial='hidden'
      //   animate='visible'
      // >
        <motion.div className='signupModal'
          variants={background}
          initial='hidden'
          animate='visible'>
          <form  className='signupForm' onSubmit={onSignUp}>
            <div className='innerSignup'>
            <div>
              {/* <label>Username</label> */}
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
                placeholder='Username'
              ></input>
            </div>
            <div>
              {/* <label>First Name</label> */}
              <input
                type="text"
                name="first_name"
                onChange={updateFirstName}
                value={firstName}
                placeholder='First Name'
              ></input>
            </div>
            <div>
              {/* <label>Email</label> */}
              <input
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
                placeholder='Email'
              ></input>
            </div>
            <div>
              {/* <label>Password</label> */}
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
                placeholder='Password'
              ></input>
            </div>
            <div>
              {/* <label>Confirm Password</label> */}
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
                placeholder='Confirm Password'
              ></input>
            </div>
            <button type="submit">Sign Up</button>
          <div id='loginClick' onClick={handleLoginClick}>Have an account? Login</div>
            </div>
          </form>
        </motion.div>
      // </motion.div>
      )}
    </AnimatePresence>
    // {/* </> */}
  );
};

export default SignUpForm;
