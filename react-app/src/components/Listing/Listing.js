import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { AnimatePresence, motion } from 'framer-motion'
import './Listing.css'

const liInfo = {
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * .07,
        }
    }),
    hidden: {
        opacity: 0,
        y: -50,
    },
    exit: {
        y: -50,
        opacity: 0,
    }
}


function Listing({title, show, setShow  }) {
    const [res, setRes] = useState([])
    const [dates, setDates] = useState([]);
    const [friends, setFriends] = useState([])
    const { userId } = useParams()

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            console.log(user)
            // console.log()
            setFriends(user.Friends)
            let newDate;
            user.visitedRestaurants.forEach((ele) => {
                console.log(ele)
                newDate = ele.created_at.split(' ').splice(0, 4).join(' ')
                if (!dates.includes(newDate)){
                    console.log('here')
                    console.log(dates)
                    setDates([...dates, newDate])
                }
            })
            setRes(user.visitedRestaurants)
            console.log(dates)
            // console.log(user.visitedRestaurants)
        })()
        // console.log(ReadableStream)
    }, [res.length])

    return (
        <div className='listing'>
        {show ? (
            <AnimatePresence>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                {dates.map((ele) => {
                    <div>{ele}this is working</div>
                })}
                <ul>
                {res.map((ele, i) => (
                    <motion.li
                      variants={liInfo}
                      initial='hidden'
                      animate='visible'
                      custom={i}
                      exit='exit'
                      key={ele.id}
                    >
                        <h2>{ele.created_at.split(' ').splice(0,4).join(' ')}</h2>
                        <img src={ele.restaurant.logo} />
                        - <span>{ele.restaurant.name}</span>
                    </motion.li>
                ))}
                </ul>
            </motion.div>
            </AnimatePresence>
        ) : (
            <AnimatePresence>
            <motion.div 
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
                You don't have any visited restaurants
            </motion.div>
            </AnimatePresence>
        )}
        </div>
    )
}

export default Listing