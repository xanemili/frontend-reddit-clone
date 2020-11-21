from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
from app.models import Subreddit


def subreddit_exists(form, field):
    print("Checking if subreddit exists", field.data)
    name = field.data
    subreddit = Subreddit.query.filter(Subreddit.name == name).first()
    if subreddit:
        raise ValidationError("Subreddit already exists.")


class SubredditForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), subreddit_exists])
    about = TextAreaField('about')
    rules = TextAreaField('rules')