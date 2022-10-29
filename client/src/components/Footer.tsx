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
    <Box mt='auto'>
      <Flex
        w='full'
        flexDir='row'
        alignItems='center'
        justifyContent='center'
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        borderTop={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        h={'60px'}
        px={{ base: 4, md: 20, xl: 40 }}
        mt='5rem'
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
            Justbooks © 2022. All Rights Reserved
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
