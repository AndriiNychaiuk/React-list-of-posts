import classNames from 'classnames';
import React from 'react';
import { User } from '../../types/User';
import { UserDetails } from '../CardDetails/CardsDetails';
import './CardsList.scss';

interface Props {
  users: User[],
  page: number,
  userId: number,
  onSetUserId: React.Dispatch<React.SetStateAction<number>>,
}

export const CardsList = React.memo<Props>(({ 
  users, page, userId, onSetUserId 
}) => {
  const setStyle = () => {
    if (userId) {
      return {transform: 'translateX(-30%) scale(0.8)', zIndex: '1'};
    }
  }

  return (
    <div className="cards"
      style={setStyle()}
    >
      <ul 
        className="cards__list"
      >
        {users.map((user, index) => {
          if (Math.ceil((index + 1) / 4) !== page) {
            return null;
          }

          return (
            <UserDetails 
              key={user.id}
              user={user} 
              userId={userId}
              onSetUserId={onSetUserId}
            />
          )
        })}
      </ul>
    </div>
  )
})