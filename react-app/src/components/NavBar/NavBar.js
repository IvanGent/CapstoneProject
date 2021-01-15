
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import './NavBar.css'

const NavBar = ({ authenticated,setAuthenticated }) => {
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
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
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