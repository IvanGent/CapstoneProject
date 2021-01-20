import React, { useEffect } from "react";
import { motion } from 'framer-motion';
import './Footer.css';
import { useHistory } from "react-router-dom";
import Listing from '../Listing/Listing';

const profile = {
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    },
    tap: {
        scale: .8
    }
}
// Working on the Footer
function Footer({ mobileSize }) {
    const history = useHistory();
    const user = localStorage.getItem('userId')
    // const [currUser, setCurrUser] = useState('');
    useEffect(() => {
        (async() => {
            // const curr = fetch(`/api/users/${user}`)
            // setCurrUser(curr);
        })()
    }, [user])

    const handleProfile = () => {
        history.push(`/users/${user}`)
        // return <Redirect to={`/users/${user}`} />
    }

    const handleFavs = () => {
        return <Listing />
    }

    return (
        <div className='Footer'>
            {/* <Listing /> */}
            {mobileSize ? (
                <div className='holdingBox'>
                    <motion.div 
                        variants={profile}
                        initial='hidden'
                        animate='visible'
                        whileTap='tap'
                        id='a' 
                        className='footerBoxes'
                        onClick={handleProfile}
                        >
                        <img src={process.env.PUBLIC_URL + '/NavProfile.png'} alt='profile' />
                    </motion.div>
                    <motion.div 
                        variants={profile}
                        initial='hidden'
                        animate='visible'
                        whileTap='tap'
                        id='b' 
                        className='footerBoxes'
                        onClick={handleFavs}
                        > 
                        <img src={process.env.PUBLIC_URL + '/Fav.png'} alt='favs' />
                        </motion.div>
                    <motion.div 
                        variants={profile}
                        initial='hidden'
                        animate='visible'
                        whileTap='tap'
                        id='c' 
                        className='footerBoxes'>this 3</motion.div>
                </div>
            ) : (
                <div>
                    
                </div>
            )}
        </div>
    )
}

export default Footer