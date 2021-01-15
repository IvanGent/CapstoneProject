from .db import db

class VisitedRestaurant(db.Model):
    __tablename__ = 'visitedRestaurants'

    id = db.Column(db.Integer, primary_key = True)
    res_id = db.Column(db.Integer, db.ForeignKey('restaurants.id'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="visitedRestaurant")
    restaurant = db.relationship("Restaurant", back_populates="visitedRestaurant")

    def to_dict(self):
        return {
            "id": self.id,
            "res_id": self.res_id,
            "user_id": self.user_id,
            "created_at": self.created_at
        }

    def to_joined_dict(self):
        return {
            "id": self.id,
            "res_id": self.res_id,
            "user_id": self.user_id,
            "create_at": self.created_at,
            "user": self.user.to_dict(),
            "restaurant": self.restaruant.to_dict()
        }