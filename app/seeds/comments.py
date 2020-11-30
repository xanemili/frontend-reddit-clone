from app.models import db, Comment


def seed_comments(user_list, post_list):
    comment_one = Comment(
            id= 4,
            postId= post_list[0].id,
            userId= user_list[0].id,
            content='This is a comment.',
            created_on= '2020-11-23 12:59:55',
            updated_on= '2020-11-23 12:59:55')

    comment_two = Comment(
            id=5,
            postId=post_list[0].id,
            userId=user_list[1].id,
            content='This is a comment to a comment.',
            parentId=4,
            created_on= '2020-11-23 12:59:55',
            updated_on= '2020-11-23 12:59:55')

    comment_three = Comment(
            id=6,
            postId=post_list[0].id,
            userId=user_list[2].id,
            content='This is a comment to a comment of a comment.',
            parentId=5,
            created_on= '2020-11-23 12:59:55',
            updated_on= '2020-11-23 12:59:55')
    comment_list = [comment_one, comment_two, comment_three]
    db.session.add_all(comment_list)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE posts CASCADE;')
    db.session.commit()
