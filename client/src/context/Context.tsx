import { createContext } from 'react';

interface userInterface {
  user: any;
  setUser: any;
}

export const UserContext = createContext<Partial<userInterface>>({});

interface bookInterface {
  books: any;
  setBooks: any;
}

export const BookContext = createContext<Partial<bookInterface>>({});
