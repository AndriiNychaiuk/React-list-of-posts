import React from 'react';
import './Header.scss'

interface Props {
  query: string,
  areUsersSorted: boolean,
  onSetQueries: ({ target }: React.ChangeEvent<HTMLInputElement>) => void,
  onSortUsers: React.Dispatch<React.SetStateAction<boolean>>,
}

export const Header = React.memo<Props>(({ 
  query, areUsersSorted, onSetQueries, onSortUsers
}) => (
  <header className="header">
    <button 
      type="button" 
      className="header__button"
      onClick={() => onSortUsers(prev => !prev)}
    >
      {areUsersSorted 
        ? 'Reset cards sorting'
        : 'Sort cards by name'
      }
    </button>

    <input 
      type="text" 
      className="header__input" 
      placeholder="Search"
      value={query}
      onChange={onSetQueries}
    />
  </header>
));
