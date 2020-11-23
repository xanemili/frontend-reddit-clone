from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Subreddit


class PostForm(FlaskForm):
    # subreddit will take an int passed in from the request object
    subredditId = IntegerField("subreddit", [DataRequired()])
    title = StringField("title", [DataRequired()])
    # Discuss how to select the type for the post // Focus on only text posts for the time being
    # Initial thoughts are grab the element that is active from the form itself to pass in.
    # For now, pass it as a string field.
    type = StringField("type", [DataRequired()])
    content = TextAreaField("content", [DataRequired()])
