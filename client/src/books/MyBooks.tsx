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
  ChakraProps,
  OmitCommonProps,
  HStack,
  Button,
} from '@chakra-ui/react';
import { DetailedHTMLProps, HTMLAttributes, useContext } from 'react';
import { Link } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { BookContext } from '../context/Context';

const MyBooks = () => {
  const { books } = useContext(BookContext);
  const sidebar = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    window.localStorage.removeItem('just-books');
    window.location.reload();
  };

  const SidebarContent = (
    props: JSX.IntrinsicAttributes &
      OmitCommonProps<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        keyof ChakraProps
      > &
      ChakraProps & { as?: 'div' | undefined }
  ) => (
    <Box
      position={{ md: 'relative' }}
      h={{ sm: '100vh', md: '80vh' }}
      shadow={{ base: 'none', md: 'md' }}
      bg='white'
      _dark={{ bg: 'gray.800' }}
      w='15rem'
      {...props}
    >
      <Flex
        direction='column'
        as='nav'
        fontSize='sm'
        color='gray.600'
        aria-label='Main Navigation'
        px='4'
        pl='6'
        py='8'
      >
        <Box
          onClick={() => {
            sidebar.onClose();
          }}
          fontWeight='600'
          fontSize={{ sm: '1rem', md: '0.87rem' }}
        >
          <i className='fa-solid fa-list'></i> &nbsp;My Lists
        </Box>
      </Flex>
      <Box pl='6' px='4' py='4' w='full' position='absolute' bottom='0'>
        <Button
          w='full'
          fontWeight='600'
          fontSize='0.87rem'
          onClick={handleLogout}
          mt='5rem'
        >
          <i className='fa-solid fa-right-from-bracket'></i> &nbsp;Sign out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box as='section'>
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement='left'
      >
        <DrawerOverlay display={{ sm: 'block', md: 'none' }} />
        <DrawerContent display={{ sm: 'block', md: 'none' }}>
          <SidebarContent w='17rem' borderRight='none' />
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
          <SidebarContent display={{ base: 'none', md: 'block' }} />
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
              {books &&
                books.length > 0 &&
                books.map((book: any, i: any) => {
                  return <BookCard {...book} key={i} />;
                })}
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MyBooks;
