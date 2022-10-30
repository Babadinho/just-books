import { Box, chakra, Text, SimpleGrid, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import { BookContext } from '../context/Context';

const Books = () => {
  const { books } = useContext(BookContext);

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
