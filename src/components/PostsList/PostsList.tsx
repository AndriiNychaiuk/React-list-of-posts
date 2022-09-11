import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Post } from '../../types/Post';
import { Loader } from '../Loader/Loader';
import { PostDetails } from '../PostDetails/PostDetails';
import './PostsList.scss'

interface Props {
  userPosts: Post[],
  userId: number,
  onResetUserId: React.Dispatch<React.SetStateAction<number>>,
}

export const PostsList = React.memo<Props>(({ 
  userPosts, userId, onResetUserId,
}) => {
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
    <div>
      <ul className={
        classNames('user-posts', {
          'user-posts--selected': userId,
        })}
      >
        {!userPosts.length && <Loader />}
        {userPosts.map(post => (
          <PostDetails 
            key={post.id} 
            post={post} 
            postId={postId}
            onHandlePostIdSelect={handlePostIdSelect} 
          />
        ))}
      </ul>

      {!!userId && (
        <Link to={'/'}>
          <button 
            type="button" 
            className="user-posts__close"
            onClick={() => onResetUserId(0)}
          >
            X
          </button>
      </Link>
      )}
    </div>
  );
});
