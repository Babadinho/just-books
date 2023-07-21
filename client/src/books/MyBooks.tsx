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
import { Link, useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Sidebar from '../components/Sidebar';
import { ListContext, MyBooksContext } from '../context/Context';
import { Empty } from 'antd';
import Pagination from '@choc-ui/paginator';
import { isAuthenticated } from '../actions/auth';
import { getActiveListBooks } from '../actions/book';

const MyBooks = ({ loadBooks }: any) => {
  const navigate = useNavigate();
  const { user, token } = isAuthenticated();
  const { list, setList } = useContext(ListContext);
  const [activeNavId, setActiveNavId] = useState<string | null>();
  const sidebar = useDisclosure();
  const { myBooks } = useContext(MyBooksContext);
  const [activeListBooks, setActiveListBooks] = useState<Array<{}> | null>();
  const [current, setCurrent] = useState(1);
  const pageSize = 10;
  const offset = (current - 1) * pageSize;
  const books_data =
    activeListBooks && activeListBooks.slice(offset, offset + pageSize);

  // check books in list count
  const books =
    activeListBooks &&
    activeListBooks.filter(
      (book: any) => book.list === activeNavId && activeNavId
    );

  const loadActiveListBooks = async () => {
    try {
      const res = await getActiveListBooks(
        user._id,
        {
          listId: activeNavId
            ? activeNavId
            : list && list.length > 0 && list[0]._id,
        },
        token
      );
      if (res.data) {
        setActiveListBooks(res.data);
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
    loadActiveListBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, myBooks, activeNavId]);

  useEffect(() => {
    setActiveNavId(list && list.length > 0 && list[0]._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myBooks]);

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
      <Box
        transition='.5s ease'
        px={{ base: '1rem', md: '5rem', xl: '12rem' }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          maxW='7xl'
          mx='auto'
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
            <Link to='/' className='logo' onClick={loadBooks}>
              <Flex alignItems={'center'}>
                <Box as='span' pb='0.2rem'>
                  <i className='fa-solid fa-book logo-book'></i>{' '}
                </Box>
                <Text ml='1'>Justbooks</Text>
              </Flex>
            </Link>
          </Box>
          <HStack display={'flex'}>
            <HStack
              fontWeight={'600'}
              display={'flex'}
              alignItems='center'
              fontSize={{ base: '1.2rem', md: '1.2rem' }}
            >
              <Box
                pl='0.4rem'
                cursor='pointer'
                onClick={() => navigate('/settings')}
              >
                <i className='fa-solid fa-user-gear'></i>
              </Box>
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
      </Box>
      <Box transition='.5s ease' px={{ base: '1rem', md: '5rem', xl: '12rem' }}>
        <Box
          py={{ base: 5 }}
          display='flex'
          justifyContent='center'
          maxW='7xl'
          mx='auto'
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
            }}
          >
            <SimpleGrid
              minChildWidth={{ base: 'auto', md: '22rem' }}
              spacing='2rem'
              pl={{ sm: '0', md: '2rem' }}
            >
              {books_data &&
                books_data.length > 0 &&
                books_data.map(
                  (book: any, i: any) =>
                    book.list === activeNavId &&
                    activeNavId && <BookCard {...book} key={i} />
                )}
            </SimpleGrid>
            {activeListBooks && activeListBooks.length > pageSize && (
              <Box pl={{ sm: '0', md: '2rem' }} mt='2rem'>
                <Pagination
                  current={current}
                  onChange={(page: any) => {
                    setCurrent(page);
                  }}
                  pageSize={pageSize}
                  total={activeListBooks && activeListBooks.length}
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
                  <Link to='/search'>
                    <Button colorScheme='orange' size='sm' fontWeight='sm'>
                      Search books
                    </Button>
                  </Link>
                </Empty>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Link className='float-button' to='/search'>
        <i className='fa-solid fa-magnifying-glass my-float'></i>
      </Link>
    </Box>
  );
};

export default MyBooks;
