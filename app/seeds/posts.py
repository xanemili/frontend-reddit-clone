from app.models import db, Post


def seed_posts(user_list, subreddit_list):
    post_list = [
        Post(
            title='People named Drew, what did you draw?',
            type='text',
            content='Tons of people are named Drew, but I have never seen any of there artwork...',
            karma='12',
            userId=user_list[0].id,
            subredditId=subreddit_list[0].id),
        Post(
            title='Colonel is the weirdest word in English',
            type='text',
            content='Totally random thought but isn’t it just weird? It’s pronounced the same as “kernel” but there’s no r! Where is the r??',
            karma='11',
            userId=user_list[1].id,
            subredditId=subreddit_list[1].id),
        Post(
            title="Okay guys, Don't feed your dog before you, especially if you have a large dog.",
            type='text',
            content="The reason being is that in a pack, the Alpha always eats first. So if you're feeding your dog before you eat, that sends a pretty strong signal of who's in charge.",
            karma='10',
            userId=user_list[2].id,
            subredditId=subreddit_list[2].id),
        Post(
            title='Wall decor ideas',
            type='text',
            content="""TLDR: I just need ideas for wall decorations
                       Hey guys, so I just moved into this apartment about a week ago and with Black Friday coming up I thought I would spend some money in decorating my boring walls.
                       My walls are white and soon to be painted gray, my length of my walls is 28ft/168in and the width of my room is 19ft/117in.
                       I was going to buy 3 wall scrolls and LED lights for my roof but I feel like there’s more I could do.
                       An idea I had was to space out the wall scrolls and add a wall shelf in the middle of them and put a couple of books on them and put a figure of the character in the book next to them but I’ve had second thoughts about it because I don’t think it’ll look that good. Ive also thought about putting the wall scrolls on one wall and putting a flag or a banner over the head of my bed (the bed is in the center of the 19ft/117in wall to give you a better idea of how it looks like).
                       Sorry this is so long and a little confusing but I just need some wall decor ideas in general. Any suggestions are appreciated :)""",
            karma='12',
            userId=user_list[3].id,
            subredditId=subreddit_list[3].id),
        Post(
            title='Forehead Kisses',
            type='text',
            content="""Whenever I see my cat, I kiss his forehead. One day, I was upset at my desk and crying. My cat jumps onto my desk, and slams his nose into my head. By far the Cutest thing ever and immediately changed my mood.""",
            karma='12',
            userId=user_list[4].id,
            subredditId=subreddit_list[4].id),
        Post(
            title='A dream',
            type='text',
            content="""Once I had a dream where I realized that I was a stranger in my own body. To remedy this, I tried to tear out all my hair, teeth, and eyes and clawed away at my skin, muscles, bones, nerve fibers, and blood vessels until I was finally alone again and my mutilated remains were later found on the bathroom floor. Thank god it was only a dream, this time I’ll do the job right.""",
            karma='12',
            userId=user_list[5].id,
            subredditId=subreddit_list[5].id),
        Post(
            title='The swordfish has no natural predators to fear from...',
            type='text',
            content='....except the penfish, which is supposed to be even mightier.',
            karma='12',
            userId=user_list[6].id,
            subredditId=subreddit_list[6].id),
        Post(
            title='Where do developers waste the most amount of time?',
            type='text',
            content='like styling the app, finding what the app should do...',
            karma='12',
            userId=user_list[7].id,
            subredditId=subreddit_list[7].id),
        Post(
            title='Series of Unfortunate Events - Olaf breaking lights',
            type='text',
            content="""So, could someone make a gif of the scene from the Hostile Hospital part 1 where Olaf is walking down the hall breaking the ceiling lights with some #memetext that says Splinter Cell? Please and thank 😂""",
            karma='12',
            userId=user_list[8].id,
            subredditId=subreddit_list[8].id),
        Post(
            title='covid hangouts bruh',
            type='text',
            content='me n my girl both got covid and we both r sick. do yall think it would be dumb to hangout cuz we already have it anyways.',
            karma='12',
            userId=user_list[9].id,
            subredditId=subreddit_list[9].id),
        Post(
            title='Visiting Florida for our theme parks?',
            type='text',
            content='Always ask for a CUP of water! The markups on bottled water is insane, but cups of water are free. Its legally required because of our insane heat. :)',
            karma='12',
            userId=user_list[10].id,
            subredditId=subreddit_list[10].id),
        Post(
            title='Gaming chair recommendations?',
            type='text',
            content='Hi! I want to buy my bf a new gaming chair for Christmas but I don’t really know where to start. Any recommendations would be great! (Budget is $250)',
            karma='12',
            userId=user_list[11].id,
            subredditId=subreddit_list[11].id),
        Post(
            title='YouTube Suspends OANN for a Week After It Posted Fake Covid-19 Cure',
            type='text',
            content="'After careful review, we removed a video from OANN and issued a strike on the channel for violating our COVID-19 misinformation policy, which prohibits content claiming there's a guaranteed cure,' a YouTube spokesperson told CNBC. 'Additionally, due to repeated violations of our Covid-19 misinformation policy and other channel monetization policies, we've suspended the channel from the YouTube Partner Program and as a result, its monetization on YouTube.'",
            karma='12',
            userId=user_list[12].id,
            subredditId=subreddit_list[12].id),
        Post(
            title='Would it be possible to build a bot to get rich off the stock market?',
            type='text',
            content="""I don't know how to code sadly, but I was thinking couldn't you create a bot that would be given a specific amount of money lets say $1,000 and then be programed to put the money into penny stocks the instance they dip, and then sell when they go up by at least 100% (since its a penny stock it would be like a overall rise of $1 or less) and then just have it keep doing that until you reach a specified goal.""",
            karma='12',
            userId=user_list[13].id,
            subredditId=subreddit_list[13].id),
        Post(
            title='Collection',
            type='text',
            content='I have this old Qatar and Egypt stamps which are around 60s-70s. Well I don’t know if they are collectors who are interested in them and if they do how much does it cost?',
            karma='12',
            userId=user_list[14].id,
            subredditId=subreddit_list[14].id),
    ]
    db.session.add_all(post_list)
    db.session.commit()
    return post_list 


def undo_posts():
    db.session.execute('TRUNCATE posts CASCADE;')
    db.session.commit()
