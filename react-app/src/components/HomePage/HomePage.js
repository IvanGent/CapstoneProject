import React, { useEffect, useState } from 'react';
import RandomRoller from '../RandomRoller/RandomRoller';
import './HomePage.css'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
        marginTop: '500px'
    },
}));

export function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <CircularProgress /> */}
            <CircularProgress color="secondary" />
        </div>
    );
}

const HomePage = ({setShowForms}) => {
    const [zipcode, setZipcode] = useState('');
    const [zipError, setZipError] = useState('');
    const [data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

    
// Getting the website for every place found to get the logo.
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
                            // console.log('NO ZONE')
                            result.logo = process.env.PUBLIC_URL + '/Restaurant.png'
                        }
                    }
                }
            } else {
                result.logo = process.env.PUBLIC_URL + '/Restaurant.png'

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
        // const results = restData.results
        let newData = {}

        await results.filter(ele => {
            if (!ele.types.includes('gas_station')) {

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
    const handleClick = async () => {
        setShowLoader(true)
            const coords = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB0kFjSrYYNIkFvEDGcn4RaFgLm-HsXStc', {
                method: "POST"
            })
            const data = await coords.json()
            await gettingResturants(data.location.lat, data.location.lng)
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
            const { results } = await coords.json()
            await gettingResturants(results[0].geometry.location.lat, results[0].geometry.location.lng)
        } else {
            setZipError('Invalid ZipCode')
        }
    }
    
    useEffect(() => {
        
    }, [])

    return (
        <div className='homepage'>
            {zipError ? (
                <div>{zipError}</div>
            ) : (
                null
            )}
            <div>
            
            {data.length ? (
                    <RandomRoller restaurants={data} />
            ): (
                <div>
                    {!showLoader ? (
                    <div className='choices'>
                        <strong onClick={handleClick}>Use current location?</strong>
                        <h5>OR</h5>
                        <form onSubmit={handleZipCode}>
                            <label>use zipcode</label>
                            <input 
                            type='numbers'
                            placeholder='Zipcode'
                            onChange={updateZipCode}
                            ></input>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                    ): (
                        <CircularIndeterminate />
                    )}
                </div>
                
            )}
            </div>
        </div>
    )
}

export default HomePage;