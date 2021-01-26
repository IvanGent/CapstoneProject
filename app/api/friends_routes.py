from flask import Blueprint, jsonify, request
from app.models import db, Friend


friends_routes = Blueprint('friend', __name__)


@friends_routes.route('/', methods=["POST"])
def add_friend():
    try:
        print("HELLO")
        data = request.json
        print(data)
        newFriend = Friend(
            user_id=data['user_id'],
            sender_id=data['sender_id']
        )
        print(newFriend)
        db.session.add(newFriend)
        db.session.commit()
        return {'message': 'Success'}
    except:
        return {'error': ['An error occurred adding a friend']}


@friends_routes.route('/', methods=["DELETE"])
def unfriend():
    try:
        data = request.json
        friendship = Friend.query.filter(
            Friend.user_id == data['user_id'],
            Friend.sender_id == data['sender_id'].first()
        )
        db.session.delete(friendship)
        db.session.commit()
        return {'message': 'Success'}
    except:
        return {'error': ['An error occurred while unfriending']}