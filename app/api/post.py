from flask import Blueprint, jsonify, request
<<<<<<< HEAD
from app.models import db, Post, Subreddit, User
=======
from app.models import db, Post, Subreddit
>>>>>>> d29d697eeca8e9f230b49592fc43addeb29dd0c1
from app.forms import PostForm
from sqlalchemy.exc import IntegrityError
from flask_login import current_user, login_required

post_routes = Blueprint('posts', __name__)


<<<<<<< HEAD
@post_routes.route("/create", methods=['POST'])
# @login_required
=======
@post_routes.route("/create", methods=["POSTS"])
@login_required
>>>>>>> d29d697eeca8e9f230b49592fc43addeb29dd0c1
def create_post():
    """
    Creates a new post
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form:
        try:
            post = Post(
<<<<<<< HEAD
                userId=current_user.id,
                subredditId=form.data['subredditId'],
                title=form.data['title'],
                type=form.data['type'],
                content=form.data['content'],
=======
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
>>>>>>> d29d697eeca8e9f230b49592fc43addeb29dd0c1
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
<<<<<<< HEAD
    return post.to_joined_dict()
=======
    return post
>>>>>>> d29d697eeca8e9f230b49592fc43addeb29dd0c1


@post_routes.route("/r/<string:subreddit>", methods=["GET"])
def subreddit_posts(subreddit):
    """
<<<<<<< HEAD
    Returns every post that belongs to a subreddit
    """
    print(subreddit)
    posts = db.session.query(Post).join(Subreddit).join(User)\
=======
    """
    print(subreddit)
    posts = db.session.query(Post).join(Subreddit)\
>>>>>>> d29d697eeca8e9f230b49592fc43addeb29dd0c1
        .filter(Subreddit.name == subreddit).all()
    print(posts)
    if len(posts) == 0:
        return {"errors": "There are no posts in this subreddit"}, 404
<<<<<<< HEAD
    return {"posts": [post.to_joined_dict() for post in posts]}


@post_routes.route("/<int:postId>/karma", methods=['GET','POST'])
# @login_required
def subreddit_upvote(postId):
    """
    Upvoting a comment.
    """
    if request.method == 'GET':
        post = Post.query.get(postId)
        return {'karma': post.karma}

    req = request.get_json()
    if req['karma'] and request.method == 'POST':
        post = Post.query.get(postId)
        if not post:
            return 'Post does not exist'
        if req['karma'] == 'upvote':
            print('upvote')
            post.karma += 1
        elif req['karma'] == 'downvote':
            post.karma -= 1
        db.session.commit()
        return {'karma': post.karma}
    return {'error': 'Post could not be upvoted'}


# @post_routes.route("/<int:postId>")
=======
    return {"posts": [post.to_dict() for post in posts]}
>>>>>>> d29d697eeca8e9f230b49592fc43addeb29dd0c1
