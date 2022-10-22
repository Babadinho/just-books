import { Box, Flex, HStack, chakra, Text, Tooltip } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const BookCard = ({ ...book }) => {
  return (
    <>
      <Flex
        w='100%'
        mx='auto'
        bg='white'
        _dark={{
          bg: 'gray.800',
        }}
        shadow='lg'
        rounded='md'
        overflow='hidden'
        className='book-card'
      >
        <Box
          w={1 / 3}
          bgSize='cover'
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
            >
              <i className='fa-regular fa-bookmark'></i>
            </Text>
          </Tooltip>
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
              {book.volumeInfo.authors && book.volumeInfo.authors[0]}{' '}
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
              View more
            </chakra.button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default BookCard;
