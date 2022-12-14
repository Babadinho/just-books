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

interface listInterface {
  list: any;
  setList: any;
}
export const ListContext = createContext<Partial<listInterface>>({});

interface MyBooksInterface {
  myBooks: any;
  setMyBooks: any;
}
export const MyBooksContext = createContext<Partial<MyBooksInterface>>({});
