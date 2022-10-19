import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  useColorModeValue
} from '@chakra-ui/react';

const authenticated = ['My Books'];
const notAuthenticated = ['Login', 'Register'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    _hover={{
      textDecoration: 'none',
    }}>
    {children}
  </Link>
);

const NavBar = () => {   
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
            <Box fontFamily={'heading'} fontWeight={'bold'} fontSize={'1.4rem'} color="gray.700">
              <Link href={'/'} _hover={{
                textDecoration:'none'
              }}><i className="fa-solid fa-book"></i>{' '}Just Books</Link>
            </Box>
          </HStack>
          <HStack as={'nav'} spacing={4} display={'flex'} fontWeight={'600'}>
            <NavLink><Link className={'nav_link'} href={'/login'} _hover={{textDecoration: 'none'}}><i className="fa-solid fa-bookmark"></i>{' '}My Books</Link></NavLink>
            <NavLink><Link className={'nav_link'} href={'/login'} _hover={{textDecoration: 'none'}}>{' '}Login</Link></NavLink>
            <NavLink><Link className={'nav_link'} href={'/register'} _hover={{textDecoration: 'none'}}>{' '}Register</Link></NavLink>
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

export default NavBar