import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import VerticalTabs from '../Tabs/Tabs';
import Listing from '../Listing/Listing'
import './User.css';
import RandomRoller from "../RandomRoller/RandomRoller";
import ProfileAv from "../../images/ProfileAvatar.png";

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
    width: 140,
    opacity: 1,
    transition: {
      delay: .5,
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

const FavsMobile = {
  visible: {
    width: 700,
    opacity: 1,
    transition: {
      delay: .5,
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

const tabs = {
  show: {
    // scale: 1.002,
    style: {
      borderBottom: 'thick solid red'
    }
  },
  close: {
  }
}


function User({ authenticated, showRoll, setShowRoll, mobileSize, showFaves, setShowFaves, showFriends, setShowFriends, showVisited, setShowVisited }) {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState();
  const [favs, setFavs] = useState([]);
  // userId is the user you're looking at
  const userId = localStorage.getItem('userId')
  // currUser is the user that is signed in
  const currUser = localStorage.getItem('currUser')

  
  useEffect(() => {
      (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        setUser(user);
        user.favsList.forEach(ele => {
          favs.push(ele.restaurant)
        })
        user.avatar ? setAvatar(user.avatar) : setAvatar(ProfileAv)
      })();
    if (!userId) {
      return
    }
    
  }, [userId, setFavs, favs, currUser]);
  

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
          await res.json()
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

  const handleVisited = () => {
    setShowFaves(false)
    setShowFriends(false)
    setShowVisited(true)
  }

  const handleFaves = () => {
    setShowFriends(false)
    setShowVisited(false)
    setShowFaves(true)
  }

  const handleFriends = () => {
    setShowVisited(false)
    setShowFaves(false)
    setShowFriends(true)
  }
  
  return (
    <>
    {!mobileSize ? (

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
              <motion.label 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: .9 }}
                className='photoInput'>
                Update Profile Photo
              <input type='file' id='newPhoto' onChange={handleEdit} accept='.jpg, .jpeg, .png' />
              </motion.label>
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
        <div>
          <ul className='tabLabels'>
            <motion.li
              variants={tabs}
              // animate={showVisited ? 'show':'close'}
              style={showVisited ? {borderBottom: 'thick solid red' } : {borderBottom: 'none'}}
              onClick={handleVisited}
            >
              Visited Restaurants
            </motion.li>
            <motion.li
              variants={tabs}
              // animate={showFaves ? 'show' : 'close'}
              style={showFaves ? { borderBottom: 'thick solid red' } : { borderBottom: 'none' }}
              onClick={handleFaves}
            >
              Favorites List
            </motion.li>
            <motion.li
              variants={tabs}
              // animate={showFriends ? 'show' : 'close'}
              style={showFriends ? { borderBottom: 'thick solid red'} : { borderBottom: 'none'}}
              onClick={handleFriends}
            >
              Friends
            </motion.li>
          </ul>
        </div>
          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: .07 } }} exit={{ opacity: 0 }}>
              <Listing authenticated={authenticated} showVisited={showVisited} showFaves={showFaves} />
            </motion.div>
          </AnimatePresence>
      </motion.div>
      </motion.div>
    </div>
      </AnimatePresence>
    ): (
      
      <RandomRoller restaurants={favs} setShowRoll={setShowRoll} />
    )}
      </>
    ) : (
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
                            variants={FavsMobile}
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
                      {/* <VerticalTabs authenticated={authenticated} /> */}
                    </motion.div>
                  </motion.div>
                </div>
              </AnimatePresence>
            ) : (

                <RandomRoller restaurants={favs} setShowRoll={setShowRoll} />
              )}
      </>
    )}
    </>
  );
}
export default User;
