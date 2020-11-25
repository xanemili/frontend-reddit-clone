from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Subreddit, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# @user_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_user(id):
#     user = User.query.get_or_404(id)
#     if user.deleted:
#         abort(404)
#     user.deleted = True
#     db.session.commit()
#     return '', 204


@user_routes.route('/subscriptions', methods=['GET'])
# @login_required
def subscriptions():
    subscriptions = User.query.get(1).subscriptions
    return {"subscriptions": subscriptions}


@user_routes.route('/subscriptions', methods=['POST', 'DELETE'])
# @login_required
def toggle_subscriptions():
    user = User.query.get(1)
    subreddit = Subreddit.query.get(1)

    if request.method == 'DELETE':
        print(dir(user.subscriptions))
        user.subscriptions.remove(subreddit)
    user.subscriptions.append(subreddit)
    print(user.subscriptions)
    db.session.add(user)
    db.session.commit()

    return {"subscribe": "subscribed!"}
