import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FavIcon from '../../images/Fav.png';



function Visited({curr, liInfo, svgVar, RemoveBut}) {
    const [res, setRes] = useState([]);
    const [favs, setFavs] = useState([]);
    const userId = localStorage.getItem('userId')

    // favsList and visitedRestaurants are fetched and set to pieces of state
    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setFavs(user.favsList)
            setRes(user.visitedRestaurants)
        })()
    }, [userId, res.length])


    const favHandle = async (event) => {
        event.persist()
        if (event.target.style['background-color'] === 'red') {
            event.target.style['background-color'] = null
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
            let newFavs = [];
            favs.forEach(ele => {
                if (ele.res_id !== event.target.id) {
                    newFavs.push(ele);
                }
            })
            setFavs(newFavs)

        } else {
            event.target.style['background-color'] = 'red'
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
            favs.push(newRes)
        }
    }

    const removeRes = async (e) => {
        e.persist()
        let id = e.target.id
        const result = await fetch(`/api/visited/`, {
            method: "DELETE",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({
                "id": id,
                "user_id": curr,
            })
        })
        await result.json()
        let del = document.getElementById(id)
        del.remove()
    }


    return (
        <div className='Tab'>
            {res.length ? (
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <ul>
                            {res.map((ele, i) => {
                                let fill = null
                                favs.forEach(ele2 => {
                                    if (ele.restaurant.id === ele2.restaurant.id) {
                                        fill = 'red'
                                    }
                                })
                                return (
                                    <motion.li
                                        variants={liInfo}
                                        initial='hidden'
                                        animate='visible'
                                        custom={i}
                                        exit='exit'
                                        key={ele.id}
                                        id={ele.id}
                                    >
                                        <div className='innerLi'>
                                            <div>
                                                <img src={ele.restaurant.logo} alt='logo' />
                                            </div>
                                            <div className='holdingName'>
                                                <span>
                                                    {ele.restaurant.name}
                                                </span>
                                                <motion.button
                                                    id={ele.id}
                                                    variants={RemoveBut}
                                                    initial='hidden'
                                                    animate='visible'
                                                    whileTap='tap'
                                                    whileHover='hover'
                                                    onClick={removeRes}
                                                >
                                                    Remove From Visited
                                        </motion.button>
                                            </div>
                                            <motion.div
                                                className='AddFavs'
                                            >
                                                <motion.img
                                                    id={ele.restaurant.id}
                                                    className='list'
                                                    variants={svgVar}
                                                    style={{ backgroundColor: fill }}
                                                    initial='hidden'
                                                    animate='visible'
                                                    whileTap='tap'
                                                    whileHover='hover'
                                                    src={FavIcon}
                                                    alt='Fav Icon'
                                                    onClick={favHandle}
                                                />
                                                <p id='add'
                                                >Favorite</p>
                                            </motion.div>
                                        </div>
                                    </motion.li>
                                )
                            })}
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
                            No Visited Restaurants
                        </motion.div>
                    </AnimatePresence>
                )}
        </div>
    )
}

export default Visited