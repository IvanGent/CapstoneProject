import React, { useState, useEffect } from 'react';
import './RandomRoller.css';
import { motion } from 'framer-motion';
import styled from "styled-components";


const RollButton = styled(motion.button)`
    background-color: red;
    border: thin solid black;
    border-radius: 50%;
    height: 60px;
    width: 60px;
    border: none;
    outline: none;
    box-shadow: 0px 0px 10px 7px gray;
    margin-top: 40px;
`


function RandomRoller({ restaurants }) {
    const [res, setRes] = useState(restaurants);
    const [checks, setChecks] = useState(new Array(res.length).fill('checked'));
    const [resPicked, setResPicked] = useState([]);
    const [showSelect, setShowSelect] = useState(true);
    const [logo, setLogo] = useState('');
    const [name, setName] = useState('');
    const [showReroll, setShowReroll] = useState(false);


    useEffect(() => {
        console.log(res)
    }, [])

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
            setLogo(roller[num].logo)
            setName(roller[num].name)
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

    return (
        <div className='randomRollerCont'>
            {showSelect ? (
            <form onSubmit={handleSelection}>
                <fieldset>
                {res.map((ele, i) => {
                    console.log(res);
                    return (
                        <div key={i} className='mainHolder'>
                            <div className='labels'>
                                <img src={ele.logo} alt='logo' />
                                <h5 >{ele.name}</h5>
                            </div>
                            <input  
                                type="checkbox"
                                id={i}
                                name={ele.name}
                                value={ele.logo}
                                defaultChecked
                                onChange={handleChecks}
                            />
                        </div>
                    )
                })}
                </fieldset>
                <RollButton whileHover={{scale: 1.2}} whileTap={{ scale: 0.8}} type='submit'>ROLL</RollButton>
                {/* <button type='submit'>Roll</button> */}
            </form>
            ) : (
                <div className='randomCont'>
                    <div className='randomSelect'>
                        <img src={logo} alt='logo' />
                        <h5>{name}</h5>
                    </div>
                    {showReroll ? (
                    <button onClick={handleReRoll} >Reroll</button>
                    ) : null }
                </div>
            )}
        </div>
    )
};

export default RandomRoller;