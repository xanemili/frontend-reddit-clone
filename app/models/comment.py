from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    parentId = db.Column(db.Integer, db.ForeignKey('comments.id'))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(db.DateTime, server_default=db.func.now(),
                           server_onupdate=db.func.now())
    user = db.relationship('User', back_populates='comments')
    posts = db.relationship('Post', back_populates='comments')
    parents = db.relationship('Comment', remote_side=[id])

    def to_simple_dict(self):
        return {
            'id': self.id,
            'postId': self.postId,
            'userId': self.userId,
            'content': self.content,
            'parentId': self.parentId,
            'created_on': self.created_on,
            'update_on': self.updated_on
        }
