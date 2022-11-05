import { useEffect, useState } from 'react';
import { Avatar, Comment, message } from 'antd';
import { Box, Button, Flex, Textarea, Spinner, chakra } from '@chakra-ui/react';
import { addComment, getComments, addCommentReply } from '../actions/comment';
import { isAuthenticated } from '../actions/auth';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { slice } from 'lodash';

const ShowComments = ({
  replyValue,
  setReplyValue,
  comment,
  commentReplies,
  replyingComment,
  setReplyingComment,
  replyLoading,
  handleCommentReply,
}: any) => (
  <Box>
    <Comment
      actions={
        !comment.parentId && [
          <Box
            as='span'
            key='comment-nested-reply-to'
            onClick={() => {
              setReplyingComment(
                replyingComment && replyingComment === comment._id
                  ? ''
                  : comment._id
              );
              setReplyValue('');
            }}
          >
            <i className='fa-solid fa-reply' style={{ color: '#ccc' }}></i>{' '}
            Reply {comment.user && comment.user.username}
          </Box>,
        ]
      }
      author={
        <Link to={`/user/${comment.user && comment.user._id}`}>
          {comment.user && comment.user.username}
        </Link>
      }
      avatar={
        <Link to={`/user/${comment.user && comment.user._id}`}>
          <Avatar shape='square'>
            {comment.user && comment.user.username[0]}
          </Avatar>
        </Link>
      }
      content={<p>{comment && comment.comment}</p>}
      datetime={<Box as='span'>{moment(comment.createdAt).fromNow()}</Box>}
    >
      {replyingComment && replyingComment === comment._id && (
        <Box>
          <Textarea
            value={replyValue}
            onChange={(e) => setReplyValue(e.target.value)}
            placeholder='Enter reply'
            size='sm'
            autoFocus
          />
          <Flex justifyContent='flex-end' mt='1rem'>
            <Button
              rounded='0'
              size='sm'
              fontWeight='500'
              bg={'orange.500'}
              color={'white'}
              _hover={{
                bg: 'orange.600',
              }}
              onClick={handleCommentReply}
            >
              {replyLoading ? <Spinner /> : 'Reply'}
            </Button>
          </Flex>
        </Box>
      )}
      {commentReplies &&
        commentReplies.length > 0 &&
        commentReplies.map((reply: any) => (
          <ShowComments comment={reply} key={reply._id} reply={[]} />
        ))}
    </Comment>
  </Box>
);

const Comments = ({ params }: any) => {
  const { user, token } = isAuthenticated();
  const [value, setValue] = useState<any | null>('');
  const [replyValue, setReplyValue] = useState<any | null>('');
  const [comments, setComments] = useState<any | null>('');
  const [replyingComment, setReplyingComment] = useState<any | null>('');
  const [loading, setLoading] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [loadComplete, setLoadComplete] = useState(false);
  const [index, setIndex] = useState(5);
  let initialComments = slice(comments, 0, index);

  // get comment replies
  const commentReplies = (commentId: any) => {
    return (
      comments &&
      comments.filter((comment: any) => comment.parentId === commentId)
    );
  };

  const loadComments = async () => {
    try {
      const res = await getComments(params && params.bookId);
      if (res.data) {
        setComments(res.data);
      }
    } catch (error: any) {
      if (error.response.status === 400) console.log(error.response.data);
    }
  };

  const loadMoreComments = () => {
    setIndex(index + 5);
    if (index >= comments.length) {
      setLoadComplete(true);
    } else {
      setLoadComplete(false);
    }
  };

  const handleAddComment = async () => {
    const commentDetails = {
      comment: value,
      bookId: params.bookId,
    };
    try {
      const res = await addComment(user._id, { commentDetails }, token);
      if (res.data) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setComments(res.data);
          setValue('');
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) message.error(error.response.data, 4);
      setLoading(false);
    }
  };

  const handleCommentReply = async () => {
    const commentDetails = {
      comment: replyValue,
      bookId: params.bookId,
      commentId: replyingComment,
    };
    try {
      const res = await addCommentReply(user._id, { commentDetails }, token);
      if (res.data) {
        setReplyLoading(true);
        setTimeout(() => {
          setReplyLoading(false);
          setReplyValue('');
          setReplyingComment('');
          setComments(res.data);
          setValue('');
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) message.error(error.response.data, 4);
      setReplyLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setComments]);

  return (
    <Box mt='4rem'>
      {user && token ? (
        <>
          <Textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Enter comment'
            size='sm'
          />
          <Flex mt='1rem' justifyContent='flex-end'>
            <Button
              rounded='0'
              size='sm'
              py='1rem'
              fontWeight='500'
              bg={'orange.500'}
              color={'white'}
              _hover={{
                bg: 'orange.600',
              }}
              onClick={handleAddComment}
            >
              {loading ? <Spinner /> : 'Comment'}
            </Button>
          </Flex>
        </>
      ) : (
        <chakra.p
          fontSize='1.2rem'
          textAlign={'center'}
          mb='1rem'
          color='gray.600'
        >
          Please{' '}
          <Link to='/login'>
            <Box as='span' color='orange.500'>
              login
            </Box>
          </Link>{' '}
          to comment
        </chakra.p>
      )}
      {comments && comments.length > 0 && (
        <chakra.h1 fontSize='1.5rem' mb='1rem'>
          {comments && comments.length}{' '}
          <Box as='span'>{comments.length > 1 ? 'comments' : 'comment'}</Box>
        </chakra.h1>
      )}
      {index &&
        initialComments &&
        initialComments.map((comment: any) => {
          {
            return (
              !comment.parentId && (
                <ShowComments
                  key={comment._id}
                  value={value}
                  setValue={setValue}
                  replyValue={replyValue}
                  setReplyValue={setReplyValue}
                  comment={comment}
                  comments={comments}
                  commentReplies={commentReplies(comment._id)}
                  replyingComment={replyingComment}
                  setReplyingComment={setReplyingComment}
                  loading={loading}
                  replyLoading={replyLoading}
                  handleCommentReply={handleCommentReply}
                  handleAddComment={handleAddComment}
                />
              )
            );
          }
        })}
      {!loadComplete && comments.length > index && (
        <Flex justifyContent='center'>
          <Button
            variant='outline'
            rounded='0'
            size='sm'
            fontWeight='500'
            color='gray.600'
            _hover={{
              borderColor: 'orange.300',
              color: 'orange.400',
            }}
            onClick={loadMoreComments}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Comments;
