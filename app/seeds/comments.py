from app.models import db, Comment


def seed_posts(comment_list):
    comment_list = [
        Comment(
            id='People named Drew, what did you draw?',
            postId='text',
            userId='Tons of people are named Drew, but I have never seen any of there artwork...',
            content='12',
            userId=user_list[0].id,
            subredditId=subreddit_list[0].id),
    ]
    db.session.add_all(comment_list)
    db.session.commit()


def undo_posts():
    db.session.execute('TRUNCATE posts CASCADE;')
    db.session.commit()
