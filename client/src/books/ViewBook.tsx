import { StarIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  chakra,
  Image,
  Link,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { viewBook } from '../actions/book';

const ViewBook = () => {
  let params = useParams();
  const [book, setBook] = useState<any | null>([]);
  const [accessInfo, setAccessInfo] = useState<any | null>([]);

  const getBook = async () => {
    try {
      const res = await viewBook(params.bookId);
      if (res.data) {
        setBook(res.data.volumeInfo);
        setAccessInfo(res.data.accessInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {book && (
        <Flex
          my='5rem'
          mx={{ base: '0.6rem', md: '5rem', xl: '10rem' }}
          justifyContent='center'
          flexDir={{ base: 'column', md: 'column', lg: 'row' }}
        >
          <Box
            bg='white'
            shadow='lg'
            rounded='md'
            maxH={'1xl'}
            overflow='hidden'
            mr={{ md: '1rem' }}
            mb='1rem'
            w={{ base: '100%', md: '100%', lg: 'sm' }}
          >
            <Image
              w='full'
              h={60}
              fit='fill'
              objectPosition='center'
              src={book.imageLinks && book.imageLinks.thumbnail}
              alt='avatar'
            />

            <Flex alignItems='center' px={6} py={3} bg='orange.500'>
              <chakra.h1 mx={3} color='white' fontWeight='bold' fontSize='md'>
                {book.title && book.title}
              </chakra.h1>
            </Flex>

            <Box py={4} px={4}>
              <Flex
                mt={1}
                pb={4}
                fontSize='0.9rem'
                color='gray.600'
                _dark={{
                  color: 'gray.400',
                }}
              >
                {book.authors && book.authors.length > 1 ? (
                  <chakra.p fontWeight={'bold'} mr='0.3rem'>
                    Authors:
                  </chakra.p>
                ) : (
                  <Text fontWeight={'bold'} mr='0.3rem'>
                    Author:
                  </Text>
                )}
                <chakra.p>
                  {book.authors && book.authors[0]}
                  {book.authors &&
                    book.authors.length > 1 &&
                    ', ' + book.authors[1]}
                </chakra.p>
              </Flex>

              <Flex
                pb={4}
                fontSize='0.9rem'
                color='gray.600'
                _dark={{
                  color: 'gray.400',
                }}
              >
                <chakra.p fontWeight={'bold'} mr='0.3rem'>
                  Publisher:
                </chakra.p>
                <chakra.p>{book.publisher && book.publisher}</chakra.p>
              </Flex>

              <Flex
                pb={4}
                fontSize='0.9rem'
                color='gray.600'
                _dark={{
                  color: 'gray.400',
                }}
              >
                <chakra.p fontWeight={'bold'} mr='0.3rem'>
                  Published Date:
                </chakra.p>
                <chakra.p>{book.publishedDate && book.publishedDate}</chakra.p>
              </Flex>

              <Flex
                pb={4}
                fontSize='0.9rem'
                color='gray.600'
                _dark={{
                  color: 'gray.400',
                }}
              >
                <chakra.p fontWeight={'bold'} mr='0.3rem'>
                  Number of Pages:
                </chakra.p>
                <chakra.p>{book.pageCount && book.pageCount}</chakra.p>
              </Flex>

              {book.averageRating && (
                <Flex
                  pb={4}
                  fontSize='0.87rem'
                  color='gray.600'
                  alignItems='center'
                >
                  <chakra.p fontWeight={'bold'} mr='0.3rem'>
                    Critics Review:
                  </chakra.p>
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={
                          i < book.averageRating ? 'orange.500' : 'gray.300'
                        }
                      />
                    ))}
                  <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                    ({book.ratingsCount})
                  </Box>
                </Flex>
              )}
            </Box>
          </Box>
          <Box
            px={8}
            py={4}
            rounded='lg'
            shadow='lg'
            bg='white'
            maxW={{ base: '100%', md: '100%', lg: '73%' }}
          >
            <Flex justifyContent='space-between' alignItems='center'>
              <Text
                color='gray.700'
                fontSize='lg'
                fontWeight='700'
                rounded='md'
              >
                Book Description
              </Text>
              <Tooltip
                hasArrow
                label='Add to list'
                placement='top-end'
                bg='gray.200'
                color='black'
              >
                <Text
                  fontSize={'1.4rem'}
                  color='orange.500'
                  cursor='pointer'
                  _hover={{
                    color: 'orange.600',
                  }}
                >
                  <i className='fa-regular fa-bookmark'></i>
                </Text>
              </Tooltip>
            </Flex>

            <Box mt={2}>
              <chakra.p
                mt={4}
                color='gray.600'
                _dark={{
                  color: 'gray.300',
                }}
                fontSize='0.94rem'
                lineHeight='1.65rem'
              >
                {book.description &&
                  book.description.replace(/(<([^>]+)>)/gi, '')}
              </chakra.p>
            </Box>

            <Flex justifyContent='space-between' alignItems='center' mt={10}>
              <Box>
                <Link
                  px={3}
                  py={1}
                  mr={2}
                  bg='orange.500'
                  color='white'
                  fontSize='0.8rem'
                  fontWeight='500'
                  rounded='md'
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                    bg: 'orange.600',
                  }}
                  href={book.infoLink}
                  target='_blank'
                >
                  Read Sample
                </Link>

                <Link
                  px={3}
                  py={1}
                  bg='orange.500'
                  color='white'
                  fontSize='0.8rem'
                  fontWeight='500'
                  rounded='md'
                  _hover={{
                    textDecoration: 'none',
                    color: 'white',
                    bg: 'orange.600',
                  }}
                  href={book.previewLink}
                  target='_blank'
                >
                  Preview book
                </Link>
              </Box>
              <Box>
                <Flex justifyContent='space-between' alignItems='center'>
                  {accessInfo.epub && accessInfo.epub.isAvailable && (
                    <Tooltip
                      hasArrow
                      label='Download EPUB'
                      placement='top-end'
                      bg='gray.200'
                      color='black'
                    >
                      <Link href={accessInfo.epub.acsTokenLink} target='_blank'>
                        <Text
                          fontSize={'1.4rem'}
                          color='orange.500'
                          cursor='pointer'
                          mr='0.5rem'
                          _hover={{
                            color: 'orange.600',
                          }}
                        >
                          <i className='fa-solid fa-file-arrow-down'></i>
                        </Text>
                      </Link>
                    </Tooltip>
                  )}

                  {accessInfo.pdf && accessInfo.pdf.isAvailable && (
                    <Tooltip
                      hasArrow
                      label='Download PDF'
                      placement='top-end'
                      bg='gray.200'
                      color='black'
                    >
                      <Link href={accessInfo.pdf.acsTokenLink} target='_blank'>
                        <Text
                          fontSize={'1.4rem'}
                          color='orange.500'
                          cursor='pointer'
                          _hover={{
                            color: 'orange.600',
                          }}
                        >
                          <i className='fa-solid fa-file-pdf'></i>
                        </Text>
                      </Link>
                    </Tooltip>
                  )}
                </Flex>
              </Box>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ViewBook;
