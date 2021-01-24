import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../services/auth'
import './ProfileMenu.css'
// import NavProfile from '../../images/NavProfile.png'


const Menu = {
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
        y: {stiffness: 1000},
        x: 0,
        borderRadius: '25px',
        position:'absolute',
        height: "50vh",
        width: '300px'
    },
    exit: {
        transition: {
            delay: .25
        },
        width: "50px",
        height: "50px",
        borderRadius: '50%',
    }
}

const MenuChilds = {
    show: {
        opacity: 1,
        transition: {
            // delayChildren: 0.5,
            staggerChildren: 0.5,
            // delay: 1,
            
        }
    },
    hidden: {
        opacity: 0
    },
    exit: {
        opacity: 0
    }
}

const Button = {
    visible: {
        width: '100px',
        height: '100px',
        transition: {
            delay: .5
        }
    },
    initial: {
        width: '50px',
        height: '50px'

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
    show: {
        opacity: 1,
        y: 0,
        transition: {
            delay: .5,
            y: {
                stiffness: 1000,
                velocity: -100
            }
        }
    },
    exit: {
        opacity: 0,
        y: 50,
        transition: {
            y: {
                stiffness: 1000,
            }
        }
    }
}

function ProfileMenu({ setAuthenticated, setShowHomePage, setShowButton, setShowRoll, setShowProfilePage, mobileSize }) {
    const [user, setUser] = useState('');
    const [showMenu, setShowMenu] = useState(false);



    const openMenu = (e) => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        setUser(localStorage.getItem('userId'));
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const onLogout = async (e) => {
        await logout();
        setAuthenticated(false);
        setShowHomePage(false);
        setShowButton(true);
        setShowRoll(false);
        setShowProfilePage(false)
        localStorage.removeItem('userId');
        localStorage.removeItem('currUser')
        // history.push('/');
        return;
        // return <Redirect to='/' />
    };

    const handleClick = () => {
        setShowRoll(false);
        setShowHomePage(false)
        setShowProfilePage(true)
    }

    return (
        <motion.div 
            variants={Button}
            // initial='closed'
            animate={showMenu ? 'visible' : 'initial'}
            // whileTap={!showMenu ? 'tap' : null}
            // whileHover={!showMenu ? 'hover' : null}
            onClick={() => setShowMenu(!showMenu)}
            className='profileMenu'>
            {!mobileSize ? (
                <>
                <AnimatePresence>
                    {/* <motion.img
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        src={NavProfile}
                        onClick={openMenu}
                        className='NavImg'
                    /> */}
                </AnimatePresence>
                <AnimatePresence>
                {showMenu && (
                    <motion.div
                        variants={Menu}
                        animate={showMenu ? 'opened' : 'closed'}
                        // whileTap={!showMenu ? 'tap' : null}
                        // whileHover={!showMenu ? 'hover' : null}
                        exit='exit'
                        className='menu'
                    >
                        <motion.ul
                            variants={MenuChilds}
                            initial='hidden'
                            animate='show'
                            className='menuHolder'
                        >
                        {/* <motion.menu initial={{opacity:0, y: -15}} animate={{opacity:1, y: 0}} exit={{opacity:0, height: 0, transition: { duration: .5 }}} className='innerProfileMenu'> */}
                            <motion.li variants={Item} initial='hidden' animate='show' exit='exit'>
                                <h3 onClick={handleClick}>Profile</h3>
                            </motion.li>
                            {/* <li>
                                <NavLink to={`/users/${user}/friendsList`}>Friends List</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/users/${user}/groups`}>Groups</NavLink>
                            </li> */}
                            <motion.li variants={Item} initial='hidden' animate='show' exit='exit'>
                                <h3 id='logout' onClick={onLogout}>Logout</h3>
                            </motion.li>
                        {/* </motion.menu> */}
                        </motion.ul>
                    </motion.div>
                )}
                        </AnimatePresence>
                </>
            ) : (
                <>
                <AnimatePresence>
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.8 }}
                        src={process.env.PUBLIC_URL + '/MobileMenu.png'}
                        onClick={openMenu}
                        className='NavImg'
                    />
                    </AnimatePresence>
                    {showMenu && (
                        <AnimatePresence>
                        <ul>
                            <motion.menu initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className='innerProfileMenu'>
                                <li>
                                    <div onClick={handleClick}>Profile</div>
                                </li>
                                {/* <li>
                            <NavLink to={`/users/${user}/friendsList`}>Friends List</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/users/${user}/groups`}>Groups</NavLink>
                        </li> */}
                                <li>
                                    <div id='logout' onClick={onLogout}>Logout</div>
                                </li>
                            </motion.menu>
                        </ul>
                </AnimatePresence>
                    )}
                </>
            )}
        </motion.div>
    )
}

export default ProfileMenu;