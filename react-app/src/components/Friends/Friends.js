import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProfileAv from "../../images/ProfileAvatar.png";

function Friends({ curr, userId}) {
    const [friendsList, setFriendsList] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
            setFriendsList(user.friends);
            // user.avatar ? setAvatar(user.avatar) : setAvatar(ProfileAv)
            console.log(user.friends)
        })();
    }, [userId])

    return (
        <AnimatePresence>
            <motion.div className='friendsContainer'>
                HELLO
                {friendsList.length ? (
                <div>
                    {friendsList.forEach(ele => (
                        <div key={ele.id}>
                            <img src={ele.avatar ? ele.avatar : ProfileAv} alt='avatar' />
                            <h3>{ele.username}</h3>
                        </div>
                    ))}
                </div>
                ): null}
            </motion.div>
        </AnimatePresence>
    )
}

export default Friends;