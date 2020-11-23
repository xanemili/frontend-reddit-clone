from app.models import db, Subreddit


def seed_subreddits(users):
    sample1 = Subreddit(
        name='AskReddit',
        about='no information yet',
        rules='tough to be top dog.',
        owner=users.id
    )

    db.session.add(sample1)
    db.session.commit()
    return sample1


def undo_subreddits():
    db.session.execute('TRUNCATE subreddits CASCADE;')
    db.session.commit()
