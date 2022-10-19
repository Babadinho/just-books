import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Book from './books/Book';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Register from './components/Register';

const App = () => {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path='/' element={<Book />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
