// Working on this.
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Friends.css'

function Friends({ curr, setShowFriends, setShowVisited, setShowProfilePage}) {
    const [friendsList, setFriendsList] = useState([]);
    // const [user, setUser] = useState();
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            // setUser(user);
            setFriendsList(user.friends);
            // user.avatar ? setAvatar(user.avatar) : setAvatar(ProfileAv)
            // console.log(user.friends)
        })();
    }, [userId])

    const handleUserClick = (e) => {
        localStorage.setItem('userId', e.target.id);
        setShowFriends(false);
        setShowVisited(true);
    }

    return (
        <AnimatePresence>
            <motion.div className='friendsContainer'>
                {friendsList.length ? (
                <div>
                    {friendsList.map(ele => {
                            console.log(ele)
                        return (
                        <div key={ele.id} id={ele.id} className='friends' onClick={handleUserClick}>
                            <img src={ele.avatar ? ele.avatar : '/images/ProfileAvatar.png'} alt='avatar' id={ele.id}/>
                            <h3 id={ele.id} >Username: {ele.username}</h3>
                        </div>
                    )})}
                </div>
                ): <div>No Friends</div>}
            </motion.div>
        </AnimatePresence>
    )
}

export default Friends;