import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Books from './books/Books';
import ViewBook from './books/ViewBook';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Register from './components/Register';
import { UserContext } from './UserContext';

const App = () => {
  const [user, setUser] = useState<any | null>(null);
  let value: any;
  value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    if (localStorage.getItem('just-books')) {
      setUser(localStorage.getItem('just-books'));
    }
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <NavBar />
        <Routes>
          <Route path='/' element={<Books />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/book/:bookId' element={<ViewBook />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
