import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getBooks } from './actions/book';
import Books from './books/Books';
import ViewBook from './books/ViewBook';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Register from './components/Register';
import { BookContext, UserContext } from './context/Context';

const App = () => {
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
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <BookContext.Provider value={book}>
          <NavBar />
          <Routes>
            <Route path='/' element={<Books />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/book/:bookId' element={<ViewBook />} />
          </Routes>
        </BookContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
