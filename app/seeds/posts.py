from app.models import db, Post


def seed_posts(users, subreddits):
    post_list = [
        Post(
            title='my first post uwu',
            type='text',
            content='ya this is my first post',
            karma='12',
            userId=users.id,
            subredditId=subreddits.id),
        Post(
            title='post two',
            type='text',
            content='ya this is my first post',
            karma='11',
            userId=users.id,
            subredditId=subreddits.id),
        Post(
            title='post three',
            type='text',
            content='creating another post to put in',
            karma='10',
            userId=users.id,
            subredditId=subreddits.id),
    ]
    db.session.add_all(post_list)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts CASCADE;')
    db.session.commit()
