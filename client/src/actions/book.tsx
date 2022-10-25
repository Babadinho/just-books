import axios from 'axios';

export const searchBook = async (
  searchterm: string | (string | null)[] | null,
  orderBy: string | (string | null)[] | null,
  filterBy: string | (string | null)[] | null
) =>
  await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${searchterm}&orderBy=${orderBy}&filterBy=${filterBy}&projection=full&startIndex=0&maxResults=36&key=${process.env.REACT_APP_API_KEY}`
  );

export const getBooks = async () =>
  await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=''&projection=full&startIndex=0&maxResults=36&key=${process.env.REACT_APP_API_KEY}`
  );

export const viewBook = async (bookId: any) =>
  await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.REACT_APP_API_KEY}`
  );
