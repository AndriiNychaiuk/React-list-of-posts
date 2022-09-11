import classNames from 'classnames';
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
  const normilizeText = (text: string): string => {
    return text[0].toUpperCase() + text.slice(1);
  }

  const previewTitle = post.title.length > 30 
    ? normilizeText(post.title).slice(0, 30) + '...'
    : normilizeText(post.title);

  return (
    <li key={post.id} className="post">
      <button 
        type="button" 
        className="post__button"
        onClick={() => onHandlePostIdSelect(post.id)}
      >
        <h3 className={classNames('post__title', {
          'post__title--active': postId === post.id,
        })}>
          {postId !== post.id 
            ? previewTitle
            : normilizeText(post.title)}
        </h3>
      </button>

      {postId === post.id && <p className="post__body">{normilizeText(post.body)}</p>}
    </li>
  );
});
