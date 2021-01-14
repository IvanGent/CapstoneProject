# import os
from flask import Blueprint, jsonify, request
from flask_login import login_required
import requests
from app.models import db, Restaurant
from sqlalchemy.exc import SQLAlchemyError


# api_key = os.environ.get("API_KEY")

restaurant_routes = Blueprint('restaurants', __name__)

# getting nearby restaurants.
@restaurant_routes.route('/<lat>/<long>')
# @login_required
def get_restaurants(lat, long):
    res = requests.get(f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{long}&radius=8000&type=restaurant&key=AIzaSyB0kFjSrYYNIkFvEDGcn4RaFgLm-HsXStc')
    print(res.json())
    return (res.json())

# getting latitude and longitude from zipcode.
@restaurant_routes.route('/<zipcode>')
def get_location_zip(zipcode):
    res = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB0kFjSrYYNIkFvEDGcn4RaFgLm-HsXStc&components=postal_code:{zipcode}')
    return (res.json())

# getting details for a restaurant. I'm using this to get the website to make another call on the frontend
# to get the logo.
@restaurant_routes.route('/details/<placeId>')
def get_place_details(placeId):
    res = requests.get(f'https://maps.googleapis.com/maps/api/place/details/json?place_id={placeId}&fields=name,website&key=AIzaSyB0kFjSrYYNIkFvEDGcn4RaFgLm-HsXStc')
    return (res.json())

# checking if a restaurant exist in the database.
@restaurant_routes.route('/single/<name>')
def get_a_restaurant(name):
    try:
        print('NAME:', name)
        res = Restaurant.query.filter(Restaurant.name == name).first()
        print(res)
        res_json = jsonify(res.to_dict())
        return res_json
    except:
        # error = str(e.__dict__['orig'])
        return {'errors': ['An error occured while retrieving the data']}


# adding a restaurant to the database.
@restaurant_routes.route('/single', methods=["POST"])
def adding_restaurant():
    data = request.json
    res = Restaurant(
        name=data['name'],
        logo=data['logo']
    )
    db.session.add(res)
    db.session.commit()
    return {'message': 'Success'}, 201