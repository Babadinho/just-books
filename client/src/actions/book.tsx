import axios from 'axios';

export const getBooks = async () =>
  await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=''&projection=lite&startIndex=0&maxResults=39&key=${process.env.REACT_APP_API_KEY}`
  );

export const viewBook = async (bookId: string) =>
  await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
