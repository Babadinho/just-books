import axios from 'axios';

export const getBooks = async () =>
  await axios.post(
    `https://www.googleapis.com/books/v1/volumes?q=''&maxResults=40&key=${process.env.API_KEY}`
  );
