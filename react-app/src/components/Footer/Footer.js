import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import './Footer.css';
import { Redirect } from "react-router-dom";

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

function Footer({ mobileSize }) {
    const user = localStorage.getItem('userId')
    const [currUser, setCurrUser] = useState('');
    useEffect(() => {
        (async() => {
            const curr = fetch(`/api/users/${user}`)
            setCurrUser(curr);
        })()
    }, [user])

    const handleProfile = () => {
        <Redirect to={`/users/${user}`}
    }

    return (
        <div className='Footer'>
            {mobileSize ? (
                <div className='holdingBox'>
                    <motion.div 
                        variants={profile}
                        initial='hidden'
                        animate='visible'
                        whileTap='tap'
                        id='a' 
                        className='footerBoxes'>
                        <img src={process.env.PUBLIC_URL + '/NavProfile.png'} alt='profile' />
                    </motion.div>
                    <motion.div 
                        variants={profile}
                        initial='hidden'
                        animate='visible'
                        whileTap='tap'
                        id='b' 
                        className='footerBoxes'> this 2</motion.div>
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