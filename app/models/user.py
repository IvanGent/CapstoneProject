from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

db.metadata.clear()

friend = db.Table(
  'friends',
  db.Column('user_id', db.Integer, db.ForeignKey('users.id'), index=True),
  db.Column('sender_id', db.Integer, db.ForeignKey('users.id')),
  db.UniqueConstraint('user_id', 'sender_id', name='unique_friends')
)

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  first_name= db.Column(db.String(40), nullable = False)
  avatar = db.Column(db.Text)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)

  visitedRestaurant = db.relationship('VisitedRestaurant', backref='visitedrestaurants', order_by='VisitedRestaurant.created_at.desc()', lazy=True, cascade="all, delete-orphan")
  favsList = db.relationship('FavList', backref='favsLists', lazy=True, cascade="all, delete-orphan")
  friendships = db.relationship('User', backref='friends', secondary=friend, primaryjoin=id==friend.c.user_id, secondaryjoin=id==friend.c.sender_id)
  

  def addfriend(self, friend):
    if friend not in self.friendships:
      self.friendships.append(User.query.get(friend))
      User.query.get(friend).friendships.append(self)

  def unfriend(self, friend):
    if friend in self.friendships:
      self.friendships.remove(User.query.get(friend))
      User.query.get(friend).friendships.remove(self)
  
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
  

  def to_original_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "first_name": self.first_name,
      "avatar": self.avatar,
      "email": self.email,
      "visitedRestaurants": [restaurant.to_dict() for restaurant in self.visitedRestaurant],
      "favsList": [fav.to_dict() for fav in self.favsList],
    }


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "first_name": self.first_name,
      "avatar": self.avatar,
      "email": self.email,
      "visitedRestaurants": [restaurant.to_dict() for restaurant in self.visitedRestaurant],
      "favsList": [fav.to_dict() for fav in self.favsList],
      "friends": [friend.to_original_dict() for friend in self.friendships]
    }
