BACKEND
USER
/api/register - post
/api/user/:id - get/put/delete
/api/user/:id/post - get
/api/user/:id/comments - get

/api/user/:id/subreddit/:subredditId - post/delete

SUBREDDIT
/api/subreddit/create - post
/api/subreddit/:subredditId - get/put/delete
/api/subreddits/:subredditId/post/ -get

/api/post/:postId -get/post/put/delete
/api/post/:postId/karma/


FRONT-END
/ - display top posts from subreddits you follow
/login - get/post
/register - get/post

/r/:subreddit - get
/r/:subreddit/posts/:postId - get

/subreddits/create - get/post
/posts/create - get/post

/u/user/:user - get/put/delete
/u/user/:user/posts - get
/u/user/:user/comments - get
