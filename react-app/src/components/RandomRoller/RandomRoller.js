import React, { useState, useEffect } from 'react';
import './RandomRoller.css';
import { AnimatePresence, motion } from 'framer-motion';
import styled from "styled-components";


const RollButton = styled(motion.button)`
    background-color: red;
    border: thin solid black;
    border-radius: 50%;
    height: 80px;
    font-size: 24px;
    width: 80px;
    border: none;
    outline: none;
    box-shadow: 0px 0px 10px 7px gray;
    margin-top: 40px;
`

const resLis = {
    visible: (i) => ({
        y: 0,
        x: 0,
        opacity: 1,
        rotate: 360,
        transition: {
            duration: .5,
            delay: 0.25 * i
        }
    }),
    hidden: {
        y: 500,
        x: 500,
        opacity: 0,
    },

}


const lis = {
    visible: {

    },
    hidden: {
        
    }
}


function RandomRoller({ restaurants }) {
    const res = restaurants;
    const checks = new Array(res.length).fill('checked');
    const [resPicked, setResPicked] = useState([]);
    const [showSelect, setShowSelect] = useState(true);
    const [currRes, setCurrRes] = useState({})
    const [showReroll, setShowReroll] = useState(false);
    const user = localStorage.getItem('userId')

    // useEffect(() => {
    //     console.log(res)
    // }, [])

    const handleSelection = (e) => {
        e.preventDefault()
        const newSet = []
        checks.filter((ele, i) => {
            if (ele !== 'unchecked') {
                newSet.push(res[i])
            }
        })
        if (newSet.length <= 1) {
            setResPicked(newSet)
            setShowSelect(false)
            Random(newSet)
            return;
        }
        setShowSelect(false)
        setResPicked(newSet)
        Random(newSet);
        return;
    }

    const handleChecks = (e) => {
        checks[e.target.id] = 'unchecked'
    }

    const Random = (roller) => {
        let num = Math.floor(Math.random() * Math.floor(roller.length - 1))

        const interval = setInterval(() => {
            if (num === roller.length - 1) {
                num = 0;
            }
            setCurrRes(roller[num])
            num+=1
        }, 100);

        setTimeout(() => {
            clearInterval(interval);
            setShowReroll(true)
        }, 3000)

        return
    }


    const handleReRoll = () => {
        setShowReroll(false)
        Random(resPicked)
    }

    const handleAddRes = async () => {
        const res = await fetch(`/api/visited/`, {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "res_id": currRes.id,
                "user_id": user
            })
        })
        const result = await res.json()
    }

    return (
        <AnimatePresence>
        <motion.div className='randomRollerCont'>
            {showSelect ? (
            <form onSubmit={handleSelection}>
                <fieldset>
                {res.map((ele, i) => {
                    return (
                        <motion.div
                          variants={resLis}
                          initial='hidden'
                          animate='visible'
                          custom={i}
                          key={i} 
                          className='mainHolder'
                         >
                            <motion.div
                              variants={lis}
                              
                              className='labels'
                             >
                                <img src={ele.logo} alt='logo' />
                                <h5 >{ele.name}</h5>
                            </motion.div>
                            <motion.input  
                                type="checkbox"
                                id={i}
                                name={ele.name}
                                value={ele.logo}
                                defaultChecked
                                onChange={handleChecks}
                            />
                        </motion.div>
                    )
                })}
                </fieldset>
                <RollButton whileHover={{scale: 1.2}} whileTap={{ scale: 0.8}} type='submit'>ROLL</RollButton>
                {/* <button type='submit'>Roll</button> */}
            </form>
            ) : (
                <div className='randomCont'>
                    <div className='randomSelect'>
                        <img src={currRes.logo} alt='logo' />
                        <h5>{currRes.name}</h5>
                    </div>
                    {showReroll ? (
                        <>
                        <button onClick={handleReRoll} >Reroll</button>
                        <button onClick={handleAddRes} >Accept</button>
                        </>
                    ) : null }
                </div>
            )}
        </motion.div>
        </AnimatePresence>
    )
};

export default RandomRoller;