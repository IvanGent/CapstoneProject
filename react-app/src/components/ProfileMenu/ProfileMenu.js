import React, { useState, useEffect } from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { logout } from '../../services/auth'
import './ProfileMenu.css'

const Menu = styled(motion.ul)`
    background-color: black;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 15px;
    margin-top: 22px;
    margin-left: 20px;
`;


function ProfileMenu({ setAuthenticated, setShowHomePage }) {
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
        localStorage.removeItem('userId')
        return <Redirect to='/' />
    };

    return (
        <div className='profileMenu'>
            <AnimatePresence>
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    src={process.env.PUBLIC_URL + '/NavProfile.png'}
                    onClick={openMenu}
                    className='NavImg'
                />
            </AnimatePresence>
            {showMenu && (
                <AnimatePresence>
                    {/* <ul className={`${fade}`}> */}
                    <Menu initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='innerProfile'>
                        <li>
                            <NavLink to={`/users/${user}`} activeClassName="active">Profile</NavLink>
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
                    </Menu>
                    {/* </ul> */}
                </AnimatePresence>
            )}
        </div>
    )
}

export default ProfileMenu;