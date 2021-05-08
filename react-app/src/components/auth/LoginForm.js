import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {motion, AnimatePresence} from "framer-motion";
import * as sessionActions from '../../store/session';
import * as formActions from '../../store/formModals';
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
}

const LoginButton = {
  hover: {
    scale: 1.1
  },
  tap: {
    scale: 0.8
  }
}

const LoginForm = ({ setAuthenticated, setShowForms, setShowHomePage}) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoodLogin = (user) => {
    setAuthenticated(true);
    setShowForms(false)
    setShowHomePage(true)
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await dispatch(sessionActions.login({email, password}))
    if (!user.errors) {
      handleGoodLogin(user);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = e => setEmail(e.target.value);

  const updatePassword = e => setPassword(e.target.value);

  const handleSignupClick = () => dispatch(formActions.showSignUp());

  const LoginDemo = async (e) => {
    e.preventDefault();
    const demoCredentials = {email: 'demo@aa.io', password: 'password'}
    const user = await dispatch(sessionActions.login(demoCredentials))
    handleGoodLogin(user);
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div className='loginModal'
        variants={background}
        initial='hidden'
        animate='visible'
      >
        <form className='loginForm' onSubmit={onLogin}>
          <div className='innerLogin'>
            <div className='errors'>
              {errors.map((error, i) => (
                <div key={i}>{error}</div>
                
              ))}
            </div>
            <div>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
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
            <div id='signupClick' onClick={handleSignupClick}>Don't have an account? Sign Up</div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginForm;
