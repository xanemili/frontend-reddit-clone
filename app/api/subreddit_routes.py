
from flask import Blueprint, jsonify, session, request
from app.models import db, Subreddit, Post, User
from app.forms import SubredditForm
from sqlalchemy.exc import IntegrityError
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from datetime import datetime


subreddit_routes = Blueprint('subreddits', __name__)


@subreddit_routes.route('/create', methods=['POST'])
@login_required
def create_subreddit():
    """
    Creates a new subreddit
    """
    form = SubredditForm()
    print(request.get_json())
    form['csrf_token'].data = request.cookies['csrf_token']
    print(current_user.id)
    if form.validate_on_submit():
        try:
            subreddit = Subreddit(
                name=form.data['name'],
                about=form.data['about'],
                rules=form.data['rules'],
                owner=current_user.id
            )
            db.session.add(subreddit)
            db.session.commit()
            return subreddit.to_dict()
        except IntegrityError:
            return {"errors": "Subreddit already exists."}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@subreddit_routes.route('/r/<string:subreddit>', methods=['GET'])
def view_subreddit(subreddit):
    """
    Getting Subreddit Information
    - Posts, Karma, and Owner Info
    """
    subreddit = Subreddit.query.filter(Subreddit.name == subreddit).first()
    if not subreddit:
        return {'errors': 'Subreddit does not exist'}, 404

    post_list = Post.query.filter(Post.subredditId == subreddit.id).all()
    return {
        "subreddit": subreddit.to_dict(),
    }


@subreddit_routes.route('/all', methods=['GET'])
def all_subreddit():
    """
    Gets all subreddits for Select Field on Post creation
    Returns a list of subreddits
    """
    subreddits = Subreddit.query.all()
    subreddit_list = [subreddit.to_dict() for subreddit in subreddits]
    return {"subreddits": subreddit_list}


@subreddit_routes.route('/sidebar/<string:user>', methods=['GET'])
def sidebar_info(user):
    """
    Gets top subreddits for user on sidebar
    """
    top_subreddits = db.session.query(Subreddit, db.func.count(Subreddit.subscribers).label("number_of_subs")).join(Subreddit.subscribers).group_by(Subreddit.id).order_by(db.desc("number_of_subs")).limit(5).all()
    top_list = [subreddit.to_dict() for (subreddit, rank) in top_subreddits]
    return {'top_subreddits': top_list}


@subreddit_routes.route('/', methods=['GET'])
def landing_page():
    """
    Gets top posts based on Karma for subreddits user is subscribed to
    """
    top_posts = Post.query.join(User).join(Subreddit).order_by(db.desc(Post.karma))
    print(top_posts)
    top_post_list = [post.to_joined_dict() for (post) in top_posts]
    return {'posts': top_post_list}
