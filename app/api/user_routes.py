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
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=["PUT"])
# @login_required
def update_user(id):
    try:
        data = request.json
        print('THIS IS PRINTING')
        print(data)
        user = User.query.get(id)
        # user = user.to_dict()
        user.avatar = data['avatar']
        print('LINE 35: THIS IS THE USER', user.to_dict())
        print('LINE 36: THIS IS A TEST LINE TO SEE')
        # User.query.filter(User.id == id). \
        #     update({"avatar": data['avatar'], synchronize_session='fetch'})
        # db.session.add(user)
        # db.session.commit()
        userCheck = User.query.get(id)
        db.session.commit()
        print("LINE 42: THIS IS THE USER AFTER THE COMMIT", userCheck.to_dict())
        return {'message': 'Success'}
    except Exception as e:
        print(str(e))
        return {'errors': 'Problem updating avatar.'}