import { Box, Flex, chakra, Text, Tooltip } from '@chakra-ui/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../actions/auth';
import { addBook } from '../actions/book';

const BookCard = ({ ...book }) => {
  const { user, token } = isAuthenticated();

  const handleAddBook = async () => {
    let bookDetails: any = {
      accessInfo: book.id,
      volumeInfo: {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        publishedDate: book.volumeInfo.publishedDate,
        imageLinks: book.volumeInfo.imageLinks,
      },
    };

    try {
      const res = await addBook(bookDetails, token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {book.volumeInfo.imageLinks && (
        <Flex
          w='100%'
          mx='auto'
          bg='white'
          _dark={{
            bg: 'gray.800',
          }}
          shadow='md'
          rounded='md'
          overflow='hidden'
          className='book-card'
        >
          <Box
            w={1 / 3}
            bgSize='100% 100%'
            bgRepeat='no-repeat'
            bgImage={
              book.volumeInfo.imageLinks &&
              book.volumeInfo.imageLinks['thumbnail']
            }
          ></Box>

          <Box
            w={2 / 3}
            p={{
              base: 4,
              md: 4,
            }}
            position={'relative'}
          >
            {user && token && (
              <Tooltip
                hasArrow
                label='Add to list'
                placement='top-end'
                bg='gray.200'
                color='black'
              >
                <Text
                  fontSize={'1.2rem'}
                  color='orange.500'
                  position={'absolute'}
                  cursor='pointer'
                  top={2}
                  right={3}
                  _hover={{
                    color: 'orange.600',
                  }}
                  onClick={handleAddBook}
                >
                  <i className='fa-regular fa-bookmark'></i>
                </Text>
              </Tooltip>
            )}
            <Link to={`/book/${book.id}`}>
              <chakra.h1
                fontSize='1xl'
                fontWeight='bold'
                color='gray.800'
                pr={'0.8rem'}
                _dark={{
                  color: 'white',
                }}
              >
                {book.volumeInfo.title}
              </chakra.h1>
            </Link>
            <Flex
              mt={2}
              fontSize='0.75rem'
              color='gray.600'
              _dark={{
                color: 'gray.400',
              }}
            >
              {book.volumeInfo.authors && book.volumeInfo.authors.length > 1 ? (
                <chakra.p fontWeight={'bold'} mr='0.3rem'>
                  Authors:
                </chakra.p>
              ) : (
                <Text fontWeight={'bold'} mr='0.3rem'>
                  Author:
                </Text>
              )}
              <chakra.p>
                {book.volumeInfo.authors && book.volumeInfo.authors[0]}
                {book.volumeInfo.authors &&
                  book.volumeInfo.authors.length > 1 &&
                  ', ' + book.volumeInfo.authors[1]}
              </chakra.p>
            </Flex>

            <Flex
              mt={1}
              fontSize='0.75rem'
              color='gray.600'
              _dark={{
                color: 'gray.400',
              }}
            >
              <chakra.p fontWeight={'bold'} mr='0.3rem'>
                Publisher:
              </chakra.p>
              <chakra.p>
                {book.volumeInfo.publisher && book.volumeInfo.publisher}
              </chakra.p>
            </Flex>

            <Flex
              mt={1}
              fontSize='0.75rem'
              color='gray.600'
              _dark={{
                color: 'gray.400',
              }}
            >
              <chakra.p fontWeight={'bold'} mr='0.3rem'>
                Published Date:
              </chakra.p>
              <chakra.p>
                {book.volumeInfo.publishedDate && book.volumeInfo.publishedDate}
              </chakra.p>
            </Flex>

            <Flex mt={5} alignItems='center' justifyContent='flex-start'>
              <Link to={`/book/${book.id}`}>
                <chakra.button
                  px={2}
                  py={1}
                  bg='orange.500'
                  fontSize='0.7rem'
                  color='white'
                  rounded='sm'
                  _hover={{
                    bg: 'orange.600',
                  }}
                >
                  More details
                </chakra.button>
              </Link>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default BookCard;
