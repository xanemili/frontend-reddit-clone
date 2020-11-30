from flask.cli import AppGroup
from .users import seed_users, undo_users
from .subreddit import seed_subreddits, undo_subreddits
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .subscribers import seed_subscriptions, undo_subscriptions
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    """
    Seeds data specified within the seeds file.
    """
    users = seed_users()
    subreddits = seed_subreddits(users)
    posts = seed_posts(users, subreddits)
    seed_comments(users, posts)
    subscriptions = seed_subscriptions(users, subreddits)
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    """
    Truncates seeded tables from the database.
    """
    undo_comments()
    undo_posts()
    undo_subreddits()
    undo_users()
    undo_subscriptions()
    # Add other undo functions here
