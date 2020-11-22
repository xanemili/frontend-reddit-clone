from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Subreddit


subreddits = Subreddit.query.all()
subreddit_choices = [(subreddit.id, subreddit.name)
                     for subreddit in subreddits]


class PostForm(FlaskForm):
    subreddit = SelectField("subreddit", choices=subreddit_choices)
    title = StringField("title", [DataRequired()])
    # Discuss how to select the type for the post
    # Initial thoughts are grab the element that is active from the form itself to pass in.
    # For now, pass it as a string field.
    type = StringField("type", [DataRequired()])
    content = TextAreaField("content", [DataRequired()])
