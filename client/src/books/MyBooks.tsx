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
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import Sidebar from '../components/Sidebar';
import { BookContext } from '../context/Context';

const MyBooks = () => {
  const [books, setBooks] = useState();
  const sidebar = useDisclosure();

  return (
    <Box as='section'>
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement='left'
      >
        <DrawerOverlay display={{ sm: 'block', md: 'none' }} />
        <DrawerContent display={{ sm: 'block', md: 'none' }}>
          <Sidebar w='17rem' borderRight='none' />
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
          py={{ base: 2 }}
          px={{ base: 4, md: '5rem', xl: '8rem' }}
          display='flex'
          justifyContent='center'
        >
          <Sidebar display={{ base: 'none', md: 'block' }} />
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
              {/* {books &&
                books.length > 0 &&
                books.map((book: any, i: any) => {
                  return <BookCard {...book} key={i} />;
                })} */}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyBooks;
