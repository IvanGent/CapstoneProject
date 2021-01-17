from flask import Blueprint, jsonify, request
from app.models import db, FavList


favs_routes = Blueprint('favs', __name__)


@favs_routes.route('/')
def get_favs():
    