from flask import Blueprint, jsonify, request
from app.models import db, Subreddit
from app.forms import SubredditForm
from sqlalchemy.exc import IntegrityError
from flask_login import current_user, login_required

subreddit_routes = Blueprint('subreddit', __name__)


@subreddit_routes.route('/create', methods=['POST'])
@login_required
def create_subreddit():
    """
    Creates a new subreddit
    """
    print(current_user)
    form = SubredditForm()
    print(request.get_json())
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            subreddit = Subreddit(
                name=form.data['name'],
                about=form.data['about'],
                rules=form.data['rules'],
                owner=1
            )
            db.session.add(subreddit)
            db.session.commit()
            return subreddit.to_dict()
        except IntegrityError:
            return {"error": "new error"}


@subreddit_routes.route('/r/<string:subreddit>', methods=['GET'])
def view_subreddit(subreddit):
    """
    Getting Subreddit Information
    - Posts, Karma,
    """
    subreddit = Subreddit.query.filter(Subreddit.name == subreddit).all()
    if len(subreddit) == 0:
        return 'Subreddit does not exist'
    return subreddit[0].name
