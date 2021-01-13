from flask import Blueprint
from app.models import db, UserLikes, UserDislikes

user_likes_routes = Blueprint('user_likes', __name__)


# This route create a connection between a user and a post when upvoting a post.
@user_likes_routes.route("/<int:userId>/post/<int:postId>", methods=["POST"])
def create_user_like(userId, postId):
    user_dislike = UserDislikes.query.filter(UserDislikes.post_id == postId).filter(UserDislikes.user_id == userId).first()
    if user_dislike:
        db.session.delete(user_dislike)
        db.session.commit()

    user_like = UserLikes(
        user_id=userId,
        post_id=postId,
    )
    db.session.add(user_like)
    db.session.commit()
    return {'success': 'user_like has been created'}


# This route will remove a connection between a user and a post when downvoting
@user_likes_routes.route("/<int:userId>/post/<int:postId>", methods=["DELETE"])
def delete_user_like(userId, postId):
    user_like = UserLikes.query.filter(UserLikes.post_id == postId).filter(UserLikes.user_id == userId).first()
    if user_like:
        db.session.delete(user_like)
        db.session.commit()
        return {'success': 'user_like has been deleted'}
    else:
        return{'error': 'user does not like this post'}
