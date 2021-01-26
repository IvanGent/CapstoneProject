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
            // user.favsList.forEach(ele => {

            // })
            setRes(user.visitedRestaurants)
            console.log(user.visitedRestaurants)
            const use = user.visitedRestaurants
            console.log(use)
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
            console.log(newRes)
            favs.push(newRes)
        }
    }

    const removeRes = async (e) => {
        e.persist()
        // console.log(e.target.id)
        // console.log(res)
        // console.log(e.target.id)
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
        // res.reverse().splice(index, 1).reverse()
        // let newRes = [];
        // for(let i = res.length - 1; i > 0; i--) {
        //     if(res[i].created_at === created_at) {
        //         newRes.push(res[i - 1])
        //         continue
        //     }
        //     newRes.push(res[i]);
        // }
        // console.log(index)a
        // let newRes = res.filter(ele => ele.id !== id)
        // res.splice(index, 1)
        // setRes(newRes)
        // console.log(newRes)
        // setRes(res)
        console.log(res)
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
                                                {/* <motion.svg
                                        id={ele.restaurant.id}
                                        className='list'
                                        variants={svgVar}
                                        initial='hidden'
                                        animate='visible'
                                        whileTap='tap'
                                        whileHover='hover'
                                        style={{fill: fill}}
                                        onClick={favHandle}
                                        version="1.0" viewBox="0 0 24 24" 
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.4 6c2 0 3.6 1.6 3.6 3.6s-3.9 6.4-8 9.8c-4.1-3.5-8-7.9-8-9.8C4 7.6 5.6 6 7.6 6 10 6 12 9 12 9s1.9-3 4.4-3m0-2c-1.8 0-3.4.9-4.4 2.3C11 4.9 9.4 4 7.6 4 4.5 4 2 6.5 2 9.6 2 14 12 22 12 22s10-8 10-12.4C22 6.5 19.5 4 16.4 4z" />
                                    </motion.svg> */}
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