import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { AnimatePresence, motion } from 'framer-motion'
import './Listing.css'

const liInfo = {
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * .15,
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

const Favs = {
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    },
    hover: {
        scale: 1.1
    },
    startTap: {
        scale: 0.9
    },
    endTap: {
        scale: 1.2
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

    const FavHandle = async() => {

    }

    const func = (event, info) => {
        console.log(event.target.id)
        if(event.target.style.fill === 'red') {
            event.target.style.fill = null
        } else {
            event.target.style.fill = 'red'
        }
    }

    const svgVar = {
        visible: {
            opacity: 1
        },
        hidden: {
            opacity: 0
        },
        hover: {
            scale: 1.2
        },
        tap: {
            scale: .8,
        },
    }

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
                                    {/* <motion.img
                                        id={i}
                                        className='notFav'
                                        variants={Favs}
                                        initial='hidden'
                                        animate='visible'
                                        whileTap='startTap'
                                        whileHover='hover'
                                        onTap={func}
                                        src={process.env.PUBLIC_URL + '/Fav.png'}
                                        width={20}
                                        height={20}
                                        // onClick={FavHandle}
                                    ></motion.img> */}
                                        <motion.svg
                                            id={i}
                                            variants={svgVar}
                                            // enable-background="new 0 0 24 24" 
                                            // enableBackground='red'
                                            initial='hidden'
                                            animate='visible'
                                            whileTap='tap'
                                            whileHover='hover'
                                            style
                                            onClick={func}
                                            version="1.0" viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.4 6c2 0 3.6 1.6 3.6 3.6s-3.9 6.4-8 9.8c-4.1-3.5-8-7.9-8-9.8C4 7.6 5.6 6 7.6 6 10 6 12 9 12 9s1.9-3 4.4-3m0-2c-1.8 0-3.4.9-4.4 2.3C11 4.9 9.4 4 7.6 4 4.5 4 2 6.5 2 9.6 2 14 12 22 12 22s10-8 10-12.4C22 6.5 19.5 4 16.4 4z" />
                                        </motion.svg>
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