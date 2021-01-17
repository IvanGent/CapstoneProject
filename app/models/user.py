from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  first_name= db.Column(db.String(40), nullable = False)
  avatar = db.Column(db.Text)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)

  visitedRestaurant = db.relationship('VisitedRestaurant', back_populates='user', lazy=True, cascade="all, delete-orphan")
  favsList = db.relationship('FavList', backref='favsLists', lazy=True)
  # friends = db.relationship("Friend", back_populates='user', 'senderId' )


  def __repr__(self):
    return '<User %r>' % self.username


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "first_name": self.first_name,
      "avatar": self.avatar,
      "email": self.email,
      "visitedRestaurants": [restaurant.to_dict() for restaurant in self.visitedRestaurant],
      "favsList": [fav.to_dict() for fav in self.favsList]
    }
