import { Box, chakra, SimpleGrid } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getBooks } from '../actions/book';
import BookCard from '../components/BookCard';
import Header from '../components/Header';

const Books = () => {
  const [books, setBooks] = useState<any | null>([]);

  const loadBooks = async () => {
    try {
      let res = await getBooks();
      setBooks(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
      <Header />
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
          <i className='fa-solid fa-star'></i> Trending books
        </chakra.h1>
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
