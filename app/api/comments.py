from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Comment

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/post/<int:id>', methods=['GET'])
def get_comments(id):
    comments= Comment.query.filter(Comment.postId==id).all()  
    comment_list = [comment.to_simple_dict() for comment in comments]
    return {'comments': comment_list}

