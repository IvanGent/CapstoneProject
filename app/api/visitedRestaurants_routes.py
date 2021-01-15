from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, VisitedRestaurant
from sqlalchemy.exc import SQLAlchemyError


visitedRestaurant_routes = Blueprint('visitedRestaurant', __name__)

@visitedRestaurant_routes.route('/', methods=["POST"])
def add_a_restaurant():
    data = request.json
    print(data)
    res = VisitedRestaurant(
        res_id=data['res_id'],
        user_id=data['user_id']
    )
    db.session.add(res)
    db.session.commit()
    return {'message': 'Success'}, 201