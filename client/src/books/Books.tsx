import { Box, chakra, Text, SimpleGrid } from '@chakra-ui/react';
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
        {!books && (
          // <Flex
          //   flexDir='column'
          //   textAlign='center'
          //   justifyContent='center'
          //   mt='1rem'
          //   mb='5rem'
          // >
          //   <Text fontSize='4rem'>
          //     <i className='fa-solid fa-book'></i>
          //   </Text>
          //   <Text fontSize='1.5rem' color='orange.500'>
          //     Loading books.....
          //   </Text>
          // </Flex>
          <Box className='loading-container'>
            <Box className='loading'></Box>
            <Box id='loading-text'>Loading books</Box>
          </Box>
        )}
        <chakra.h1
          mb={'3.5rem'}
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
              <i className='fa-solid fa-fire'></i> Trending books
            </Text>
          )}
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
