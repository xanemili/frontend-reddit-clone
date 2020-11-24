from app.models import db, Subreddit


def seed_subreddits(user_list):
    subreddit_list = [
        Subreddit(
            name='AskReddit',
            about='Ask the community your deepest curiosities',
            rules='No profanity#Open ended questions only#No loaded questions#',
            owner=user_list[0].id
        ),
        Subreddit(
            name='FunTimes',
            about='Fun times for great minds',
            rules='No profanity#Optimism only#Stay happy#Stay friendly#',
            owner=user_list[1].id
        ),
        Subreddit(
            name='DoggoTown',
            about='The best place to show off your best friend',
            rules='No profanity#No cats allowed#Bark Bark#',
            owner=user_list[2].id
        ),
        Subreddit(
            name='DecoratingTips',
            about='Display your chic house decor',
            rules='No profanity#Pictures only#Office space only#Keep comments constructive#',
            owner=user_list[3].id
        ),
        Subreddit(
            name='HoldMyCatnip',
            about='Cats on the herb are totally preferred',
            rules='No profanity#No dogs#Pictures only#',
            owner=user_list[4].id
        ),
        Subreddit(
            name='ScaryStories',
            about='Dive into the depths of the unknown',
            rules='No profanity#No graphic images#',
            owner=user_list[5].id
        ),
        Subreddit(
            name='NatureIsLit',
            about='Prove the beauty of mother nature',
            rules='No profanity#Images only#No Nudity#',
            owner=user_list[6].id
        ),
        Subreddit(
            name='CodingLife',
            about='Everything coding related from fails to first try success',
            rules='No profanity#No Jinja#',
            owner=user_list[7].id
        ),
        Subreddit(
            name='WholesomeMemes',
            about='Kappa',
            rules='#No pepe#wut#',
            owner=user_list[8].id
        ),
        Subreddit(
            name='Covid19',
            about='The one thing keeping you out of bars',
            rules='Face mask required#No coughing#Are you running a fever#',
            owner=user_list[9].id
        ),
        Subreddit(
            name='TravelPack',
            about='Share stories, pictures, and tips of your travels',
            rules='No profanity#Constructive criticism only#Clean images#',
            owner=user_list[10].id
        ),
        Subreddit(
            name='GamersGazebo',
            about='Everything Gaming',
            rules='No profanity#Pc is master race#Minecraft OGs are royalty#',
            owner=user_list[11].id
        ),
        Subreddit(
            name='NewsCorner',
            about='Share news stories and your opinions',
            rules='No profanity#Keep conversations civil and constructive#Creditable sources only#',
            owner=user_list[12].id
        ),
        Subreddit(
            name='TechLab',
            about='Share cool inventions, upcomming tech advancements, and other tech news',
            rules='No profanity#Creditable sources only#',
            owner=user_list[13].id
        ),
        Subreddit(
            name='CollectorsShowcase',
            about='Show off what you are collecting and maybe tell a story as to why',
            rules='No profanity#Keep things clean#',
            owner=user_list[14].id
        ),
    ]

    db.session.add_all(subreddit_list)
    db.session.commit()
    return subreddit_list


def undo_subreddits():
    db.session.execute('TRUNCATE subreddits CASCADE;')
    db.session.commit()
