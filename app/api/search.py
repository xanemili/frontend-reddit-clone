from flask import Blueprint, jsonify, request
from app.models import db, Post, Subreddit, User
from sqlalchemy.exc import IntegrityError

search_route = Blueprint('search', __name__)

@search_route.route('/<string:res>', methods=["GET"])
def search_res(res):
    users = User.query.filter(User.username.ilike(f'{res}%')).limit(5)
    if not users:
        return {'User does not exist, please try again...'}
    subreddits = Subreddit.query.filter(Subreddit.name.ilike(f'{res}%')).limit(5)
    if not users:
        return {'Subreddit does not exist, please try again...'}
    return {
        "users": [user.to_dict() for user in users],
        "subreddits": [subreddit.to_dict() for subreddit in subreddits]
    }
    