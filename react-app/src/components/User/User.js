import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import VerticalTabs from '../Tabs/Tabs'
import './User.css'

// Framer-motion props
const ProfileInfo = {
  visible: {
    opacity: 1,
    transition: {
      delay: .05
    }
  },
  hidden: {
    opacity: 0,
  }
}

const Tabs = {
  visible: {
    width: 700,
    transition: {
      delay: .025
    }
  },
  hidden: {
    width: 0,
  }
}


function User() {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState();
  // const [visitedRestaurants, setVisitedRestaurants] = useState([]);
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
      // setVisitedRestaurants(user.visitedRestaurants)
      user.avatar ? setAvatar(user.avatar) : setAvatar(process.env.PUBLIC_URL + '/ProfileAvatar.png')
      // console.log(user.visitedRestaurants)
      // console.log(user.visitedRestaurants)
    })();
  
  }, [userId]);

  if (!user) {
    return null;
  }

  const handleEdit = async () => {
    
  }

  return (
      <AnimatePresence>
    <div className='profile'>
        <motion.div
          variants={ProfileInfo}
          initial='hidden'
          animate='visible'
          className='profileInfo'>
            <img id='avatar' src={avatar} alt='avatar' />
            <motion.img
              src={process.env.PUBLIC_URL + '/EditIcon.png'}
              id='editIcon'
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEdit}
            />
          <motion.ul className='userInfo'>
            <li initial='hidden'
              animate='visible'>
              <strong>Username:</strong> {user.username}
            </li>
            <li>
              <strong>Name:</strong> {user.first_name}
            </li>
          </motion.ul>
          {/* For adding a friend */}
          {/* {userId === localStorage.getItem('userId') ? null : (
            <div onClick={handleFriend} className='addFriend'>
              <img src={process.env.PUBLIC_URL + '/AddFriend.png'} />
              Add Friend
            </div>
          )} */}
        </motion.div>
      <motion.div 
        variants={Tabs}
        initial='hidden'
        animate='visible'
        className='tabs'>
        <VerticalTabs />
      </motion.div>
    </div>
      </AnimatePresence>
  );
}
export default User;
