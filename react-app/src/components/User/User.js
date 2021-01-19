import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import VerticalTabs from '../Tabs/Tabs'
import './User.css'
import RandomRoller from "../RandomRoller/RandomRoller";

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

const FavsRoll = {
  visible: {
    width: 150,
    opacity: 1,
    transition: {
      delay: 1,
      // duration: .5
    }
  },
  hidden: {
    // rotate: 360,
    width: 0,
    opacity: 0
  },
  tap: {
    scale: .9
  },  
  hover: {
    scale: 1.2
  }
}


function User({ authenticated, showRoll, setShowRoll }) {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState();
  const [favs, setFavs] = useState([]);
  
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();
  const currUser = localStorage.getItem('userId')

  
  useEffect(() => {
    if(!currUser) {
      return <Redirect to='/' />
    }
      (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        setUser(user);
        user.favsList.forEach(ele => {
          favs.push(ele.restaurant)
        })
        user.avatar ? setAvatar(user.avatar) : setAvatar(process.env.PUBLIC_URL + '/ProfileAvatar.png')
      })();
    if (!userId) {
      return
    }
    
  }, [userId, setFavs, favs, currUser]);
  
  // if (!authenticated) {
  //   return <Redirect to='/' />;
  // }

  if (!user) {
    return null;
  }
  
  const handleEdit = (e) => {
    const reader = new FileReader()
    let file = e.target.files[0]
    if(!file.type.match(/image.*/)) {
      alert('Needs To Be An Image')
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
          const res = fetch(`/api/users/${userId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "avatar": srcEncoded
            })
          })
          // const results = await res.json()
          // console.log(results)
          setAvatar(srcEncoded)
        })()
      }
    }
    reader.readAsDataURL(file);
  }


  const handleFavsRoll = () => {
    if (favs.length === 0) {
      alert('No Favorites To Roll');
      return;
    } else if(favs.length < 3) {
      alert('Not Enough Favorites')
      return;
    }
    setShowRoll(true)
  }
  
  return (
    <>
    {!showRoll ? (
    <AnimatePresence>
    <div className='profile'>
      <motion.div 
        variants={ProfileInfo}
        initial='hidden'
        animate='visible'
        className='innerProfile'
      >
        <motion.div
          variants={ProfileInfo}
          initial='hidden'
          animate='visible'
          className='profileInfo'>
            <img id='avatar' src={avatar} alt='avatar' />
            {currUser === userId ? (
            <div className='editCont'>
              <img
                src={process.env.PUBLIC_URL + '/EditIcon.png'}
                alt='edit'
                id='editIcon'
              />
              <input type='file' id='newPhoto' onChange={handleEdit} accept='.jpg, .jpeg, .png' />
              Profile Photo
            </div>
            ) : null}
          <motion.ul className='userInfo'>
            <li initial='hidden'
              animate='visible'>
              <strong>Username:</strong> {user.username}
            </li>
            <li>
              <strong>Name:</strong> {user.first_name}
            </li>
            <li>
              <motion.button
                  id='FavsRoll'
                  variants={FavsRoll}
                  initial='hidden'
                  animate='visible'
                  whileTap='tap'
                  whileHover='hover'
                  onClick={handleFavsRoll}
              >
                Roll With Favorites
              </motion.button>
            </li>
          </motion.ul>
        </motion.div>
      <motion.div 
        variants={Tabs}
        initial='hidden'
        animate='visible'
        className='tabs'>
        <VerticalTabs authenticated={authenticated} />
      </motion.div>
      </motion.div>
    </div>
      </AnimatePresence>
    ): (
      
      <RandomRoller restaurants={favs} setShowRoll={setShowRoll} />
    )}
      </>
  );
}
export default User;
