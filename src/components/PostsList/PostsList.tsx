import classNames from 'classnames';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Post } from '../../types/Post';
import { User } from '../../types/User';
import { Loader } from '../Loader/Loader';
import { PostDetails } from '../PostDetails/PostDetails';
import './PostsList.scss'

interface Props {
  userPosts: Post[],
  userId: number,
  users: User[],
  onResetUserId: React.Dispatch<React.SetStateAction<number>>,
}

export const PostsList = React.memo<Props>(({ 
  userPosts, userId, users, onResetUserId,
}) => {
  const navigation = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const postId = +search.replace(/[^0-9.]/g, '');
  const curentUser = users.find(user => user.id === userId) || null;

  const handlePostIdSelect = (currentPostId: number) => {
    if (postId === currentPostId) {
      searchParams.delete('id');
    } else {
      searchParams.set('id', `${currentPostId}`);
    };

    navigation(`?${searchParams}`, { replace: true });
  };

  return (
    <div className={
      classNames('user-posts', {
        'user-posts--selected': userId,
      })}
    >
      {!!userId && (
        <h2 className="user-posts__heading">{curentUser?.name}
          <Link to={'/'}>
            <button 
              type="button" 
              className="user-posts__close"
              onClick={() => onResetUserId(0)}
            >
              X
            </button>
        </Link>
        </h2>
      )}

      {!userPosts.length && <Loader />}

      <ul className="user-posts__list">
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
