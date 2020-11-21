from .db import db


class Subreddit(db.Model):
    __tablename = 'subreddits'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True)
    about = db.Column(db.Text)
    rules = db.Column(db.Text)
    owner = db.Column(db.Integer, ForeignKey('users.id'))

    users = relationship("User", backpopulates='subreddit')

    def to_dict(self):
        return {
            'name': self.name,
            'about': self.about,
            'rules': self.rules,
            'owner': self.owner
        }