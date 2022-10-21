import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../actions/auth';
import { UserContext } from '../UserContext';

const NavBar = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    localStorage.getItem('just-books');
  }, [user]);

  return (
    <>
      <Box>
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
          px={{ base: 4, md: 40 }}
        >
          <HStack spacing={8} alignItems={'center'}>
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
                  <i className='fa-solid fa-book'></i>{' '}
                  <Text ml='1'>Justbooks</Text>
                </Flex>
              </Link>
            </Box>
          </HStack>
          <HStack
            as={'nav'}
            spacing={6}
            display={'flex'}
            fontWeight={'600'}
            fontSize={{ base: '0.9rem', md: 'md' }}
          >
            {isAuthenticated() && (
              <Link className='nav_link' to='/my-books'>
                <i className='fa-solid fa-bookmark'></i> My Books
              </Link>
            )}
            {!isAuthenticated() && (
              <>
                <Link className='nav_link' to='/login'>
                  {' '}
                  Login
                </Link>
                <Link className={'nav_link'} to='/register'>
                  {' '}
                  Register
                </Link>
              </>
            )}
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
