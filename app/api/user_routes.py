from flask import Blueprint, jsonify, request
from flask_login import login_required
import requests
import os
from app.models import db, User

user_routes = Blueprint('users', __name__)
api_key = os.environ.get("API_KEY")


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_user(id):
    try:
        data = request.json
        user = User.query.get(id)
        user.avatar = data['avatar']
        db.session.commit()
        return {'message': 'Success'}
    except Exception as e:
        return {'errors': 'Problem updating avatar.'}


@user_routes.route('/friend', methods=["POST"])
# @login_required
def add_friend():
    # try:
    data = request.json
    print('THIS IS DATA', data)
    print('AFTER DATA')
    user = User.query.get(data['sender_id'])
    print('USER', user)
    user.addfriend(data['user_id'])
    print('THIS IS USER', user)
    db.session.commit()
    return {'message': 'Success'}
    # except Exception as e:
    #     return {'errors': 'Problem adding friend.'}