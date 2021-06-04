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
At first it would grab the location but then lose it and reset the latitude and longitude, I think it was my machine more than something wrong with the code but without those coordinates, the use current location wouldn't work. My alternate decision was using Googles geolocation api: 

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

