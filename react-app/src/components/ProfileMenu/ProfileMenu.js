import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../../services/auth'
import './ProfileMenu.css'
// import NavProfile from '../../images/NavProfile.png'


const Menu = {
    closed: {
        // clipPath: "circle(30px at 40px 40px)",
        x:"-100%",
        width: "25px",
        height: "25px",
        borderRadius: '50%',
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40
        }
    },
    opened: {
        // clipPath: `circle(${height * 2 + 200} px at 40px 40px)`,
        // transition: {
        //     type: 'spring',
        //     stiffness: 20,
        //     restDelta: 2
        // },
        x:0,
        // borderRadius: '0%',
        position:'absolute',
        height: "100%",
        width: "50px"
    },
    hover: {
        scale: 1.1,
        opacity: 0.9
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
            variants={Menu}
            // initial='closed'
            animate={showMenu ? 'opened' : 'closed'}
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
                        <ul>
                        <motion.menu initial={{opacity:0, y: -15}} animate={{opacity:1, y: 0}} exit={{opacity:0, height: 0, transition: { duration: .5 }}} className='innerProfileMenu'>
                            <motion.li exit={{opacity: 0, y: -30, transition: { duration: .35 }}}>
                                <h3 onClick={handleClick}>Profile</h3>
                            </motion.li>
                            {/* <li>
                                <NavLink to={`/users/${user}/friendsList`}>Friends List</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/users/${user}/groups`}>Groups</NavLink>
                            </li> */}
                            <motion.li exit={{opacity: 0, y: -30, transition: { duration: .35 }}}>
                                <div id='logout' onClick={onLogout}>Logout</div>
                            </motion.li>
                        </motion.menu>
                        </ul>
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
                                    <NavLink to={`/users/${user}`} activeClassName="active" onClick={handleClick}>Profile</NavLink>
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