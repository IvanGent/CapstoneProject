import os
from flask import Blueprint, jsonify, request
from flask_login import login_required
import requests
from app.models import Restaurant


api_key = os.environ.get("API_KEY")

restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route('/<lat>/<long>')
# @login_required
def get_restaurants(lat, long):
    res = requests.get(f'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{long}&radius=4000&type=restaurant&key=AIzaSyB0kFjSrYYNIkFvEDGcn4RaFgLm-HsXStc')
    print(res.json())
    return (res.json())


@restaurant_routes.route('/<zipcode>')
def get_location_zip(zipcode):
    res = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB0kFjSrYYNIkFvEDGcn4RaFgLm-HsXStc&components=postal_code:{zipcode}')
    return (res.json())


@restaurant_routes.route('/details/<placeId>')
def get_place_details(placeId):
    res = requests.get(f'https://maps.googleapis.com/maps/api/place/details/json?place_id={placeId}&fields=name,website&key=AIzaSyB0kFjSrYYNIkFvEDGcn4RaFgLm-HsXStc')
    return (res.json())


@restaurant_routes.route('/single/<name>')
def get_a_restaurant(name):
    try:
        res = Restaurant.query.filter(Restaurant.name == name)
        
    except: