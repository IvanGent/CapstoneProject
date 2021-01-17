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
    // const [dates, setDates] = useState([]);
    const [favs, setFavs] = useState([]);

    const { userId } = useParams()

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            console.log(user)
            setFavs(user.favsList)
            setRes(user.visitedRestaurants)
        })()
    }, [res.length])

    return (
        <div className='listing'>
            {showTab1 ? (
                <div>
                    {res.length ? (
                        <AnimatePresence>
                        <motion.div initial={{opacity: 0}} animate={{opacity: 1}}>
                            {/* {dates.map((ele) => {
                                <div>{ele}this is working</div>
                            })} */}
                            <ul>
                            {res.map((ele, i) => (
                                // setShowTab2(false)
                                <motion.li
                                  variants={liInfo}
                                  initial='hidden'
                                  animate='visible'
                                  custom={i}
                                  exit='exit'
                                  key={ele.id}
                                >
                                    {/* <h2>{ele.created_at.split(' ').splice(0,4).join(' ')}</h2> */}
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
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          exit={{opacity: 0}}
                        >
                            You don't have any visited restaurants
                        </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            ) : null }
            {showTab2 ? (
                <div>
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
                                        {/* <h2>{ele.created_at.split(' ').splice(0,4).join(' ')}</h2> */}
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
                        >
                            No Favorites currently
                        </motion.div>
                    </AnimatePresence>
                )}
                </div>
            ): null }
        </div>
    )
}

export default Listing