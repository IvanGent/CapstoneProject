import React, { useEffect } from "react";
import './Footer.css';

// Working on the Footer
function Footer() {

    const user = localStorage.getItem('userId')
    // const [currUser, setCurrUser] = useState('');
    useEffect(() => {
        (async() => {
            // const curr = fetch(`/api/users/${user}`)
            // setCurrUser(curr);
        })()
    }, [user])


    return (
        <div className='Footer'>

        </div>
    )
}

export default Footer