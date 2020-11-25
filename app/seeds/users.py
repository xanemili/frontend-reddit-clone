from werkzeug.security import generate_password_hash
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    user_list = [
        User(username='Demo', email='demo@aa.io',
            password='password'),
        User(username='LFinley', email='LFinley@aa.io',
            password='password'),
        User(username='AMccarty', email='AMccarty@aa.io',
            password='password'),
        User(username='SLove', email='SLove@aa.io',
            password='password'),
        User(username='KRegan', email='KRegan@aa.io',
            password='password'),
        User(username='KPage', email='KPage@aa.io',
            password='password'),
        User(username='JLarson', email='JLarson@aa.io',
            password='password'),
        User(username='WBender', email='WBender@aa.io',
            password='password'),
        User(username='BGoldsmith', email='BGoldsmith@aa.io',
            password='password'),
        User(username='OGibbs', email='OGibbs@aa.io',
            password='password'),
        User(username='FPineda', email='FPineda@aa.io',
            password='password'),
        User(username='GHester', email='GHester@aa.io',
            password='password'),
        User(username='KCottrell', email='KCottrell@aa.io',
            password='password'),
        User(username='JGordon', email='JGordon@aa.io',
            password='password'),
        User(username='AWare', email='AWare@aa.io',
            password='password'),

    ]

    db.session.add_all(user_list)

    db.session.commit()
    return user_list


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
