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
  const [errors, setErrors] = useState([]);
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

  const handleEdit = (e) => {
    const reader = new FileReader()
    let file = e.target.files[0]
    if(!file.type.match(/image.*/)) {
      setErrors(['Needs to be an image']);
      return;
    }

    reader.onload = function(e) {
      const img = document.createElement('img');
      img.src = e.target.result

      img.onload = async function(event) {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 200;
        const scaleSize = MAX_WIDTH / event.target.width;
        canvas.width = MAX_WIDTH;
        canvas.height = event.target.height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(event.target, 0, 0, canvas.width, canvas.height);

        const srcEncoded = ctx.canvas.toDataURL(event.target, 'image/jpeg');
        (async() => {
            
        })()
      }
    }
    reader.readAsDataURL(file);
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
            <div className='editCont'>
              <img
                src={process.env.PUBLIC_URL + '/EditIcon.png'}
                alt='edit'
                id='editIcon'
              />
              <input type='file' id='newPhoto' onChange={handleEdit} accept='.jpg, .jpeg, .png' />
            </div>
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
