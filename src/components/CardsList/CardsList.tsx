import classNames from 'classnames';
import React from 'react';
import { User } from '../../types/User';
import { UserDetails } from '../CardDetails/CardsDetails';
import './CardsList.scss';

interface Props {
  users: User[],
  page: number,
  cardsQuantity: 2 | 4,
  userId: number,
  onSetUserId: React.Dispatch<React.SetStateAction<number>>,
}

export const CardsList = React.memo<Props>(({ 
  users, page, cardsQuantity, userId, onSetUserId 
}) => {
  return (
    <div className={classNames('cards', {
      'cards--selected': userId,
    })}
    >
      <ul 
        className={classNames('cards__list', {
          'cards__list--narrow': cardsQuantity === 2,
        })}
      >
        {users.map((user, index) => {
          if (Math.ceil((index + 1) / cardsQuantity) !== page) {
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