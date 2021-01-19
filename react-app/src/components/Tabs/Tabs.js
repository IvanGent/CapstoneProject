import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import Listing from '../Listing/Listing'

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
                    <Typography component={'div'}>{children}</Typography>
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
    const [value, setValue] = useState(0);
    const [showTab1, setShowTab1] = useState(true);
    const [showTab2, setShowTab2] = useState(false);

    const handleChange = (event, newValue) => {
        // console.log(newValue)
        if (newValue === 0) {
            setShowTab1(true)
            setShowTab2(false)
        } else {
            setShowTab1(false)
            setShowTab2(true)
        }
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                id='ProTabs'
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Previous Restaurants" {...a11yProps(0)} />
                <Tab label="Favorites" {...a11yProps(1)} />
                {/* <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
            </Tabs>
            <TabPanel value={value} index={0}>
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: .07 } }} exit={{ opacity: 0 }}>
                        <Listing showTab1={showTab1} />
                    </motion.div>
                </AnimatePresence>
                {/* Item One  */}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: .07 } }} exit={{ opacity: 0 }}>
                        <Listing showTab2={showTab2} />
                    </motion.div>
                </AnimatePresence>
                {/* Item Two */}
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

export default VerticalTabs;