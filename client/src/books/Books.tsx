import { Box, chakra, Text, SimpleGrid, Flex } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { searchBook, getBooks } from '../actions/book';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import { BookContext } from '../context/Context';

const Books = () => {
  const { books } = useContext(BookContext);
  // const [books, setBooks] = useState<any | null>(null);
  // const [loading, setLoading] = useState()
  // const [search, setSearch] = useState<any | null>([]);
  // const [bookCount, setBookCount] = useState<number>();
  // const [value, setValue] = useState<string>('');
  // const [searchString, setSearchString] = useState<string>('');

  // const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setSearchString(value);
  //   try {
  //     let res = await searchBook(value);
  //     setBooks('');
  //     setValue('');
  //     setSearch(res.data.items);
  //     setBookCount(res.data.totalItems);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const loadBooks = async () => {
  //   try {
  //     let res = await getBooks();
  //     setBooks(res.data.items);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   loadBooks();
  // }, []);

  return (
    <>
      <Header
      // value={value}
      // search={search}
      // setValue={setValue}
      // handleSearch={handleSearch}
      />
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
            base: '2xl',
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
          {/* {!books && search && search.length > 0 && (
            <Text>
              {bookCount} Search results for '{searchString}'
            </Text>
          )} */}
          {books && (
            <Text>
              <i className='fa-solid fa-star'></i> Trending books
            </Text>
          )}
        </chakra.h1>
        {!books && (
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
        >
          {books &&
            books.length > 0 &&
            books.map((book: any, i: any) => {
              return <BookCard {...book} key={i} />;
            })}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Books;
