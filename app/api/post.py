from flask import Blueprint, jsonify, request
from app.models import db, Post, Subreddit
from app.forms import PostForm
from sqlalchemy.exc import IntegrityError
from flask_login import current_user, login_required

post_routes = Blueprint('post', __name__)


@post_routes.route("/create", methods=["POSTS"])
@login_required
def create_post():
    """
    Creates a new post
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            post = Post(
                # Discuss how to get the userId for who is posting
                # Initial thoughts are pass it with the request object.
                # For now fill with a default userId = 1
                userId=form.data['userId'],
                subredditId=form.data['subreddit'],
                title=form.data['title'],
                # Type has not been fully flushed out
                # Currently Type is set as a stringfield
                # Check app.forms.post_form.py for more details
                type=form.data['type'],
                content=form.data['content'],
                karma=0
            )
            db.session.add(post)
            db.session.commit()
            return post.to_dict()
        except IntegrityError:
            return {"error": "new error"}


@post_routes.route("/<int:postId>", methods=["GET"])
def display_post(postId):
    """
    Display information for a specific post with the id = postId
    """
    post = Post.query.filter(Post.id == postId).one()
    if not post:
        return 'Post does not exist'
    return post


@post_routes.route("/r/<string:subreddit>", methods=["GET"])
def subreddit_posts(subreddit):
    """
    """
    print(subreddit)
    posts = db.session.query(Post).join(Subreddit)\
        .filter(Subreddit.name == subreddit).all()
    print(posts)
    if len(posts) == 0:
        return {"errors": "There are no posts in this subreddit"}, 404
    return {"posts": [post.to_dict() for post in posts]}
