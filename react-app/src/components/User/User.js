import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import * as sectionsActions from '../../store/userSections';
import Listing from '../Listing/Listing'
import './User.css';


// Framer-motion variants
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
    }
  },
  hidden: {
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
   scale: 1.5
  },
  close: {
    scale: 0.9
  },
  hover: {
    scale: 1.5
  },
}

// SEND USER THROUGH LISTING AND THEN VISITED AND RESTURANTS TO CUT FETCHS
///////////////////////////////////


function User({authenticated, setShowRoll}) {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState();
  const [favs, setFavs] = useState([]);
  const showVisited = useSelector(state => state.sections.showVisited);
  const showFavs = useSelector(state => state.sections.showFavs);
  // userId is the user you're looking at
  const userId = id
  // currUser is the user that is signed in
  const currUser = useSelector(state => state.session.user);

  
  useEffect(() => {
    if(userId === currUser.id) {
      setFavs(currUser.favsList);
      setUser(currUser);
    } else {
      (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        setUser(user);
        let favPrep = [];
        user.favsList.forEach(ele => favPrep.push(ele.restaurant))
        setFavs(favPrep);
        user.avatar ? setAvatar(user.avatar) : setAvatar('/images/ProfileAvatar.png')
      })();
    }
    }, [userId, currUser]);


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


  const handleFavsRoll = async() => {
    // const response = await fetch(`/api/users/${userId}`);
    // const user = await response.json(); 
    // favs.push(user.favsList.forEach(ele => ele.restaurants))
    if (favs.length === 0) {
      alert('No Favorites To Roll');
      return;
    } else if(favs.length < 3) {
      alert('Not Enough Favorites')
      return;
    }
    setShowRoll(true)
  }

  const handleVisited = () => dispatch(sectionsActions.showVisited(true));

  const handleFaves = () => dispatch(sectionsActions.showFavs(true));
  
  return (
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
              animate={showVisited ? 'show':'close'}
              whileHover='hover'
              onClick={handleVisited}
            >
              Visited Restaurants
            </motion.li>
            <motion.li
              variants={tabs}
              animate={showFavs ? 'show' : 'close'}
              whileHover='hover'
              onClick={handleFaves}
            >
              Favorites List
            </motion.li>
          </ul>
        </div>
          <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: .07 } }} exit={{ opacity: 0 }}>
              <Listing 
                user={user}
                authenticated={authenticated} 
                // showVisited={showVisited} 
                />
            </motion.div>
          </AnimatePresence>
      </motion.div>
      </motion.div>
    </div>
      </AnimatePresence>
  );
}
export default User;
