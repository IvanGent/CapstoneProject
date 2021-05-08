import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import * as sessionActions from '../../store/session';
import './ProfileMenu.css'


const MenuChilds = {
    show: {
        opacity: 1,
    },
    hidden: {
        opacity: 0
    },
    exit: {
        opacity: 0
    }
}

const Item = {
    hidden: {
        opacity: 0,
        y: 50,
        transition: {
            y: {
                stiffness: 1000,
            }
        }
    },
    show: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * .1,
            y: {
                stiffness: 1000,
                velocity: -100
            }
        }
    }),
    exit: (i) =>  ({
        opacity: 0,
        y: 50,
        transition: {
            delay: .25,
            y: {
                stiffness: 1000,
            }
        }
    })
}

function ProfileMenu({ setAuthenticated, setShowHomePage, setShowRoll}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const currUser = useSelector(state => state.session.user.id);
    let Button;
    let Menu;

    // if (!mobileSize) {
        Button = {
            visible: {
                width: '100px',
                height: '100px',
            },
            initial: {
                width: '50px',
                height: '50px',
                transition: {
                    delay: .3
                }
            }
        }
        Menu = {
            closed: {
                x: 0,
                width: "50px",
                height: "50px",
                borderRadius: '50%',

            },
            opened: {
                transition: {
                    type: 'spring',
                    stiffness: 100,
                },
                y: { stiffness: 1000 },
                x: 0,
                borderRadius: '25px',
                position: 'absolute',
                height: "30vh",
                width: '300px'
            },
            exit: {
                transition: {
                    delay: .4
                },
                width: "50px",
                height: "50px",
                borderRadius: '50%',
            }
        }
    // } else {
        // Button = {
        //     visible: {
        //         width: '100px',
        //         height: '100px',
        //     },
        //     initial: {
        //         width: '100px',
        //         height: '100px',
        //         transition: {
        //             delay: .3
        //         }
        //     }
        // }
        // Menu = {
        //     closed: {
        //         x: 0,
        //         width: "95px",
        //         height: "95px",
        //         borderRadius: '50%',

        //     },
        //     opened: {
        //         transition: {
        //             type: 'spring',
        //             stiffness: 100,
        //         },
        //         y: { stiffness: 1000 },
        //         x: 0,
        //         borderRadius: '25px',
        //         position: 'absolute',
        //         height: "50vh",
        //         width: '80vw'
        //     },
        //     exit: {
        //         transition: {
        //             delay: .4
        //         },
        //         opacity: 0,
        //     }
        // }
    // }
    


    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const onLogout = async (e) => {
        setAuthenticated(false);
        setShowHomePage(false);
        setShowRoll(false);
        localStorage.removeItem('userId');
        localStorage.removeItem('currUser')
        await dispatch(sessionActions.logout());
        return;
    };

    const handleProfileClick = () => {
        localStorage.setItem('userId', currUser);
        setShowRoll(false);
        setShowHomePage(false);
        history.push(`/users/${currUser}`);
    }

    const goHome = () => {
        localStorage.setItem('userId', currUser)
        setShowRoll(false);
        setShowHomePage(true);
        history.push('/');
    }


    const handleFaves = () => {
        setShowHomePage(false);
        localStorage.setItem('userId', currUser)
    }

    return (
        <div className='outerMenu'>
        <motion.img 
            animate={showMenu ? {opacity: 0} : {opacity: 1, transition: {delay: .3}} } 
            src='/images/MobileMenu.png'
            alt='menu' 
            onClick={() => setShowMenu(!showMenu)} 
            />
        <motion.img 
            src='/images/Cross.png'
            alt='menu'
                animate={showMenu ? { opacity: 1, transition: { delay: .3 } } : { opacity: 0}}
            onClick={() => setShowMenu(!showMenu)}
        />  
        <motion.div 
            variants={Button}
            animate={showMenu ? 'visible' : 'initial'}
            onClick={() => setShowMenu(!showMenu)}
            className='profileMenu'>
            
                <>
                <AnimatePresence>
                </AnimatePresence>
                <AnimatePresence>
                {showMenu && (
                    <motion.div
                    variants={Menu}
                    animate={showMenu ? 'opened' : 'closed'}
                    exit='exit'
                    className='menu'
                    >
                        <motion.ul
                            variants={MenuChilds}
                            initial='hidden'
                            animate='show'
                            className='menuHolder'
                        >
                            <motion.li variants={Item} initial='hidden' animate='show' exit='exit' custom={1}>
                                <h3 onClick={goHome}>Home</h3>
                            </motion.li>
                            <motion.li variants={Item} initial='hidden' animate='show' exit='exit' custom={2}>
                                <h3 onClick={handleProfileClick}>Profile</h3>
                            </motion.li>
                            <motion.li variants={Item} initial='hidden' animate='show' exit='exit' custom={4}>
                                <h3 onClick={handleFaves}>Favorites List</h3>
                            </motion.li>
                            <motion.li variants={Item} initial='hidden' animate='show' exit='exit' custom={5}>
                                <h3 id='logout' onClick={onLogout}>Logout</h3>
                            </motion.li>
                        </motion.ul>
                    </motion.div>
                )}
                        </AnimatePresence>
                </>
        </motion.div>
        </div>
    )
}

export default ProfileMenu;