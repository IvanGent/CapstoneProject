from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, VisitedRestaurant
from sqlalchemy.exc import SQLAlchemyError


visitedRestaurant_routes = Blueprint('visitedRestaurant', __name__)

@visitedRestaurant_routes.route('/', methods=["POST"])
# @login_required
def add_a_restaurant():
    data = request.json
    res = VisitedRestaurant(
        res_id=data['res_id'],
        user_id=data['user_id']
    )
    db.session.add(res)
    db.session.commit()
    return {'message': 'Success'}, 201


@visitedRestaurant_routes.route('/', methods=["DELETE"])
def delete_a_restaurant():
    try:
        data = request.json
        res = VisitedRestaurant.query.get(data['id'])
        db.session.delete(res)
        db.session.commit()
        return {'message': 'Success'}
    except:
        return { 'errors': ['An error occurred while posting the data']}
