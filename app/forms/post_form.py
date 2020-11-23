from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Subreddit


class PostForm(FlaskForm):
    subredditId = IntegerField("subredditId", [DataRequired()])
    title = StringField("title", [DataRequired()])
    type = StringField("type", [DataRequired()])
    content = TextAreaField("content", [DataRequired()])
