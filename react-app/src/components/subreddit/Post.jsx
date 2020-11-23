import React, {useState, useEffect} from 'react';

const Post = ({id, title, type, content,  }) => {

  const [karma, setKarma] = useState(0)

  useEffect(()=> {
    (async() => {
      const response = await fetch (`/api/posts/${id}/karma`)
      const karma = await response.json()
      if (karma){
        setKarma(karma.karma)
      }
      console.log(karma)
    })();
  }, [id])

  const sendKarma = () => {
    return;
  }

  return (
    <>
    {console.log(karma)}
    <button onClick={sendKarma}>
      Upvote
    </button>
    <button onClick={sendKarma}>
        Downvote
    </button>
      <div>
        title: {title}
      </div>
      <div>
        type: {type}
      </div>
      <div>
        content: {content}
      </div>
      <div>
        {karma}
      </div>
    </>
  )
}

export default Post;
