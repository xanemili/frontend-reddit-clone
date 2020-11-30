import React, {
  useState,
  useEffect
} from 'react';

const PostKarma = ({id}) => {
  const [karma, setKarma] = useState(0)

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/posts/${id}/karma`)
      const karma = await response.json()
      if (karma) {
        setKarma(karma.karma)
      }
    })();
  }, [id, setKarma])

  const sendKarma = (vote) => async (e) => {
    const response = await fetch(`/api/posts/${id}/karma`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        karma: vote
      })
    })
    let test = await response.json()
    setKarma(test.karma)
    return
  }

  return(
    <div className='karma__box'>
      <button onClick={sendKarma('upvote')} className='arrow up' />
      <div className='score votecount'>
        {karma}
      </div>
      <button onClick={sendKarma('downvote')} className='arrow down'/>
    </div>
    )
}

export default PostKarma
