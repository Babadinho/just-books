import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Book from './books/Book';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path='/' element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
