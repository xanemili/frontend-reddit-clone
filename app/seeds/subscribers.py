from app.models import db, Subscription


def seed_subscriptions(user_list, subreddit_list):
    subscription_list = [
        Subscription(
            user_id=user_list[0].id,
            subreddit_id=subreddit_list[0].id,
        ),
        Subscription(
            user_id=user_list[0].id,
            subreddit_id=subreddit_list[3].id,
        ),
        Subscription(
            user_id=user_list[0].id,
            subreddit_id=subreddit_list[6].id,
        ),
        Subscription(
            user_id=user_list[0].id,
            subreddit_id=subreddit_list[2].id,
        ),
        Subscription(
            user_id=user_list[0].id,
            subreddit_id=subreddit_list[5].id,
        ),
        Subscription(
            user_id=user_list[1].id,
            subreddit_id=subreddit_list[3].id,
        ),
        Subscription(
            user_id=user_list[1].id,
            subreddit_id=subreddit_list[6].id,
        ),
        Subscription(
            user_id=user_list[2].id,
            subreddit_id=subreddit_list[5].id,
        ),
        Subscription(
            user_id=user_list[3].id,
            subreddit_id=subreddit_list[6].id,
        ),
         Subscription(
            user_id=user_list[5].id,
            subreddit_id=subreddit_list[6].id,
        ),
    ]

    db.session.add_all(subscription_list)
    db.session.commit()
    return subscription_list

def undo_subscriptions():
    db.session.execute('TRUNCATE subreddit_subscriptions CASCADE;')
    db.session.commit()