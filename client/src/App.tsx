import { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { isAuthenticated } from './actions/auth';
import { getBooks } from './actions/book';
import Books from './books/Books';
import MyBooks from './books/MyBooks';
import SearchBooks from './books/SearchBooks';
import ViewBook from './books/ViewBook';
import Footer from './components/Footer';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Register from './components/Register';
import { BookContext, UserContext, ListContext } from './context/Context';

const App = () => {
  const location = useLocation();
  const [user, setUser] = useState<any | null>(null);
  const [books, setBooks] = useState<any | null>(null);
  let value: any;
  let book: any;
  value = useMemo(() => ({ user, setUser }), [user, setUser]);
  book = useMemo(() => ({ books, setBooks }), [books, setBooks]);

  const loadBooks = async () => {
    try {
      let res = await getBooks();
      setBooks(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('just-books')) {
      setUser(localStorage.getItem('just-books'));
    }
    loadBooks();
  }, []);

  return (
    <>
      <UserContext.Provider value={value}>
        <BookContext.Provider value={book}>
          {location.pathname !== '/my-books' && <NavBar />}
          <Routes>
            <Route path='/' element={<Books />} />
            <Route path='/search' element={<SearchBooks />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/my-books' element={<MyBooks />} />
            <Route path='/book/:bookId' element={<ViewBook />} />
          </Routes>
          <Footer />
        </BookContext.Provider>
      </UserContext.Provider>
    </>
  );
};

export default App;
