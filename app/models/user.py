from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    # deleted = db.Column(db.DateTime, default=False)

    subreddits = db.relationship('Subreddit', back_populates='users')
    posts = db.relationship('Post', back_populates='users')
    subscriptions = db.relationship(
        'Subreddit', back_populates='subscribers',
        secondary='subreddit_subscriptions',
        # cascade='all, delete'
        )
    comments = db.relationship('Comment', back_populates='user')    

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        # if self.deleted:
        #     return {
        #         "id": self.id,
        #         "username": 'deleted',
        #         "email": 'deleted'
        #     }
        subscriptions = [subreddit.name
                         for subreddit in self.subscriptions]
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "subscriptions": subscriptions
        }

    # Returns all information for a user
    def to_joined_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            'subreddits': [subreddit.to_dict() for subreddit in self.subreddits],
            "posts": [post.to_simple_dict() for post in self.posts],
            "created_at": self.created_at,
        }
