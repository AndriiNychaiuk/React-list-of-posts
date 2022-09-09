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
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState(0);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [areUsersSorted, sortUsers] = useState(false);

  const applyQuery = useCallback(
    debounce(setAppliedQuery, 1000),
    [],
  );

  const { pathname } = useLocation();
  
  const setAllQueries = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const allowedSymbols = target.value.replace(/[^A-z ]/, '');

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

  const visibleUsers = useMemo(() => {
    return [...users]
      .sort(sortCallback)
      .filter(filterCallback)
  }, [appliedQuery, users, areUsersSorted])

  const firstPage = useMemo(() => {
    return page === 1;
  }, [page]);

  const lastPage = useMemo(() => {
    return page === Math.ceil(visibleUsers.length / 4) || !visibleUsers.length;
  }, [page, visibleUsers]);
  
  useEffect(() => {
    getUsers()
      .then(setUsers);
    
    setUserId(+pathname.replace(/[^0-9.]/g, ''));
  }, []);

  useEffect(() => {
    if (userId) {
      getUserPosts(userId)
        .then(setUserPosts)
    }
  }, [userId]);
  
  useEffect(() => {
    if (Math.ceil(visibleUsers.length / 4) < page) {
      setPage(1);
    }
  }, [appliedQuery]);
  
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
          <CardsList 
            users={visibleUsers} 
            page={page}
            userId={userId}
            onSetUserId={setUserId}
          />

          <PostsList userPosts={userPosts} userId={userId} />
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
