import { useNavigate } from 'react-router-dom';
import { Search2Icon } from '@chakra-ui/icons';
import { useState } from 'react';
import {
  chakra,
  Box,
  IconButton,
  SimpleGrid,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { addSearch } from '../actions/searches';
import { isAuthenticated } from '../actions/auth';

const Header = () => {
  const navigate = useNavigate();
  const { user } = isAuthenticated();
  const [value, setValue] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (value === '') {
      e.preventDefault();
      navigate('/search');
      return;
    }
    navigate(
      `/search/?q=${value}&orderBy=relevance&filterBy=&startIndex=0&maxResults=21`
    );
    await addSearch({ userId: user ? user._id : null, query: value });
  };

  return (
    <Box
      px={4}
      pt={{ base: '3rem', md: '6rem' }}
      pb={{ base: '0.5rem', md: '0.5rem' }}
      mb='3.5rem'
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
          Search for books anywhere. You can search for books using the book
          name, author name, or publisher. Just enter keyword in the search box
          below and hit enter to begin.
        </chakra.p>
        <SimpleGrid
          onSubmit={handleSubmit}
          as='form'
          w={{
            base: 'full',
            md: 7 / 12,
          }}
          spacing={1}
          pt={8}
          mx='auto'
          mb={'1.5rem'}
        >
          <InputGroup size='lg'>
            <Input
              placeholder='Enter book or author name...'
              focusBorderColor='white'
              borderColor='white'
              outlineColor={isError ? 'red.400' : 'orange.500'}
              background='white'
              fontSize='md'
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setIsError(false);
              }}
              _hover={{
                focusBorderColor: 'white',
              }}
            />
            <InputRightElement
              children={
                <IconButton
                  onClick={handleSubmit}
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
