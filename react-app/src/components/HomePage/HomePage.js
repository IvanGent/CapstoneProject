import React, { useState } from 'react';
import RandomRoller from '../RandomRoller/RandomRoller';
import './HomePage.css'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AnimatePresence, motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
            boxShadow: 'none',
        },
        boxShadow: 'none',
        background: 'none',
    },
}));

export function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress color="secondary" />
        </div>
    );
}

const Home = {
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    },
    exit: {
        opacity: 0
    }
}

const innerHome = {
    visible: {
        x: 0
        // opacity: 1
    },
    hidden: {
        x: 2000
        // opacity: 0
    },
    exit: {
        // opacity: 0
    }
}

const HomePage = ({ data, setData, showRoll, setShowRoll, setShowHomePage}) => {
    const [zipcode, setZipcode] = useState('');
    const [zipError, setZipError] = useState('');
    // const [data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    
// Getting the website for every place found to make an api call to clearbit to get the logo.
    const gettingDetails = async (placeId, name) => {
        const res2 = await fetch(`/api/restaurants/single/${name}`)
        const result2 = await res2.json()
        if ('errors' in result2) {
            const res = await fetch(`/api/restaurants/details/${placeId}`)
            const {result} = await res.json()
            if(result.website) {
                let web = result.website.split('.')
                for (let i = 0; i < web.length; i++) {
                    if (web[i].startsWith('com')) {
                        result.logo = '//logo.clearbit.com/' + web[i - 1] + '.com'
                        const logoRes = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${web[i - 1]}`)
                        const data = await logoRes.json();
                        if (!data.length) {
                            result.logo = '/images/Restaurant.png'
                        }
                    }
                }
            } else {
                result.logo = '/images/Restaurant.png'

            }
            const addedRes = await addingRestaurant(result.name, result.logo)
            return addedRes
        }
        return result2
    }


// POSTs a new restaurant to make lookups faster.
    const addingRestaurant = async (name, logo) => {
        const newRes = await fetch('/api/restaurants/single', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": name,
                "logo": logo
            })
        })
        const res = await newRes.json()
        return res
    }

// Getting all the nearby restaurants and filtering out the gas stations and also 
// getting rid of duplicates.

    const gettingResturants = async (lat, lng) => {
        const res = await fetch(`/api/restaurants/${lat}/${lng}`)
        const { results } = await res.json()
        let newData = {}

        await results.filter(ele => {
            if (!ele.types.includes('gas_station') && ele.business_status !== "CLOSED_TEMPORARILY") {
                newData[ele.name] = ele;
            }
            return ele;
        });

        let arrayData = []
        for (let key in newData) {
            arrayData.push(await gettingDetails(newData[key].place_id, newData[key].name));
        };

        setData(arrayData)
    }
    
// Handling the current location with an api call to googles geolocation api.
    // const handleClick = async () => {
    //     setShowLoader(true)
    //         const coords = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, {
    //             method: "POST"
    //         })
    //         const data = await coords.json()
    //         console.log(data)
    //         await gettingResturants(data.location.lat, data.location.lng)
    // }

    // changing how to get coords to using JS API instead of googles geolocation api.
    const handleClick = async () => {
        setShowLoader(true)
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                await gettingResturants(position.coords.latitude, position.coords.longitude)
            })
        }
    }

    const updateZipCode = (e) => {
        setZipcode(e.target.value);
    }

// Getting latitude and longitude for a zipcode entry if current location doesn't want to be used.
    const handleZipCode = async (e) => {
        e.preventDefault()

        if (zipcode.length > 4) {
            setShowLoader(true);
            const coords = await fetch(`/api/restaurants/${zipcode}`)
            const {results} = await coords.json()
            console.log(results)
            await gettingResturants(results[0].geometry.location.lat, results[0].geometry.location.lng)
        } else {
            setZipError('Invalid ZipCode')
        }
    }
    

    return (
        <AnimatePresence>
        <motion.div 
        variants={Home}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='homepage'>
                <>
                {data.length || showRoll ? (
                    <RandomRoller 
                        restaurants={data} 
                        showRoll={showRoll} 
                        setShowRoll={setShowRoll} 
                        setShowHomePage={setShowHomePage}
                        />
                ): (
                    <motion.div
                        variants={innerHome}
                        initial='hidden'
                        animate='visible'
                    >
                        {!showLoader ? (
                            <>
                        <div className='innerHome'>
                            <div className='homeCont'>
                        <h2>Choose One To Search For Restaurants</h2>
                        <div className='choices'>
                            <strong onClick={handleClick}>{'Use current location?'}</strong>
                            <div>
                                <form onSubmit={handleZipCode}>
                                    {zipError ? (
                                        <div className='zipError'>{zipError}</div>
                                    ) : (
                                        null
                                    )}
                                    <label>Use Zipcode:</label>
                                    <input 
                                    type='numbers'
                                    placeholder='Zipcode'
                                    onChange={updateZipCode}
                                    ></input>
                                    <AnimatePresence>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            type='submit'
                                        >
                                            Submit
                                        </motion.button>
                                    </AnimatePresence>
                                </form>
                            </div>
                        </div>
                        </div>
                        </div>
                        </>
                        ): (
                            <CircularIndeterminate />
                        )}
                        </motion.div>
                )}
                </>
        </motion.div>
        </AnimatePresence>
    )
}

export default HomePage;