import React, {useState, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

function FavsList({userId, curr}) {
    const [favs, setFavs] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setFavs(user.favsList)
            // user.favsList.forEach(ele => {

            // })
            // setRes(user.visitedRestaurants.reverse())
        })()
        console.log(favs)
    }, [userId ,favs.length])

    const favHandle = async (event) => {
        event.persist()
        console.log(event.target.id)
        if (event.target.style.fill === 'red') {
            event.target.style.fill = 'none'
            const res = await fetch('/api/favs/del', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    res_id: event.target.id,
                    user_id: curr
                })
            })
            await res.json()
            // let newFavs = favs.filter((ele) => {
            //     console.log(ele)
            //     if (ele.res_id === event.target.id) {
            //         return
            //     }
            //     return ele;
            // })
            let newFavs = [];
            favs.forEach(ele => {
                if (ele.res_id !== event.target.id) {
                    newFavs.push(ele);
                }
            })
            setFavs(newFavs)

            setFavs(newFavs)

        } else {
            event.target.style.fill = 'red'
            // const find = await fetch(`/api/${name}`)
            const res = await fetch('/api/favs/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    res_id: event.target.id,
                    user_id: curr
                })
            })
            const newRes = await res.json();
            console.log(newRes)
            favs.push(newRes)
        }
    }

    // const removeRes = async (e) => {
    //     console.log(e.target.id)
    // }

    return (
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
                                    <div className='innerLi'>
                                        <div>
                                            <img src={ele.restaurant.logo} alt='logo' />
                                        </div>
                                        <span id='line'>-</span><span>{ele.restaurant.name}</span>
                                        {/* <motion.svg
                                            id={ele.restaurant.id}
                                            className='list'
                                            variants={svgVar}
                                            // enable-background="new 0 0 24 24" 
                                            // enableBackground='red'
                                            initial='hidden'
                                            animate='visible'
                                            whileTap='tap'
                                            whileHover='hover'
                                            style={{ fill: 'red' }}
                                            onClick={favHandle}
                                            version="1.0" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.4 6c2 0 3.6 1.6 3.6 3.6s-3.9 6.4-8 9.8c-4.1-3.5-8-7.9-8-9.8C4 7.6 5.6 6 7.6 6 10 6 12 9 12 9s1.9-3 4.4-3m0-2c-1.8 0-3.4.9-4.4 2.3C11 4.9 9.4 4 7.6 4 4.5 4 2 6.5 2 9.6 2 14 12 22 12 22s10-8 10-12.4C22 6.5 19.5 4 16.4 4z" />
                                        </motion.svg> */}
                                    </div>
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
    )
}

export default FavsList;