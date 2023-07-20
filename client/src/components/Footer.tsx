import {
  Box,
  chakra,
  Flex,
  Text,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      mt='6rem'
      px={{ base: '1rem', md: '5rem', xl: '12rem' }}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <Flex
        w='full'
        maxW='7xl'
        flexDir='row'
        alignItems='center'
        justifyContent='center'
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        h={'60px'}
        mx='auto'
      >
        <Flex
          w='full'
          as='footer'
          flexDir={{ base: 'column', md: 'row' }}
          align='center'
          justify='space-between'
          py='4'
        >
          <chakra.p
            py={{ base: '2', sm: '0' }}
            color='gray.800'
            _dark={{ color: 'white' }}
          >
            Justbooks © 2023. All Rights Reserved
          </chakra.p>

          <chakra.p color='gray.800' _dark={{ color: 'white' }}>
            Built by{' '}
            <Link
              href='https://github.com/Babadinho'
              color='orange.500'
              fontWeight='600'
              target='_blank'
              _hover={{
                color: 'orange.600',
              }}
            >
              Babadinho
            </Link>
          </chakra.p>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
