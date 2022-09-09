import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../../types/User';
import './CardsDetails.scss';

interface Props {
  user: User,
  userId: number,
  onSetUserId:  React.Dispatch<React.SetStateAction<number>>,
}

export const UserDetails = React.memo<Props>(({
  user, userId, onSetUserId 
}) => {
  const handleUserIdSetting = () => {
    userId === user.id 
      ? onSetUserId(0)
      : onSetUserId(user.id);
  };
  
  return (
    <li className="card" >
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.phone}</div>

      <Link to={userId !== user.id ? `user/${user.id}/posts/` : '/'}>
        <button 
          type="button" 
          className="card__button"
          onClick={handleUserIdSetting}
        >
          {userId === user.id ? 'Hide' : 'Show'}
          {' '}
          user posts
        </button>
      </Link>
    </li>
  )
})