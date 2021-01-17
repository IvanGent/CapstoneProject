from flask import Blueprint, jsonify, request
from app.models import db, FavList


favs_routes = Blueprint('favs', __name__)


@favs_routes.route('/', methods=["POST"])
def get_favs():
    try:
        data = request.json
        fav = FavList(
            user_id=data['user_id'],
            res_id=data['res_id']
        )
        db.session.add(fav)
        db.session.commit()
        return { 'message': 'Success'}
    except:
        return { 'errors': ['An error occurred while posting the data']}
    