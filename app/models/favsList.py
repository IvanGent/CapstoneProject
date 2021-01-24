from .db import db

class FavList(db.Model):
    __tablename__ = 'favsLists'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    res_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable = False)
    db.UniqueConstraint('user_id', 'res_id', name='unique_favs')

    # user = db.relationship("User", backref='users')   
    restaurant = db.relationship('Restaurant', backref='restaurants', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "res_id": self.res_id,
            "restaurant": self.restaurant.to_dict()
        }