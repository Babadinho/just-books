import axios from 'axios';

// export const getList = async (userId: any, token: any) =>
//   await axios.get(`${process.env.REACT_APP_URL}/list/${userId}`, {
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   });

export const getComments = async (bookId: any) =>
  await axios.get(`${process.env.REACT_APP_URL}/comments/${bookId}`);

export const addComment = async (
  userId: any,
  commentDetails: any,
  token: any
) =>
  await axios.post(
    `${process.env.REACT_APP_URL}/add-comment/${userId}`,
    commentDetails,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const addCommentReply = async (
  userId: any,
  commentDetails: any,
  token: any
) =>
  await axios.post(
    `${process.env.REACT_APP_URL}/add-comment-reply/${userId}`,
    commentDetails,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
