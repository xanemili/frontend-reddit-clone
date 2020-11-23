from flask import Blueprint, jsonify, session, request
from app.models import db, Subreddit, Post
from app.forms import SubredditForm
from sqlalchemy.exc import IntegrityError
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages

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
        return {'subreddit': 'Subreddit does not exist'}, 404

    post_list = Post.query.filter(Post.subredditId == subreddit.id).all()
    test_post = post_list[0].to_dict()
    print(test_post)
    return {
        "subreddit": subreddit.to_dict(),
        "posts": test_post
    }
