import { Search2Icon } from '@chakra-ui/icons';
import {
  chakra,
  Box,
  IconButton,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const Header = () => {
  return (
    <Box
      px={4}
      pt={{ base: '3rem', md: '6rem' }}
      pb={{ base: '0.5rem', md: '0.5rem' }}
      mb='3rem'
      mx='auto'
      bgGradient='linear(to-b, orange.50, #fdfdfc)'
    >
      <Box
        w={{
          base: 'full',
          md: 11 / 12,
          xl: 8 / 12,
        }}
        textAlign={{
          base: 'left',
          md: 'center',
        }}
        mx='auto'
      >
        <chakra.h1
          mb={3}
          fontSize={{
            base: '4xl',
            md: '5xl',
          }}
          fontWeight={{
            base: 'bold',
            md: 'extrabold',
          }}
          color='orange.500'
          _dark={{
            color: 'orange.100',
          }}
          lineHeight='shorter'
        >
          Find all your favourite books
        </chakra.h1>
        <chakra.p
          mb={6}
          fontSize={{
            base: '1.1rem',
            md: 'xl',
          }}
          color='gray.600'
          lineHeight='base'
        >
          Search for books anywhere, you can search for books using the book
          name, author name, or publisher. Just enter keyword in the search and
          select search criteria.
        </chakra.p>
        <SimpleGrid
          as='form'
          w={{
            base: 'full',
            md: 7 / 12,
          }}
          spacing={1}
          pt={8}
          mx='auto'
          mb={8}
        >
          <InputGroup size='lg'>
            <Input
              placeholder='Enter book or author name...'
              focusBorderColor='orange.500'
              background='white'
            />
            <InputRightElement
              children={
                <IconButton
                  borderTopLeftRadius={0}
                  borderBottomLeftRadius={0}
                  bg='orange.500'
                  color='white'
                  size='lg'
                  _hover={{
                    bg: 'orange.600',
                  }}
                  aria-label='Search database'
                  icon={<Search2Icon />}
                />
              }
            />
          </InputGroup>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Header;
