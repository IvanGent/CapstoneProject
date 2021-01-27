import React, { useState } from 'react';
import { AnimatePresence, motion} from 'framer-motion';
import './RandomRoller.css';

// Framer-motion variants
const resLis = {
    visible: (i) => ({
        y: 0,
        // x: 0,
        opacity: 1,
        transition: {
            // duration: .5,
            delay: 0.25 * i
        }
    }),
    hidden: {
        y: 500,
        // x: 500,
        opacity: 0,
    },
    tap: {
        scale: .9,
        opacity: 0.5,
        // rotate: 20,
        x: 50
    },
    hover: {
        scale: 1.05,
    }
}

const lis = {
    visible: {
        y:0,
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
        scale: .9,
        opacity: 0.5,
        // rotate: 20,
        x: 20
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

const Reroll = {
    visible: {
        scale: 1,
        opacity: 1
    },
    hidden: {
        scale: 0,
        opacity: 0
    },
    now: {
        rotate: 300
    },
    hover: {
        scale: 1.1
    },
    tap: {
        scale: 0.8
    }
}

const Roller = {
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    }
}

const innerRoller = {
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    }
}

const ActualRoller = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 1
        }
    },
    hidden: {
        opacity: 0,
        y: 1000
    }
}

function RandomRoller({ restaurants, setShowRoll, mobileSize, setShowHomePage, setShowProfilePage, setShowVisited, setShowFriends}) {
    const res = restaurants
    const checks = new Array(res.length).fill(true);
    const [resPicked, setResPicked] = useState([]);
    const [showSelect, setShowSelect] = useState(true);
    const [currRes, setCurrRes] = useState({})
    const [showReroll, setShowReroll] = useState(false);
    const curr = localStorage.getItem('currUser')
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
// Taking care of showing what is selected and what is not.
    const handleChecks = (e) => {
        console.log(e.target.id)
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
// The Random roller
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
// Rerolls the restaurants selected from the first selection
    const handleReRoll = () => {
        setShowReroll(false)
        Random(resPicked)
    }
// Adds to the Users visited and then goes to their profile to show them
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
        setShowHomePage(false)
        setShowRoll(false)
        setShowFriends(false)
        localStorage.setItem('userId', curr)
        setShowProfilePage(true)
        setShowVisited(true)
    }

    return (
        <AnimatePresence>
            {!mobileSize ? (
        <motion.div 
            variants={Roller}
            initial='hidden'
            animate='visible'
            className='randomRollerCont'>
            {showSelect ? (
            <motion.form 
                variants={innerRoller}
                initial='hidden'
                animate='visible'
                onSubmit={handleSelection}>
                <motion.fieldset
                    variants={ActualRoller}
                    initial='hidden'
                    animate='visible'
                >
                {res.map((ele, i) => {
                    return (
                        <motion.div
                          id={i}
                          variants={resLis}
                          initial='hidden'
                          animate='visible'
                          whileTap='tap'
                          whileHover='hover'
                          custom={i}
                          key={i} 
                        //   onClick={handleChecks}
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
                </motion.fieldset>
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
            </motion.form>
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
                        <div className='buttonHolder'>
                        <motion.button
                            variants={Reroll}
                            initial='hidden'
                            animate='visible'
                            whileHover='hover'
                            whileTap='tap'
                            exit={{ opacity: 0 }}
                            id='reroll'
                            onClick={handleReRoll} 
                        >
                            Reroll
                        </motion.button>
                        <motion.button 
                            variants={Reroll}
                            initial='hidden'
                            animate='visible'
                            whileHover='hover'
                            whileTap='tap'
                            id='addToVis'
                            onClick={handleAddRes} 
                        >
                            Add to Visited
                        </motion.button>
                        </div>
                    ) : null }
                    </div>
                </motion.div>
            )}
        </motion.div>
            ) : (
                    <motion.div className='randomRollerCont'>
                        {showSelect ? (
                            <form onSubmit={handleSelection}>
                                <fieldset>
                                    {res.map((ele, i) => {
                                        return (
                                            <motion.div
                                                id={i}
                                                variants={resLis}
                                                initial='hidden'
                                                animate='visible'
                                                // whileTap='tap'
                                                // whileHover='hover'
                                                custom={i}
                                                key={i}
                                                className='mainHolder'
                                                // onClick={handleChecks}
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
                                    whileHover={{ scale: 1.2 }}
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
                                            <div className='buttonHolder'>
                                                <motion.button
                                                    variants={Reroll}
                                                    initial='hidden'
                                                    animate='visible'
                                                    whileHover='hover'
                                                    whileTap='tap'
                                                    exit={{ opacity: 0 }}
                                                    id='reroll'
                                                    onClick={handleReRoll}
                                                >
                                                    Reroll
                                                </motion.button>
                                                <motion.button
                                                    variants={Reroll}
                                                    initial='hidden'
                                                    animate='visible'
                                                    whileHover='hover'
                                                    whileTap='tap'
                                                    id='addToVis'
                                                    onClick={handleAddRes}
                                                >
                                                    Add to Visited
                                                </motion.button>
                                            </div>
                                        ) : null}
                                    </div>
                                </motion.div>
                            )}
                    </motion.div>
            )}
        </AnimatePresence>
    )
};


export default RandomRoller;