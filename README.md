# What-To-Bite (https://what-to-bite.herokuapp.com/)

**Table of Contents**
- What-To-Bite
	- [Description](#description)
	- [Technologies](#technologies)
	- [Frontend Overview](#frontend-overview)
	- [Backend Overview](#backend-overview)
	- [Early Complication](#early-complications)
	- [Conclusion, Next Steps](#conclusion,-next-steps)


## Description

* What-To-Bite is an application that randomly chooses a place to eat when you're
indecisive. The application takes your current location and uses Googles Places API
to get nearby restaurants to randomly pick one.


## Technologies
	- JavaScript
	- React
	- Redux
	- PostgreSQL
	- Python
	- Flask

## Frontend Overview

What-To-Bite uses React which only updates the components that need to be updated.
Keeps the user engaged with the site. Things that need to be updated are done with AJAX to get the information so there is no need for the page to refresh.


## Backend Overview

RESTful APIs are used to query the database for the information aswell as calls 
being made to Google's API to get information aswell.


## Early Complications

The first complication I came across was getting someone's location. My initial approach was: 

```js
const handleClick = async () => {
        // setShowLoader(true) FOR STATE IN APP
        if('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                await gettingResturants(position.coords.latitude, position.coords.longitude)
            })
        }
    }
```
grabbing the coordinates from navigator would be the best way to get a users location.
At first it would grab the location but then lose it and reset the latitude and longitude, I think it was my machine more than something wrong with the code but without those coordinates, the 'use current location' wouldn't work. My alternate decision was using Googles geolocation api (not being used now since navigator is working): 

```js
 const handleClick = async () => {
    // setShowLoader(true) FOR STATE IN APP
    const coords = await fetch(`https://www.googleapis.com/geolocationgeolocate?key=${API_KEY}`, {
        method: "POST"
    })
    const data = await coords.json();
    await gettingResturants(data.location.lat, data.location.lng);
	}
```
Using this API would give me the latitude and longitude needed to pass through a function to the nearby restaurants:

```js
const gettingResturants = async (lat, lng) => {
  const res = await fetch(`/api/restaurants/${lat}/${lng}`)
  const { results } = await res.json()
  let newData = {}

  await results.filter(ele => {
      if (!ele.types.includes('gas_station') && ele.business_status !"CLOSED_TEMPORARILY") {
          newData[ele.name] = ele;
      }
      return ele;
  });

  let arrayData = []
  for (let key in newData) {
      arrayData.push(await gettingDetails(newData[key].place_id, newData[kename));
  };

  setData(arrayData)
}
```
When originally getting nearby restaurants, it was also getting ones that were temporarily closed and gas stations. When the restaurants come in, this function checks if the types doesn't include 'gas_station' and if the status is not 'CLOSED_TEMPORARILY', if both of them don't exist then the restaurant is added to a newData object to get details. The database is just storing restaurants names and logos, the logos are using clearbit API. The reason I did that is to get the restaurants website since clearbit uses that for their logos, so if I save the website then I don't have to make so many calls to Googles Places API, just grab from my own DB if it's there and if not then make a fetch call to Googles API and save the info for when that restaurant comes up as a result again.

## Conclusion

I had a lot of fun with this project, working with Googles Cloud Platform was a little challenging at first but I got through it. I will say that I found myself writing a lot of unnecessary code which I went back through my entire project and rewrote a lot of it to get it to this state now. I enjoyed going through it and cleaning up and I will continue to do so with this and projects in the future.

Thank you for reading!