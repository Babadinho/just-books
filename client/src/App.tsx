import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { isAuthenticated } from './actions/auth';
import { getBooks, getMyBooks } from './actions/book';
import { getList } from './actions/list';
import Books from './books/Books';
import MyBooks from './books/MyBooks';
import SearchBooks from './books/SearchBooks';
import ViewBook from './books/ViewBook';
import Footer from './components/Footer';
import Login from './auth/Login';
import NavBar from './components/NavBar';
import Register from './auth/Register';
import PrivateRoute from './auth/PrivateRoute';
import {
  BookContext,
  UserContext,
  ListContext,
  MyBooksContext,
} from './context/Context';
import { message } from 'antd';
import Settings from './components/Settings';

const App = () => {
  const location = useLocation();
  const [user, setUser] = useState<any | null>(null);
  const [books, setBooks] = useState<any | null>(null);
  const [list, setList] = useState<any | null>(null);
  const [myBooks, setMyBooks] = useState<any | null>('');
  let value: any;
  let book: any;
  let myList: any;
  let myBook: any;
  value = useMemo(() => ({ user, setUser }), [user, setUser]);
  book = useMemo(() => ({ books, setBooks }), [books, setBooks]);
  myList = useMemo(() => ({ list, setList }), [list, setList]);
  myBook = useMemo(() => ({ myBooks, setMyBooks }), [myBooks, setMyBooks]);

  const loadBooks = async () => {
    try {
      let res = await getBooks();
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadList = async () => {
    try {
      const res = await getList(
        isAuthenticated().user._id,
        isAuthenticated().token
      );
      setList(res.data);
    } catch (error: any) {
      message.error(error.response.data, 4);
    }
  };

  const loadMyBooks = async () => {
    try {
      const res = await getMyBooks(
        isAuthenticated().user._id,
        isAuthenticated().token
      );
      setMyBooks(res.data);
    } catch (error: any) {
      if (error.response.status === 400) message.error(error.response.data, 4);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('just-books')) {
      setUser(localStorage.getItem('just-books'));
    }
    loadBooks();
    loadList();
    loadMyBooks();
  }, [user, setMyBooks]);

  return (
    <>
      <UserContext.Provider value={value}>
        <BookContext.Provider value={book}>
          <ListContext.Provider value={myList}>
            <MyBooksContext.Provider value={myBook}>
              {location.pathname !== '/my-books' && <NavBar />}
              <Routes>
                <Route path='/' element={<Books />} />
                <Route path='/search' element={<SearchBooks />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route
                  path='/my-books'
                  element={
                    <PrivateRoute>
                      <MyBooks />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/settings'
                  element={
                    <PrivateRoute>
                      <Settings />
                    </PrivateRoute>
                  }
                />
                <Route path='/book/:bookId' element={<ViewBook />} />
              </Routes>
              <Footer />
            </MyBooksContext.Provider>
          </ListContext.Provider>
        </BookContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
