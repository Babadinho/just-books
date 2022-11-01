import axios from 'axios';

export const getList = async (userId: any, token: any) =>
  await axios.get(`${process.env.REACT_APP_URL}/list/${userId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const addList = async (userId: any, list: any, token: any) =>
  await axios.post(`${process.env.REACT_APP_URL}/add-list/${userId}`, list, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const editList = async (userId: any, listDetails: any, token: any) =>
  await axios.post(
    `${process.env.REACT_APP_URL}/edit-list/${userId}`,
    listDetails,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const deleteList = async (userId: any, listId: any, token: any) =>
  await axios.post(
    `${process.env.REACT_APP_URL}/delete-list/${userId}`,
    listId,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
