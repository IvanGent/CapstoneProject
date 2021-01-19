
import React, { useEffect, useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import './NavBar.css'


const NavBar = ({ authenticated, setAuthenticated, setShowButton, setShowLogin, setShowSignUp, setShowForms, setShowHomePage, setShowRoll, mobileSize }) => {
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
    theStart();
    setShowSignUp(false);
    setShowLogin(true);
  }

  const handleClick = () => {
    setShowRoll(false);
  }

  const goHome = () => {
    return <Redirect to='/' />
  }

  return (
    <nav>
      {!mobileSize ? (
        <div className='nav'>
      <h1>What-To-Bite</h1>
      <ul className='navMenu'>
        <li>
          <NavLink to="/" exact={true} activeClassName="active" onClick={handleClick}>
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
      </div>
      ) : (
        <div className='nav'>
          {/* <h1 onClick={goHome}>What-To-Bite</h1> */}
          {/* <ul className='navMenu'> */}
            {/* <li> */}
              {/* <NavLink to="/" exact={true} activeClassName="active" onClick={handleClick}>
                Home
            </NavLink> */}
            {/* </li> */}
            {!authenticated ? (
              <>
                  <h1 onClick={goHome}>What-To-Bite</h1>
                {/* <li>
                  <h3 onClick={handleLoginClick}>Login</h3>
                </li>
                <li>
                  <h3 onClick={handleSignupClick}>Sign Up</h3>
                </li> */}
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
          {/* </ul> */}
        </div>
      )}
    </nav>
  );
}

export default NavBar;