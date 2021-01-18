import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import './RandomRoller.css';
import { AnimatePresence, motion} from 'framer-motion';


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
        opacity: 1
    },
    unchecked: {
        scale: .5,
        opacity: 0
    },
    checked: {
        scale: 1,
        opacity: 1
    },
    tap: {
        scale: .7,
        opacity: 0.5,
        rotate: 20,
    },
    hover: {
        scale: 1.05,
    }
}

const RandomCont = {
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    }
}

const shift = {
    'visible': {
        opacity: 1,
    },
    'hidden': {
        opacity: 0,
    },
}

function RandomRoller({ restaurants }) {
    const res = restaurants;
    const checks = new Array(res.length).fill(true);
    const [resPicked, setResPicked] = useState([]);
    const [showSelect, setShowSelect] = useState(true);
    const [currRes, setCurrRes] = useState({})
    const [showReroll, setShowReroll] = useState(false);
    const user = localStorage.getItem('userId')


    const handleSelection = (e) => {
        e.preventDefault()
        const newSet = []
        checks.filter((ele, i) => {
            if (ele !== false) {
                newSet.push(res[i])
            }
            return ele;
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
        const res = document.getElementById(e.target.id);
        if (res.classList.contains('unchecked')) {
            res.classList.remove('unchecked');
            res.classList.add('labels')
        } else {
            res.classList.add('unchecked');
            res.classList.remove('labels')
        }
        return checks[e.target.id] ? (
            checks[e.target.id] = false 
            ) : (
            checks[e.target.id] = true
            );
    }

    const Random = (roller) => {
        let num = Math.floor(Math.random() * Math.floor(roller.length - 1))

        const interval = setInterval(() => {
            if (num === roller.length) {
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

    useEffect(() => {

    })


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
        await res.json()
        return <Redirect to={`/users/${user}`} /> 
        // return result;
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
                              id={i}
                              variants={lis}
                              whileTap='tap'
                              whileHover='hover'
                              className='labels'
                              onClick={handleChecks}
                             >
                                <img id={i} src={ele.logo} alt='logo' />
                                <h5 id={i} >{ele.name}</h5>
                            </motion.div>
                        </motion.div>
                    )
                })}
                </fieldset>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: .5 } }}
                  whileHover={{scale: 1.2}} 
                  whileTap={{ scale: 0.8, rotate: 360 }} 
                  type='submit'
                  id='MainButton'
                  >
                    ROLL
                  </motion.button>
            </form>
            ) : (
                <motion.div 
                    variants={RandomCont}
                    initial='hidden'
                    animate='visible'
                    exit={{ opacity: 0 }}
                    className='randomCont'
                >
                    <div className='randomSelect1'>
                    <motion.div 
                        variants={shift}
                        initial='hidden'
                        animate='visible'
                        className='labels randomSelect'
                    >
                        <img src={currRes.logo} alt='logo' />
                        <h5>{currRes.name}</h5>
                    </motion.div>
                    {showReroll ? (
                        <>
                        <motion.button
                            onClick={handleReRoll} 
                        >
                            Reroll
                        </motion.button>
                        <motion.button 
                            variants
                            onClick={handleAddRes} 
                        >
                            Add to Visited
                        </motion.button>
                        </>
                    ) : null }
                    </div>
                </motion.div>
            )}
        </motion.div>
        </AnimatePresence>
    )
};

export default RandomRoller;