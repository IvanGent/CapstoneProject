from .db import db

class Friend(db.Model):
    __tablename__ = 'Friends'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    accepted = db.Column(db.Bool, server_default = False)

    # user = db.relationship("User", back_populates='Friends')
    # senderId = db.relationship("User", back_populates='Friends')

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.res_id.to_dict(),
            "sender_id": self.user_id.to_dict(),
            "accepted": self.accepted,
        }