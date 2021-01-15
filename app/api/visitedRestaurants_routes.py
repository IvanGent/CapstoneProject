from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, VisitedRestaurant
from sqlalchemy.exc import SQLAlchemyError


visitedRestaurant_routes = Blueprint('visited', __name__)

@visitedRestaurant_route('<name>', methods=["POST"])
def add_a_restaurant(name):
    data = request.json
    res = VisitedRestaurant(
        res_id=data['res_id']
        user_id=data['user_id']
    )
    db.session.add(res)
    db.commit()
    return {'message': 'Success'}, 201