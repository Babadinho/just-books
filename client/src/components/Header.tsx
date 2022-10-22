import { Search2Icon } from '@chakra-ui/icons';
import {
  chakra,
  Box,
  IconButton,
  SimpleGrid,
  GridItem,
  VisuallyHidden,
  Input,
  Button,
  Stack,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  Select,
} from '@chakra-ui/react';

const Header = () => {
  return (
    <Box px={4} py={{ base: '3rem', md: 24 }} mx='auto'>
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
            {/* <InputLeftElement
              color='gray.700'
              mx='auto'
              children={
                <Select placeholder='Search by' border='none'>
                  <option value='option1'>Option 1</option>
                  <option value='option2'>Option 2</option>
                  <option value='option3'>Option 3</option>
                </Select>
              }
            /> */}
            <Input
              placeholder='Enter book or author name...'
              focusBorderColor='orange.500'
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
