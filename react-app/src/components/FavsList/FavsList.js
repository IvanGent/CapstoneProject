import React, {useState, useEffect} from 'react';
import { AnimatePresence, motion } from 'framer-motion';


function FavsList({id, curr, liInfo, svgVar}) {
    const [favs, setFavs] = useState([]);
    const userId = id;
    
    //favsList is fetched and set to a piece of state
    useEffect(() => {
        if(userId === curr.id) {
            setFavs(curr.favsList);
        } else {
            (async () => {
                const response = await fetch(`/api/users/${userId}`);
                const user = await response.json();
                setFavs(user.favsList);
            })()
        }
    }, [curr, userId])


    // Handles the click for adding and removing from favorites
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
                    user_id: curr.id
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
            const res = await fetch('/api/favs/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    res_id: event.target.id,
                    user_id: curr.id
                })
            })
            const newRes = await res.json();
            favs.push(newRes)
        }
    }

    return (
        <div className='Tab'>
            {favs.length ? (
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <ul className='favsList'>
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
                                            <span id='line'>-</span>
                                        <div className='FavListInfo'>
                                            <span>{ele.restaurant.name}</span>
                                            <motion.img
                                                id={ele.restaurant.id}
                                                className='list'
                                                variants={svgVar}
                                                style={{ backgroundColor: 'red' }}
                                                initial='hidden'
                                                animate='visible'
                                                whileTap='tap'
                                                whileHover='hover'
                                                src='/images/Fav.png'
                                                alt='Fav Icon'
                                                onClick={favHandle}
                                            />
                                            <p id='add'
                                            >Favorite</p>
                                        </div>
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