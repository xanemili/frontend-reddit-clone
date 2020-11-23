from flask import Blueprint, jsonify, request
from app.models import db, Post, Subreddit, User
from app.forms import PostForm
from sqlalchemy.exc import IntegrityError
from flask_login import current_user, login_required

post_routes = Blueprint('posts', __name__)


@post_routes.route("/create", methods=['POST'])
# @login_required
def create_post():
    """
    Creates a new post
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form:
        try:
            post = Post(
                userId=current_user.id,
                subredditId=form.data['subredditId'],
                title=form.data['title'],
                type=form.data['type'],
                content=form.data['content'],
            )
            db.session.add(post)
            db.session.commit()
            return post.to_simple_dict()
        except IntegrityError:
            return {"error": "new error"}


@post_routes.route("/<int:postId>", methods=["GET"])
def display_post(postId):
    """
    Display information for a specific post with the id = postId
    """
    post = Post.query.filter(Post.id == postId).join(Subreddit)\
        .join(User).one()
    if not post:
        return 'Post does not exist'
    return post.to_joined_dict()


@post_routes.route("/r/<string:subreddit>", methods=["GET"])
def subreddit_posts(subreddit):
    """
    Returns every post that belongs to a subreddit
    """
    print(subreddit)
    posts = db.session.query(Post).join(Subreddit).join(User)\
        .filter(Subreddit.name == subreddit).all()
    print(posts)
    if len(posts) == 0:
        return {"errors": "There are no posts in this subreddit"}, 404
    return {"posts": [post.to_joined_dict() for post in posts]}
