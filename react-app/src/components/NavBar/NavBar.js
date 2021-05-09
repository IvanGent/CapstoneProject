import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import * as formActions from '../../store/formModals';
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import './NavBar.css'

const Nav = {
  visible: {
    opacity: 1,
    transition: {
      delay: 1
    }
  },
  hidden: {
    opacity: 0,
  },
  exit: {
    opacity: 1,
  }
}


const NavBar = ({ authenticated, setAuthenticated, setShowForms, setShowHomePage, setShowRoll}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const theStart = () => setShowForms(true)

  const handleSignupClick = () => {
    theStart()
    return dispatch(formActions.showSignUp());
  }

  const handleLoginClick = () => {
    theStart();
    return dispatch(formActions.showLogin());
  }

  const handleHomeClick = () => history.push('/');

  return (
      <AnimatePresence>
    <motion.nav
      variants={Nav}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
        <div className='nav'>
      <h1 onClick={handleHomeClick}>What-To-Bite</h1>
      <ul className='navMenu'>
        {!authenticated ? (
          <>
        <li>
          <h3 onClick={handleLoginClick}>Login</h3>
        </li>
        <li>
          <h3 onClick={handleSignupClick}>Sign Up</h3>
        </li>
        </>
        ) : (
          <>
            <li>
              <ProfileMenu  
                setAuthenticated={setAuthenticated} 
                setShowHomePage={setShowHomePage} 
                setShowRoll={setShowRoll}
              />
            </li>
          </>
        )}
      </ul>
      </div>
    </motion.nav>
      </AnimatePresence>
  );
}

export default NavBar;