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


function Listing({ showTab1, showTab2  }) {
    const [res, setRes] = useState([]);
    const [favs, setFavs] = useState([]);

    const { userId } = useParams()

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setFavs(user.favsList)
            setRes(user.visitedRestaurants.reverse())
        })()
    }, [userId])

    return (
        <div className='listing'>
            {showTab1 ? (
                <div className='Tab'>
                    {res.length ? (
                        <AnimatePresence>
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
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
                                <div className='innerLi'>
                                    <div>
                                        <img src={ele.restaurant.logo} alt='logo' />
                                    </div>
                                    <span id='line'>-</span><span>{ele.restaurant.name}</span>
                                </div>
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
                          className='message'
                        >
                            No Visited Restaurants
                        </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            ) : null }
            {showTab2 ? (
                <div className='Tab'>
                {favs.length ? (
                    <AnimatePresence>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <ul>
                                {favs.map((ele, i) => (
                                    <motion.li
                                        variants={liInfo}
                                        initial='hidden'
                                        animate='visible'
                                        custom={i}
                                        exit='exit'
                                        key={ele.id}
                                    >
                                        <img src={ele.restaurant.logo} alt='logo' />
                                        - <span>{ele.restaurant.name}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='message'
                        >
                            No Favorites
                        </motion.div>
                    </AnimatePresence>
                )}
                </div>
            ): null }
        </div>
    )
}

export default Listing