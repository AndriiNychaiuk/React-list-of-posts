import { debounce } from 'lodash';
import React, { 
  useCallback, useEffect, useMemo, useState
} from 'react';
import { useLocation } from 'react-router-dom';
import { getUserPosts, getUsers } from './api/api';
import './App.scss';
import { CardsList } from './components/CardsList/CardsList';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { PostsList } from './components/PostsList/PostsList';
import { Post } from './types/Post';
import { User } from './types/User';

const App: React.FC = () => {
  // #region useState

  const [users, setUsers] = useState<User[]>([]);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  
  const [page, setPage] = useState(1);
  const [cardsQuantity, setCardsQuantity] = useState<2 | 4>(4);

  const [areUsersSorted, sortUsers] = useState(false);

  // #endregion
  
  // #region useCallback

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );
  
  const setAllQueries = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const allowedSymbols = target.value.replace(/[^A-z А-іІ]/, '');

    setQuery(allowedSymbols);
    applyQuery(allowedSymbols);
  }, []);

  const sortCallback = useCallback((a: User, b: User) => {
    if (areUsersSorted) {
      return a.name.localeCompare(b.name);
    };

    return 0;
  }, [areUsersSorted]);

  const filterCallback = useCallback((user: User) => {
    return user.name.toLowerCase().includes(appliedQuery.toLowerCase())
  }, [appliedQuery]);
 
  // #endregion
  
  // #region useMemo

  const visibleUsers = useMemo(() => {
    return [...users]
      .sort(sortCallback)
      .filter(filterCallback)
  }, [appliedQuery, users, areUsersSorted])

  const firstPage = useMemo(() => {
    return page === 1;
  }, [page]);

  const lastPage = useMemo(() => {
    return page === Math.ceil(visibleUsers.length / cardsQuantity) 
      || !visibleUsers.length;
  }, [page, visibleUsers]);
  
  // #endregion

  const { innerWidth } = window;
  const { pathname } = useLocation();

  console.log(pathname);
  

  // #region useEffect

  useEffect(() => {
    getUsers()
      .then(setUsers);
    
    setUserId(+pathname.replace(/[^0-9.]/g, ''));
  }, []);
  
  useEffect(() => {
    if (userId) {
      setUserPosts([]);

      getUserPosts(userId)
        .then(setUserPosts)
        .catch(err => console.log(err))
    }

    if (innerWidth <= 769 || (innerWidth <= 1280 && !!userId)) {
      setCardsQuantity(2);
    } else {
      setCardsQuantity(4);
    }
  }, [userId]);
  
  useEffect(() => {
    if (Math.ceil(visibleUsers.length / cardsQuantity) < page) {
      setPage(1);
    }
  }, [appliedQuery]);

  // #endregion 
  
  return (
    <div className="App">
      <div className="App__container">
        <Header 
          query={query} 
          areUsersSorted={areUsersSorted}
          onSetQueries={setAllQueries}
          onSortUsers={sortUsers}
        />

        <main className="App__main">
          {!visibleUsers.length 
            ? <h1 className="App__empty">
                User with this name doesn't exist.
              </h1>
            : (
              <>
                <CardsList 
                  users={visibleUsers} 
                  page={page}
                  cardsQuantity={cardsQuantity}
                  userId={userId}
                  onSetUserId={setUserId}
                />

                <PostsList 
                  userPosts={userPosts} 
                  userId={userId}
                  onResetUserId={setUserId}
                />
              </>
            )
          }
        </main>

        <Footer 
          onSetPage={setPage} 
          firstPage={firstPage}
          lastPage={lastPage}
        />
      </div>
    </div>
  );
}

export default App;
