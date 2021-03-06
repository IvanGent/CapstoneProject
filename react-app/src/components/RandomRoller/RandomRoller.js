import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { AnimatePresence, motion} from 'framer-motion';
import './RandomRoller.css';


// Framer-motion variants
const resLis = {
    visible: (i) => ({
        y: 0,
        transition: {
            delay: [0.35 * i]
        }
    }),
    hidden: {
        y: 1000,
    },
    tap: {
        scale: .9,
        opacity: 0.5,
    },
    hover: {
        scale: 1.05,
    },
    exit: {
        scale: 1.5,
        rotate: 780
    }
}

const lis = {
    visible: {
        y:0,
    },
    unchecked: {
        scale: .9,
        opacity: 0
    },
    checked: {
        scale: 1,
        opacity: 1
    },
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
    visible: {
        opacity: 1,
    },
    hidden: {
    },
    rollStop: {
        opacity: 1,
    }
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
            delay: .25
        }
    },
    hidden: {
        opacity: 0,
        y: 1000
    }
}

const RollerImg = {
    visible: {
        x: [2000, -2000],
        transition: {
            repeat: Infinity,
            duration: .15
        }
    },
    hidden: {
        x: [1000, 0, -1000],
        y: 0
    },
    rollStop: {
        scale: 1.5,
        x: 0,
    }
}

const RollerName = {
    visible: {
        opacity: 0
    },
    hidden: {
        opacity: 0
    },
    rollStop: {
        opacity: 1
    }
}

// Work on the Random Roller to show from the user button

function RandomRoller({ restaurants, setShowRoll, setShowHomePage}) {
    const history = useHistory();
    const curr = useSelector(state => state.session.user);
    const currId = curr.id;
    const checks = new Array(restaurants.length).fill(true);
    const [resPicked, setResPicked] = useState([]);
    const [showSelect, setShowSelect] = useState(true);
    const [currRes, setCurrRes] = useState({})
    const [showReroll, setShowReroll] = useState(false);


// Handles the submission of the selected restaurants to roll
    const handleSelection = (e) => {
        e.preventDefault()
        const newSet = []
        checks.filter((ele, i) => {
            if (ele !== false) {
                newSet.push(restaurants[i])
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
                "user_id": currId
            })
        })
        await res.json();
        history.push(`/users/${currId}`);
    }

    return (
        <AnimatePresence>
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
                    <h2>Deselect the restaurants you don't want</h2>
                <motion.fieldset
                    variants={ActualRoller}
                    initial='hidden'
                    animate='visible'
                    
                >
                {restaurants.map((ele, i) => {
                    return (
                        <motion.div
                          id={i}
                          variants={resLis}
                          initial='hidden'
                          animate='visible'
                          whileTap='tap'
                          whileHover='hover'
                          exit={'exit'}
                          custom={i}
                          key={i} 
                          className='mainHolder'
                         >
                            <motion.div
                              id={i}
                              variants={lis}
                              className='labels'
                              onClick={handleChecks}
                             >
                                <img id={i} src={ele.logo} alt='logo' onClick={handleChecks} />
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
                        animate={!showReroll ? 'visible' : 'rollStop'}
                        className='labels randomSelect'
                        id='label'
                    >
                        <motion.img 
                            variants={RollerImg}
                            initial='hidden'
                            animate={!showReroll ? 'visible': 'rollStop'}
                            src={currRes.logo} 
                            alt='logo'
                            id='lblimage'
                            />
                            <motion.div
                                variant={RollerName}
                                initial='hidden'
                                animate={!showReroll ? 'visible' : 'rollStop'}
                                className='holdingResName'
                            >
                                <h5>{currRes.name}</h5>
                            </motion.div>
                    </motion.div>
                    {showReroll &&
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
                    }
                    </div>
                </motion.div>
            )}
        </motion.div>
        </AnimatePresence>
    )
};


export default RandomRoller;