from .db import db

class Restaurant(db.Model):
    __tablename__ = 'restaurants' 

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255), nullable = False)
    logo = db.Column(db.Text, nullable = True)

    visitedRestaurant = db.relationship('VisitedRestaurant', back_populates='restaurant')

    

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "logo": self.logo
        }