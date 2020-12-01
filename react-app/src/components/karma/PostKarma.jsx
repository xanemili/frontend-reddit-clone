import React, {
  useState,
  useEffect
} from 'react';

const PostKarma = ({id}) => {
  const [karma, setKarma] = useState(0)
  const [activeUp, setActiveUp] = useState('')
  const [activeDown, setActiveDown] = useState('')

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
    if (vote === 'upvote') {
      setActiveUpArrow()
    } else {
      setActiveDownArrow()
    }
    return
  }

  const setActiveUpArrow = () => {
    if (activeUp) {
      setActiveUp('')
    } else {
      setActiveUp('upvoted')
    }
  }

  const setActiveDownArrow = () => {
    if (activeDown) {
      setActiveDown('')
    } else {
      setActiveDown('downvoted')
    }
  }


  return(
    <div className={`karma__box`}>
      <button onClick={sendKarma('upvote')} className={`arrow ${activeUp ? activeUp : 'up' }`} />
      <div className='score votecount'>
        {karma}
      </div>
      <button onClick={sendKarma('downvote')} className={`arrow ${activeDown ? activeDown : 'down'}`}/>
    </div>
    )
}

export default PostKarma
