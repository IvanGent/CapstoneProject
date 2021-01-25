import React, { useState, useEffect } from 'react';
import ProfileAv from "../../images/ProfileAvatar.png";

function Friends({ curr, userId}) {
    const [friends, setFriends] = useState([]);
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
            // user.avatar ? setAvatar(user.avatar) : setAvatar(ProfileAv)
        })();
    }, [userId])

    return (
        <div>

        </div>
    )
}

export default Friends;