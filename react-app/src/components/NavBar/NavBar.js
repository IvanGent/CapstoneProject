
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import Forms from '../auth/Forms';
import './NavBar.css'

const NavBar = ({ authenticated, setAuthenticated, setShowButton, showLogin, setShowLogin, showSignUp, setShowSignUp, showForms, setShowForms}) => {
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    // let user = localStorage.getItem('userId');
    // setUser(user);
  }, [])

  useEffect(() => {
    setUser(localStorage.getItem('userId'))
  })

  // const handleClick = () => {
  //   show ? setShow(false) : setShow(true);
  //   return show ? (
  //   <ProfileMenu user={user} setAuthenticated={setAuthenticated} />
  //   ) 
  //     : null
  // }

  const theStart = () => {
    setShowButton(false)
    setShowForms(true)

  }

  const handleSignupClick = () => {
    theStart()
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

  const handleLoginClick = () => {
    theStart()
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
              {/* <NavLink to={`/users/${user}`} exact={true} activeClassName="active">
                Profile
              </NavLink> */}
              <ProfileMenu  user={user} setAuthenticated={setAuthenticated} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;