import axios from 'axios';

export const searchBook = async (
  searchterm: string | (string | null)[] | null,
  orderBy: string | (string | null)[] | null,
  filterBy: any,
  startIndex: any
) =>
  await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${searchterm}&orderBy=${orderBy}&filterBy=${filterBy}&projection=full&startIndex=${startIndex}&maxResults=21&key=${process.env.REACT_APP_API_KEY}`
  );

export const getBooks = async () =>
  await axios.get(`${process.env.REACT_APP_URL}/books`);

// export const getBooks = async () =>
//   await axios.get(
//     `https://www.googleapis.com/books/v1/volumes?q=''&projection=full&startIndex=0&maxResults=33&key=${process.env.REACT_APP_API_KEY}`
//   );

export const getUserBooks = async (userId: any, token: any) =>
  await axios.get(`${process.env.REACT_APP_URL}/books/${userId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const getActiveListBooks = async (
  userId: any,
  listId: any,
  token: any
) =>
  await axios.post(
    `${process.env.REACT_APP_URL}/active-list-books/${userId}`,
    listId,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const viewBook = async (bookId: any) =>
  await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.REACT_APP_API_KEY}`
  );

export const addBook = async (userId: any, book: any, token: any) =>
  await axios.post(`${process.env.REACT_APP_URL}/add-book/${userId}`, book, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const removeBook = async (userId: any, bookId: any, token: any) =>
  await axios.post(
    `${process.env.REACT_APP_URL}/remove-book/${userId}`,
    bookId,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
