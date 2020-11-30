from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import ValidationError, DataRequired
from app.models import Comment


class CommentForm(FlaskForm):
    postId = IntegerField("postId", [DataRequired()])
    parentId = IntegerField("parentId", [DataRequired()])
    content = TextAreaField("content", [DataRequired()])
