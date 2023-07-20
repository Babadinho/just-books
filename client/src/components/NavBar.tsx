import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../actions/auth';
import { UserContext } from '../context/Context';

const NavBar = ({ loadBooks }: any) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    localStorage.getItem('just-books');
  }, [user]);

  return (
    <>
      <Box
        px={{ base: '1rem', md: '5rem', xl: '12rem' }}
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
      >
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'space-between'}
          minH={'60px'}
          py={{ base: 2 }}
          mx='auto'
          maxW='7xl'
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
              <Link to='/' className='logo' onClick={loadBooks}>
                <Flex alignItems={'center'}>
                  <Box as='span' pb='0.2rem'>
                    <i className='fa-solid fa-book logo-book'></i>{' '}
                  </Box>
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
            fontSize={{ base: '0.95rem', md: '0.95rem' }}
          >
            {isAuthenticated() && (
              <Box>
                <Link className='nav_link' to='/my-books'>
                  <i className='fa-solid fa-bookmark'></i>&nbsp;My Books
                </Link>
              </Box>
            )}
            {!isAuthenticated() && (
              <Box>
                <Link className='nav_link' to='/login'>
                  {' '}
                  <i className='fa-solid fa-right-to-bracket'></i>&nbsp;Login
                </Link>
              </Box>
            )}
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
