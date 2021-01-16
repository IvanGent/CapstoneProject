import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { AnimatePresence, motion } from 'framer-motion'

const liInfo = {
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.5,
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


function Friends({title, list, show, setShow  }) {
    const [res, setRes] = useState([])
    const { userId } = useParams()

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            console.log(user)
            // console.log()
            setRes(user.visitedRestaurants)
        })()
        console.log(ReadableStream)
    }, [res.length])

    return (
        <>
        {show ? (
            <AnimatePresence>
            <motion.div>
                <h1>{title}</h1>
                {res.map((ele, i) => (
                    <motion.li
                      variants={liInfo}
                      initial='hidden'
                      animate='visible'
                      exit='exit'
                      key={ele.id}
                    >
                        {ele.restaurant.name}
                    </motion.li>
                ))}
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
        </>
    )
}

export default Friends