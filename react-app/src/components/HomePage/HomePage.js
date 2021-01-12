import React, { useEffect, useState } from 'react';
import RandomRoller from '../RandomRoller/RandomRoller';
// import { NavLink } from 'react-router-dom';
import './HomePage.css'
// import BackgroundImage from './StockSnap_N0KS0SFLO2.jpg'

const HomePage = () => {
    const [zipcode, setZipcode] = useState('');
    const [zipError, setZipError] = useState('');
    const [data, setData] = useState([]);
    
// Getting the website for every place found to get the logo.
    const gettingDetails = async (placeId) => {
        const res = await fetch(`/api/restaurants/details/${placeId}`)
        const {result} = await res.json()
        console.log(result)
        if(result.website) {
            result.website = '//logo.clearbit.com/' + result.website.split('.')[1] + '.com'
        } else {
            result.website = require('../../images/McLogo.png')
        }
        console.log(result)
        return result
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
        });

        console.log(newData)
        let arrayData = []
        for (let key in newData) {
            arrayData.push(await gettingDetails(newData[key].place_id));
        };

        setData(arrayData)
    }
    
// Handling the current location with an api call to googles geolocation api.
    const handleClick = async () => {
            const coords = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyB0kFjSrYYNIkFvEDGcn4RaFgLm-HsXStc', {
                method: "POST"
            })
            const data = await coords.json()
            await gettingResturants(data.location.lat, data.location.lng)
            // const res2 = await fetch(`/api/resturants/${data.location.lat}/${data.location.lng}`)
            // const restData = await res2.json()
            // const results = restData.results
            // let newData = {}

            // results.filter(ele => {
            //     if(!ele.types.includes('gas_station')){
            //         newData[ele.name] = ele;
            //     }
            // });

            // console.log(newData)
            // let arrayData = []
            // for(let key in newData) {
            //     arrayData.push(newData[key]);
            // };

            // setData(arrayData)
    }

    const updateZipCode = (e) => {
        setZipcode(e.target.value);
    }

// Getting latitude and longitude for a zipcode entry if current location doesn't want to be used.
    const handleZipCode = async (e) => {
        e.preventDefault()
        if (zipcode.length > 4) {
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
            {/* {errors ? (
                <div>{errors}</div>
            ) : (
                null
            )} */}

            {zipError ? (
                <div>{zipError}</div>
            ) : (
                null
            )}
            <div>
            {data.length ? (
                // data.map((ele, i) => {
                //     return (
                //         <div key={i}>
                //             <img src={ele.website} />
                //             <h5 >{ele.name}</h5>
                //         </div>
                //     )
                // }) 
                <RandomRoller restaurants={data} />
            ): (
                <div>
                    <strong onClick={handleClick}>Use current location?</strong>
                    <form onSubmit={handleZipCode}>
                        <label>Or use zipcode</label>
                        <input 
                        type='numbers'
                        placeholder='Zipcode'
                        onChange={updateZipCode}
                        ></input>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
                
            )}
            </div>
            {/* <img src={BackgroundImage} alt='Background'/> */}
        </div>
    )
}

export default HomePage;