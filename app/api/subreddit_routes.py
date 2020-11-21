from flask import Blueprint, jsonify
from app.models import db, Subreddit
from app.forms import SubredditForm
from sqlalchemy.exc import IntegrityError
from flask_login import current_user, login_required

subreddit_routes = Blueprint('subreddit', __name__)


@subreddit_routes.route('/create', methods=['POST'])
def create_subreddit():
    """
    Creates a new subreddit
    """
    form = SubredditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            subreddit = Subreddit(
                name=form.data['name'],
                about=form.data['about'],
                rules=form.data['rules']
            )
            db.session.add(subreddit)
            db.commit()
            return subreddit.to_dict()
        except IntegrityError:
            return {error}


@subreddit_routes.route('/<string:subreddit>', methods=['GET'])
def view_subreddit(subreddit):
    pass
