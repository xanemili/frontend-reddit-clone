from flask.cli import AppGroup
from .users import seed_users, undo_users
from .subreddit import seed_subreddits, undo_subreddits
from .posts import seed_posts, undo_posts

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
    seed_posts(users, subreddits)
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    """
    Truncates seeded tables from the database.
    """
    undo_posts()
    undo_subreddits()
    undo_users()
    # Add other undo functions here
