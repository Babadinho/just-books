import axios from 'axios';

export const getSearches = async () =>
  await axios.get(`${process.env.REACT_APP_URL}/searches`);

export const addSearch = async (details: { userId: string; query: any }) =>
  await axios.post(`${process.env.REACT_APP_URL}/add-search`, details);
