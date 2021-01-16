import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Tabs, Tab, Typography, Box, duration} from '@material-ui/core';
import './User.css'

const FriendButton = motion.button

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 600,
    marginTop: 100,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const TabsInfo = {
    visible: {
      y: 0,
      transition: {
        delay: 2
      }
    },
    hidden: {
      y: -50
    }
  }

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Previous Restaurants" {...a11yProps(0)} />
        <Tab label="Friends" {...a11yProps(1)} />
        {/* <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One 
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
    </div>
  );
}
// const 

function User() {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState();
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      console.log(user)
      setUser(user);
      user.avatar ? setAvatar(user.avatar) : setAvatar(process.env.PUBLIC_URL + '/ProfileAvatar.png')
    })();
    console.log(user)
  }, [userId]);

  if (!user) {
    return null;
  }

  const handleFriend = async () => {

  }

  const ProfileInfo = {
    visible: {
      opacity: 1,
      transition: {
        delay: .05
      }
    },
    hidden: {
      opacity: 0,
    }
  }

  const Tabs = {
    visible: {
      width: 700,
      transition: {
        delay: .025
      }
    },
    hidden: {
      width: 0
    }
  }

  return (
      <AnimatePresence>
    <div className='profile'>
        <motion.div
          variants={ProfileInfo}
          initial='hidden'
          animate='visible'
          className='profileInfo'>
            <img src={avatar} alt='avatar' />
          <motion.ul className='userInfo'>
            <li initial='hidden'
              animate='visible'>
              <strong>Username:</strong> {user.username}
            </li>
            <li>
              <strong>Name:</strong> {user.first_name}
            </li>
          </motion.ul>
          {userId === localStorage.getItem('userId') ? null : (
            <div onClick={handleFriend} className='addFriend'>
              <img src={process.env.PUBLIC_URL + '/AddFriend.png'} />
              Add Friend
            </div>
          )}
        </motion.div>
      <motion.div 
        variants={Tabs}
        initial='hidden'
        animate='visible'
        className='tabs'>
        <VerticalTabs />
      </motion.div>
    </div>
      </AnimatePresence>
  );
}
export default User;
