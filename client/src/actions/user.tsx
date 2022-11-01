import axios from 'axios';

export const editUser = async (userId: any, details: any, token: any) =>
  await axios.post(
    `${process.env.REACT_APP_URL}/edit-user/${userId}`,
    details,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
