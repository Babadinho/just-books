import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Book from './books/Book';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Book />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
