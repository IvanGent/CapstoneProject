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
        return jsonify(fav.to_dict())
    except:
        return { 'errors': ['An error occurred while posting the data']}
    

@favs_routes.route('/del', methods=["DELETE"])
def unfav():
    try:
        data = request.json
        fav = FavList.query.filter(
            FavList.res_id == data['res_id'], 
            FavList.user_id == data['user_id']).first()
        print('IT GOT THE FAV')
        db.session.delete(fav)
        db.session.commit()
        return { 'message': 'Success'}
    except:
        return { 'errors': ['An error occurred while posting the data']}