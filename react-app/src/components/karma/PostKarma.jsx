import React, {useState,useEffect} from 'react';
import {useSelector} from 'react-redux'
import {getUpvote, getDownvote, addDownvote, addUpvote, removeDownvote, removeUpvote} from '../../services/karma'

const PostKarma = ({id}) => {
  const [karma, setKarma] = useState(0)
  const [userUpvote, setUserUpvote] = useState(false)
  const [userDownvote, setUserDownvote] = useState(false)
  const user = useSelector(state => state.users.user)

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/posts/${id}/karma`)
      const karma = await response.json()
      if (karma) {
        setKarma(karma.karma)
      }
    })();
  }, [id, setKarma, userUpvote, userDownvote])

  useEffect(() => {
    (async () => {
      const upvoteResponse = await getUpvote(user.id, id)
      setUserUpvote(upvoteResponse.likes)
      if(upvoteResponse.likes === true) {
      }
      const downvoteResponse = await getDownvote(user.id, id)
      setUserDownvote(downvoteResponse.likes)
      if(downvoteResponse.likes === true){
      }
    })()
  }, [])


  useEffect(() => {
    if(userUpvote === true){
      setUserDownvote(false)
    }

  },[userUpvote])

  useEffect(() => {
    if(userDownvote === true){
      setUserUpvote(false)
    }

  },[userDownvote])


  const upvoteKarma = async () => {
    const response = await addUpvote(user.id, id)
    if(response.success === true){
      await setUserUpvote(true)
    }
  }

  const downvoteKarma = async () => {
    const response = await addDownvote(user.id, id)
    if(response.success === true) {
      await setUserDownvote(true)
    }
  }

  const unUpvoteKarma = async () => {
    const response = await removeUpvote(user.id, id)
    if(response.success === true){
      await setUserUpvote(false)
    }
  }

  const unDownvoteKarma = async () => {
    const response = await removeDownvote(user.id, id)
    if(response.success === true){
      await setUserDownvote(false)
    }
  }




    return(
      <div className={`karma__box`}>
        {userUpvote && userDownvote === false ?
        <button onClick={unUpvoteKarma} className={`arrow ${userUpvote ? 'upvoted' : 'up' }`} /> :
        <button onClick={upvoteKarma} className={`arrow ${userUpvote ? 'upvoted' : 'up' }`} />}
        <div className='score votecount'>
          {karma}
        </div>
        {userDownvote && userUpvote === false ?
          <button onClick={unDownvoteKarma} className={`arrow ${userDownvote ? 'downvoted' : 'down'}`}/> :
          <button onClick={downvoteKarma} className={`arrow ${userDownvote ? 'downvoted' : 'down'}`}/>
          }

      </div>
      )
}

export default PostKarma
