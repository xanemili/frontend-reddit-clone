import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Subreddit = () => {

    const [subreddit, setSubreddit] = useState({})
    const { subredditId } = useParams();

    useEffect(()=> {
        (async () => {
            const response = await fetch('/api/subreddits/r/xander')
            const subreddit = await response.json();
            console.log(subreddit)
            setSubreddit(subreddit);
        })();
    }, [subredditId])

    return (
        <div>
            {subreddit.name}
        </div>
    )
}

export default Subreddit;
