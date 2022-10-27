import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchBook } from '../actions/book';
import queryString from 'query-string';
import {
  Box,
  chakra,
  Text,
  SimpleGrid,
  InputGroup,
  Input,
  InputRightElement,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Select,
  Button,
} from '@chakra-ui/react';
import BookCard from '../components/BookCard';
import { Search2Icon } from '@chakra-ui/icons';

const SearchBooks = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<any | null>([]);
  const [bookCount, setBookCount] = useState<number>();
  const [value, setValue] = useState<any>('');
  const [order, setOrder] = useState('relevance');
  const [filter, setFilter] = useState('');
  const [start, setStart] = useState<number>(0);
  const [max, setMax] = useState<number>(21);
  const [isError, setIsError] = useState<boolean>(false);

  const { q, orderBy, filterBy } = queryString.parse(window.location.search);

  const loadSearch = async () => {
    try {
      let res = await searchBook(q, orderBy, filterBy, start);
      setSearch(res.data.items);
      setValue(q);
      setBookCount(res.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    if (value === '') {
      e.preventDefault();
      setIsError(true);
      return;
    }
    setStart(0);
    setMax(21);
    setOrder('relevance');
    setFilter('');
    navigate(
      `/search/?q=${value}&orderBy=relevance&filterBy=&startIndex=0&maxResults=21`
    );
    setFilter('');
  };

  useEffect(() => {
    loadSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, order, filter, start, max]);

  const handlePrevious = () => {
    let new_start = start - 21;
    setStart(new_start);
    let new_max = max - 21;
    setMax(new_max);

    navigate(
      `/search/?q=${value}&orderBy=${order}&filterBy=${filter}&startIndex=${new_start}&maxResults=21`
    );
  };

  const handleNext = () => {
    let new_start = max;
    let new_max = max + 21;
    setStart(new_start);
    setMax(new_max);

    navigate(
      `/search/?q=${value}&orderBy=${order}&filterBy=${filter}&startIndex=${new_start}&maxResults=21`
    );
  };

  return (
    <Box>
      <Box
        px={4}
        pt={{ base: '2rem', md: '2rem' }}
        pb={{ base: '0.5rem', md: '0.5rem' }}
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
            mb={8}
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
                isRequired
                onChange={(e) => {
                  setValue(e.target.value);
                  setIsError(false);
                }}
                _hover={{
                  focusBorderColor: 'white',
                }}
                // onSubmit={handleSubmit}
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
            {isError && (
              <Text align='left' fontSize='0.8rem' color='red' pt='0.5rem'>
                Search field cannot be empty
              </Text>
            )}
          </SimpleGrid>
        </Box>
      </Box>

      <Box
        as='main'
        px={{ base: '1rem', md: '0' }}
        w={{
          base: 'full',
          md: 11 / 12,
          xl: 9 / 12,
        }}
        mx='auto'
      >
        <chakra.h1
          mb={'3rem'}
          fontSize={{
            base: 'xl',
            md: '2xl',
          }}
          fontWeight={{
            base: 'bold',
            md: 'extrabold',
          }}
          color='orange.500'
          lineHeight='shorter'
          textAlign={'center'}
        >
          {search && search.length > 0 && (
            <Text>
              {bookCount} Search results for '{q}'
            </Text>
          )}
        </chakra.h1>
        <Flex justifyContent='space-between' alignItems='center' mb='1.3rem'>
          <Box w={{ base: '40%', md: '12rem' }}>
            <Select
              placeholder='Filter'
              size='sm'
              borderColor='orange.400'
              focusBorderColor='orange.400'
              _hover={{
                borderColor: 'orange.400',
              }}
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setStart(0);
                setMax(21);
                navigate(
                  `/search/?q=${value}&orderBy=${order}&filterBy=${e.target.value}&startIndex=0&maxResults=21`
                );
              }}
            >
              <option value='partial'>Partial Preview</option>
              <option value='full'>Full Preview</option>
              <option value='free-ebooks'>Free eBooks</option>
              <option value='paid-ebooks'>Paid eBooks</option>
              <option value='ebooks '>Google eBooks</option>
            </Select>
          </Box>

          <RadioGroup
            onChange={(order) => {
              setOrder(order);
              setStart(0);
              setMax(21);
              navigate(
                `/search/?q=${value}&orderBy=${order}&filterBy=${filter}&startIndex=0&maxResults=21`
              );
            }}
            value={order}
            defaultValue={order}
          >
            <Stack spacing={3} direction='row'>
              <Radio size='sm' colorScheme='orange' value='relevance'>
                Relevance
              </Radio>
              <Radio size='sm' colorScheme='orange' value='newest'>
                Newest
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>
        {search && search.length === 0 && (
          <Flex
            flexDir='column'
            textAlign='center'
            justifyContent='center'
            mt='4rem'
          >
            <Text fontSize='4rem'>
              <i className='fa-solid fa-book'></i>
            </Text>
            <Text fontSize='1.5rem' color='orange.500'>
              Loading books.....
            </Text>
          </Flex>
        )}
        <SimpleGrid
          minChildWidth={{ base: 'auto', md: '22rem' }}
          spacing='2rem'
          mb='2rem'
        >
          {search &&
            search.length > 0 &&
            search.map((book: any, i: any) => {
              return <BookCard {...book} key={i} />;
            })}
        </SimpleGrid>

        {bookCount && (
          <Flex justifyContent='space-between'>
            <Box>
              {start > 0 && (
                <Button
                  size='sm'
                  fontWeight='500'
                  bg={'orange.500'}
                  color={'white'}
                  rounded='sm'
                  _hover={{
                    bg: 'orange.600',
                  }}
                  onClick={handlePrevious}
                >
                  <Box>
                    <Flex alignItems='center'>&lt; Previous page</Flex>
                  </Box>
                </Button>
              )}
            </Box>
            <Box>
              {search !== undefined && (
                <Button
                  alignSelf='flex-end'
                  size='sm'
                  fontWeight='500'
                  bg={'orange.500'}
                  rounded='sm'
                  color={'white'}
                  _hover={{
                    bg: 'orange.600',
                  }}
                  onClick={handleNext}
                >
                  <Box>
                    <Flex alignItems='center'>Next page &gt;</Flex>
                  </Box>
                </Button>
              )}
            </Box>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default SearchBooks;
