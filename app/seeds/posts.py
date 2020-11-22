from app.models import db, Post


def seed_posts(users, subreddits):
    post = Post(
        title='my first post uwu',
        type='text',
        content='ya this is my first post',
        karma='12',
        userId=users.id,
        subredditId=subreddits.id
    )
    db.session.add(post)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts CASCADE;')
    db.session.commit()
