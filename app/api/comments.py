from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Comment
from app.forms import CommentForm
from sqlalchemy.exc import IntegrityError 

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/post/<int:id>', methods=['GET'])
def get_comments(id):
    comments= Comment.query.filter(Comment.postId==id).all()  
    comment_list = [comment.to_simple_dict() for comment in comments]
    return {'comments': comment_list}

@comment_routes.route('/new', methods=['POST'])
@login_required
def post_comment():
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form:
            try:
                comment = Comment(
                    userId=current_user.id,
                    postId=form.data['postId'],
                    content=form.data['content'],
                    parentId=form.data['parentId']
                )
                db.session.add(comment)
                db.session.commit()
                return comment.to_simple_dict()
            except IntegrityError:
                return {"error": "new error"}
