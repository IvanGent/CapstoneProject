
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import './NavBar.css'


const NavBar = ({ authenticated, setAuthenticated, setShowButton, setShowLogin, setShowSignUp, setShowForms, setShowHomePage, setShowRoll }) => {
  const [user, setUser] = useState("");
  

  useEffect(() => {
    setUser(localStorage.getItem('userId'))
  }, [])


  const theStart = () => {
    setShowButton(false)
    setShowForms(true)
  }

  const handleSignupClick = () => {
    theStart()
    setShowLogin(false)
    setShowSignUp(true)
  }

  const handleLoginClick = () => {
    theStart()
    setShowSignUp(false)
    setShowLogin(true)
  }

  return (
    <nav>
      <h1>CapstoneProject</h1>
      <ul className='navMenu'>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
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
                setShowButton={setShowButton}
                setShowRoll={setShowRoll}
                />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;