import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";

import './User.css'


// const 

function User() {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState();
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      console.log(user)
      setUser(user);
      user.avatar ? setAvatar(user.avatar) : setAvatar(process.env.PUBLIC_URL + '/ProfileAvatar.png')
    })();
    console.log(user)
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='profile'>
      <div className='profileInfo'>
          <img src={avatar} alt='avatar' />
        <ul className='userInfo'>
          <li>
            <strong>Username:</strong> {user.username}
          </li>
          <li>
            <strong>Name:</strong> {user.first_name}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
        </ul>
      </div>
      <div>
        
      </div>
    </div>
  );
}
export default User;
