import axios from 'axios';

export const register = async (user: any) =>
  await axios.post(`${process.env.REACT_APP_URL}/register`, user);

export const login = async (user: any) =>
  await axios.post(`${process.env.REACT_APP_URL}/login`, user);

// Save user to localStorage
export const authenticate = (data: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('just-books', JSON.stringify(data));
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('just-books')) {
    return JSON.parse(localStorage.getItem('just-books')!);
  } else {
    return false;
  }
};
