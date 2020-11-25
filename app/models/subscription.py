from .db import db


class Subscrition(db.Model):
    __tablename__ = 'subreddit_subscriptions'

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    subreddit_id = db.Column(db.Integer, db.ForeignKey('subreddits.id'), primary_key=True)

    db.UniqueConstraint('subreddit_id', 'user_id', name='unique_idx')
