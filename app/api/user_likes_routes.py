from flask import Blueprint
from app.models import db, UserLikes, UserDislikes, Post

user_likes_routes = Blueprint('user_likes', __name__)


@user_likes_routes.route("/<int:userId>/post/<int:postId>", methods=["GET"])
def user_likes(userId, postId):
    user_like = UserLikes.query.filter(UserLikes.post_id == postId).filter(UserLikes.user_id == userId).first()
    if(user_like):
        return {'likes': True}
    else:
        return {'likes': False}


# This route create a connection between a user and a post when upvoting a post.
@user_likes_routes.route("/<int:userId>/post/<int:postId>", methods=["POST"])
def create_user_like(userId, postId):
    post = Post.query.get(postId)
    user_dislike = UserDislikes.query.filter(UserDislikes.post_id == postId).filter(UserDislikes.user_id == userId).first()
    if user_dislike:
        post.karma += 2
        db.session.delete(user_dislike)
        # db.session.commit()

        user_like = UserLikes(
            user_id=userId,
            post_id=postId,
        )
        db.session.add(user_like)
        db.session.commit()
        return {'success': True}
    else:
        post.karma += 1
        user_like = UserLikes(
            user_id=userId,
            post_id=postId,
        )
        db.session.add(user_like)
        db.session.commit()
        return {'success': True}



# This route will remove a connection between a user and a post when upvoting
@user_likes_routes.route("/<int:userId>/post/<int:postId>", methods=["DELETE"])
def delete_user_like(userId, postId):
    post = Post.query.get(postId)
    user_like = UserLikes.query.filter(UserLikes.post_id == postId).filter(UserLikes.user_id == userId).first()
    if user_like:
        post.karma -= 1
        db.session.delete(user_like)
        db.session.commit()
        return {'success': True}
    else:
        post.karma -= 1
        return{'success': False}
