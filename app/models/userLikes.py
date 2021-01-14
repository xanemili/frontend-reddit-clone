from .db import db

class UserLikes(db.Model):
    __tablename__ = "user_likes"

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)

    db.UniqueConstraint('post_id', 'user_id', name='unique_idx')
