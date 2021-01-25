import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion'
import FavsList from '../FavsList/FavsList';
import Visited from '../Visited/Visited';
import './Listing.css'
import FavIcon from '../../images/Fav.png'

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

// const Favs = {
//     visible: {
//         opacity: 1
//     },
//     hidden: {
//         opacity: 0
//     },
//     hover: {
//         scale: 1.1
//     },
//     startTap: {
//         scale: 0.9
//     },
//     endTap: {
//         scale: 1.2
//     }
// }

const RemoveBut = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1
    },  
    hover: {
        scale: 1.1
    },
    tap: {
        scale: .9
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

function Listing({ showVisited, showFaves  }) {
    const [res, setRes] = useState([]);
    const [favs, setFavs] = useState([]);
    // curr is the user that is signed in
    const curr = localStorage.getItem('userId')
    // userId is the user you're looking at
    const userId = localStorage.getItem('currUser')

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setFavs(user.favsList)
            // user.favsList.forEach(ele => {

            // })
            setRes(user.visitedRestaurants.reverse())
        })()
    }, [userId, res.length, curr, favs.length])

    const favHandle = async (event) => {
        event.persist()
        if(event.target.style['background-color'] === 'red') {
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
                if (ele.res_id !== event.target.id){
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
        console.log(e.target.id)
        const res = fetch(`/api/visited/`, {
            method: "DELETE",
            headers: { "Content-Type": 'application/json'},
            body: JSON.stringify({
                "res_id": e.target.id,
                "user_id": curr
            })
        })
        const data = await res.json()
        console.log(data)
    }


    return (
        <div className='listing'>
            {showVisited ? (
                <Visited userId={userId} curr={curr} />
            ) : null }
            {showFaves ? (
                <FavsList userId={userId} curr={curr} />
            ): null }
        </div>
    )
}

export default Listing