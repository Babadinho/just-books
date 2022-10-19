import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = ['About', 'Contact'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
  return (
    <><Box>
    <Flex h={16} alignItems={'center'} justifyContent={'space-between'} bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')} borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4, md: 40 }}>
      <HStack spacing={8} alignItems={'center'}>
        <Box 
            fontFamily={'heading'}
            fontWeight={'700'}
            color={useColorModeValue('gray.800', 'white')}>Just Books</Box>
      </HStack>
      <HStack
          as={'nav'}
          spacing={4}
          display={{ base: 'none', md: 'flex' }}>
          {Links.map((link) => (
            <NavLink key={link}>{link}</NavLink>
          ))}
        </HStack>
      <IconButton
        bg={useColorModeValue('white', 'gray.800')}
        size={'lg'}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon  w={5} h={5}/>}
        aria-label={'Open Menu'}
        display={{ md: 'none' }}
        onClick={isOpen ? onClose : onOpen}
      />
    </Flex>

    {isOpen ? (
      <Box pb={4} display={{ md: 'none' }}>
        <Stack as={'nav'} spacing={4} align={'center'}>
          {Links.map((link) => (
            <NavLink key={link}>{link}</NavLink>
          ))}
        </Stack>
      </Box>
    ) : null}
  </Box>
</>
  )
}

export default NavBar