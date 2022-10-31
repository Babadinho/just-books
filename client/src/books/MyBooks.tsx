import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  SimpleGrid,
  HStack,
  Button,
} from '@chakra-ui/react';
import { useState, useContext, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Sidebar from '../components/Sidebar';
import { ListContext } from '../context/Context';
import { Empty } from 'antd';
import Pagination from '@choc-ui/paginator';
import { isAuthenticated } from '../actions/auth';
import { getActiveListBooks } from '../actions/book';

const MyBooks = () => {
  const { user, token } = isAuthenticated();
  const { list, setList } = useContext(ListContext);
  const [activeNavId, setActiveNavId] = useState<any | null>();
  const sidebar = useDisclosure();
  const [myBooks, setMyBooks] = useState<any | null>();
  const [current, setCurrent] = useState(1);
  const pageSize = 6;
  const offset = (current - 1) * pageSize;
  const books_data = myBooks && myBooks.slice(offset, offset + pageSize);

  // check books in list count
  const books =
    myBooks &&
    myBooks.filter((book: any) => book.list === activeNavId && activeNavId);

  const loadActiveListBooks = async () => {
    try {
      const res = await getActiveListBooks(
        user._id,
        { listId: activeNavId },
        token
      );
      if (res.data) {
        setMyBooks(res.data);
        setCurrent(1);
      }
    } catch (error) {
      console.log(error);
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
    setActiveNavId(list && list[0]._id);
  }, []);

  useEffect(() => {
    loadActiveListBooks();
  }, [list, activeNavId]);

  return (
    <Box as='section'>
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement='left'
      >
        <DrawerOverlay display={{ sm: 'block', md: 'none' }} />
        <DrawerContent display={{ sm: 'block', md: 'none' }}>
          <Sidebar
            activeNav={activeNavId}
            setActiveNav={setActiveNavId}
            list={list}
            setList={setList}
            sidebar={sidebar}
            w='17rem'
            borderRight='none'
          />
        </DrawerContent>
      </Drawer>
      <Box transition='.3s ease'>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4, md: 20, xl: 40 }}
        >
          <Box
            fontFamily={'heading'}
            fontWeight={'bold'}
            fontSize={'1.4rem'}
            color='gray.600'
            _dark={{
              color: 'gray.100',
            }}
          >
            <Link to='/' className='logo'>
              <Flex alignItems={'center'}>
                <i className='fa-solid fa-book logo-book'></i>{' '}
                <Text ml='1'>Justbooks</Text>
              </Flex>
            </Link>
          </Box>
          <HStack display={'flex'}>
            <HStack
              fontWeight={'600'}
              display={'flex'}
              alignItems='center'
              fontSize={{ base: '0.9rem', md: '0.9rem' }}
            >
              <Link className='nav_link' to='/search'>
                <i className='fa-solid fa-magnifying-glass'></i> Search books
              </Link>
            </HStack>
            <IconButton
              bg='white'
              aria-label='Menu'
              display={{ base: 'inline-flex', md: 'none' }}
              onClick={sidebar.onOpen}
              _hover={{
                bg: 'white',
              }}
              icon={<i className='fa-solid fa-ellipsis-vertical'></i>}
              size='md'
              fontSize='1.4rem'
            />
          </HStack>
        </Flex>
        <Box
          py={{ base: 5 }}
          px={{ base: 4, md: '5rem', xl: '8rem' }}
          display='flex'
          justifyContent='center'
        >
          <Box display={{ base: 'none', md: 'block' }} w='16rem'>
            <Sidebar
              activeNav={activeNavId}
              setActiveNav={setActiveNavId}
              list={list}
              setList={setList}
              sidebar={sidebar}
            />
          </Box>
          <Box
            as='main'
            w={{
              base: 'full',
              md: 11 / 12,
              xl: 9 / 12,
            }}
          >
            <SimpleGrid
              minChildWidth={{ base: 'auto', md: '22rem' }}
              spacing='2rem'
              pl={{ sm: '0', md: '2rem' }}
            >
              {books_data &&
                books_data.length > 0 &&
                books_data.map((book: any, i: any) => {
                  if (book.list === activeNavId && activeNavId) {
                    return <BookCard {...book} key={i} />;
                  }
                })}
            </SimpleGrid>
            {myBooks && myBooks.length > pageSize && (
              <Box pl={{ sm: '0', md: '2rem' }} mt='2rem'>
                <Pagination
                  current={current}
                  onChange={(page: any) => {
                    setCurrent(page);
                  }}
                  pageSize={pageSize}
                  total={myBooks && myBooks.length}
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
                  description={<Box as='span'>No books in this list</Box>}
                >
                  <Button>
                    <Link className='nav_link' to='/search'>
                      Search for books
                    </Link>
                  </Button>
                </Empty>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyBooks;
