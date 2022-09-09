import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Post } from '../../types/Post';
import { PostDetails } from '../PostDetails/PostDetails';
import './PostsList.scss'

interface Props {
  userPosts: Post[],
  userId: number,
}

export const PostsList = React.memo<Props>(({ userPosts, userId }) => {
  const setStyle = useCallback((): React.CSSProperties => {
    return userId
      ? { opacity: '1', transform: 'translateX(-5%)' }
      : { opacity: '0', transform: 'translateX(5%)' }
  }, [userId]);
  
  const navigation = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const postId = +search.replace(/[^0-9.]/g, '');

  const handlePostIdSelect = (currentPostId: number) => {
    if (postId === currentPostId) {
      searchParams.delete('id');
    } else {
      searchParams.set('id', `${currentPostId}`);
    };

    navigation(`?${searchParams}`, { replace: true });
  };

  return (
    <div 
      className="user-posts"
    >
      <ul className="user-posts__list" style={setStyle()}>
        {userPosts.map(post => (
          <PostDetails 
            key={post.id} 
            post={post} 
            postId={postId}
            onHandlePostIdSelect={handlePostIdSelect} 
          />
        ))}
      </ul>
    </div>
  );
});
