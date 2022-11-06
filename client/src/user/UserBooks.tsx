import { Box, chakra, Text, SimpleGrid, Flex, Button } from '@chakra-ui/react';
import { message } from 'antd';
import { forwardRef, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAuthenticated } from '../actions/auth';
import { getUserBooks } from '../actions/book';
import BookCard from '../components/BookCard';
import { MyBooksContext } from '../context/Context';
import { Empty } from 'antd';
import Pagination from '@choc-ui/paginator';

const UserBooks = () => {
  const { userId } = useParams();
  const { token, user } = isAuthenticated();
  const [books, setBooks] = useState<any | null>();
  const { myBooks } = useContext(MyBooksContext);
  const [current, setCurrent] = useState(1);
  const pageSize = 9;
  const offset = (current - 1) * pageSize;
  const books_data = books && books.slice(offset, offset + pageSize);

  const checkUser =
    books && books.length > 0 && user && books[0].user._id === user._id;

  const checkBooks = books && books.length > 0;

  const loadUserBooks = async () => {
    try {
      const res = await getUserBooks(userId, token);
      setBooks(res.data);
    } catch (error: any) {
      if (error.response.status === 400) message.error(error.response.data, 4);
    }
  };

  const Prev = forwardRef((props, ref: any) => (
    <Button ref={ref} {...props} shadow='sm'>
      Prev
    </Button>
  ));
  const Next = forwardRef((props, ref: any) => (
    <Button ref={ref} {...props} shadow='sm'>
      Next
    </Button>
  ));

  const itemRender = (_: any, type: any) => {
    if (type === 'prev') {
      return Prev;
    }
    if (type === 'next') {
      return Next;
    }
  };

  useEffect(() => {
    loadUserBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myBooks]);

  return (
    <>
      <Box
        as='main'
        px={{ base: '1rem', md: '0' }}
        w={{
          base: 'full',
          md: 11 / 12,
          xl: 9 / 12,
        }}
        mx='auto'
      >
        <chakra.h1
          mb={'2.5rem'}
          mt={'3rem'}
          fontSize={{
            base: '2xl',
            md: '2xl',
          }}
          fontWeight={{
            base: 'bold',
            md: 'extrabold',
          }}
          color='orange.500'
          lineHeight='shorter'
          textAlign={'center'}
        >
          {checkBooks && checkUser && (
            <Text>
              <i className='fa-solid fa-bookmark'></i> Books in your List
            </Text>
          )}
          {checkBooks && !checkUser && (
            <Text>
              <i className='fa-solid fa-bookmark'></i> Books in{' '}
              {books && books.length > 0 && books[0].user.username}'s&nbsp; List
            </Text>
          )}
        </chakra.h1>
        {!books && (
          <Flex
            flexDir='column'
            textAlign='center'
            justifyContent='center'
            mt='4rem'
          >
            <Text fontSize='4rem'>
              <i className='fa-solid fa-book'></i>
            </Text>
            <Text fontSize='1.5rem' color='orange.500'>
              Loading books.....
            </Text>
          </Flex>
        )}
        <SimpleGrid
          minChildWidth={{ base: 'auto', md: '22rem' }}
          spacing='2rem'
        >
          {books_data &&
            books_data.length > 0 &&
            books_data.map((book: any, i: any) => {
              return <BookCard {...book} key={i} />;
            })}
        </SimpleGrid>
        {books && books.length > pageSize && (
          <Box pl={{ sm: '0', md: '2rem' }} mt='2rem'>
            <Pagination
              current={current}
              onChange={(page: any) => {
                setCurrent(page);
              }}
              pageSize={pageSize}
              total={books && books.length}
              itemRender={itemRender}
              paginationProps={{
                mt: '1rem',
                display: 'flex',
              }}
              colorScheme='orange'
            />
          </Box>
        )}

        {books && books.length === 0 && (
          <Box pt='5rem'>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<Text>User has not added any books</Text>}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default UserBooks;
