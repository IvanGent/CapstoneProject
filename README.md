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


## 