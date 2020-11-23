from .db import db


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    type = db.Column(db.String(10), nullable=False)
    content = db.Column(db.Text, nullable=False)
    karma = db.Column(db.Integer, nullable=False, default=0)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())

    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    subredditId = db.Column(db.Integer,
                            db.ForeignKey('subreddits.id'), nullable=False)

    users = db.relationship('User', back_populates='posts')
    subreddits = db.relationship('Subreddit', back_populates='posts')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'type': self.type,
            'content': self.content,
            'karma': self.karma,
            'created_on': self.created_on
        }
