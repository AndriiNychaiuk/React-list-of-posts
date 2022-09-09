import React from 'react';
import { Post } from '../../types/Post';
import './PostDetails.scss';

interface Props {
  post: Post,
  postId: number,
  onHandlePostIdSelect: (currentPostId: number) => void,
}

export const PostDetails = React.memo<Props>(({ 
  post, postId, onHandlePostIdSelect 
}) => {
  const setTitle = (title: string): string => {
    return title[0].toUpperCase() + title.slice(1);
  }

  const previewTitle = post.title.length > 30 
    ? setTitle(post.title).slice(0, 30) + '...'
    : setTitle(post.title);

  return (
    <li key={post.id} className="post">
      <button 
        type="button" 
        className="post__button"
        onClick={() => onHandlePostIdSelect(post.id)}
      >
        {<h3 className="post__title">{postId !== post.id 
          ? previewTitle
          : setTitle(post.title)}</h3>}
      </button>

      {postId === post.id && <p className="post__body">{post.body}</p>}
    </li>
  );
});
