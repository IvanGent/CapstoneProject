
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
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


const NavBar = ({ authenticated, setAuthenticated, setShowLogin, setShowSignUp, setShowForms, setShowHomePage, setShowRoll, setShowProfilePage, mobileSize, setShowFriends, setShowVisited, setShowFaves }) => {
  const [user, setUser] = useState("");
  

  useEffect(() => {
    setUser(localStorage.getItem('userId'))
  }, [])


  const theStart = () => {
    setShowForms(true)
  }

  const handleSignupClick = () => {
    theStart()
    setShowLogin(false)
    setShowSignUp(true)
  }

  const handleLoginClick = () => {
    theStart();
    setShowSignUp(false);
    setShowLogin(true);
  }

  const handleClick = () => {
    setShowRoll(false);
    setShowProfilePage(false)
    setShowHomePage(true);
  }


  return (
      <AnimatePresence>
    <motion.nav
      variants={Nav}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      {!mobileSize ? (
        <div className='nav'>
      <h1 onClick={handleClick}>What-To-Bite</h1>
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
                user={user} 
                setAuthenticated={setAuthenticated} 
                setShowHomePage={setShowHomePage} 
                setShowRoll={setShowRoll}
                setShowProfilePage={setShowProfilePage}
                mobileSize={mobileSize}
                setShowFriends={setShowFriends}
                setShowFaves={setShowFaves}
                setShowVisited={setShowVisited}
                />
            </li>
          </>
        )}
      </ul>
      </div>
      ) : (
        <div className='nav'>
          <h1 onClick={handleClick}>What-To-Bite</h1>
            {!authenticated ? (
              <>
                  <h1 onClick={handleClick}>What-To-Bite</h1>
              </>
            ) : (
                <>
                  <li>
                    <ProfileMenu
                      user={user}
                      setAuthenticated={setAuthenticated}
                      setShowHomePage={setShowHomePage}
                      setShowRoll={setShowRoll}
                      setShowProfilePage={setShowProfilePage}
                      mobileSize={mobileSize}
                      setShowFriends={setShowFriends}
                      setShowFaves={setShowFaves}
                      setShowVisisted={setShowVisited}
                    />
                  </li>
                </>
              )}
        </div>
      )}
    </motion.nav>
      </AnimatePresence>
  );
}

export default NavBar;