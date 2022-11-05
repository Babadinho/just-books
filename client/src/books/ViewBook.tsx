import { StarIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  chakra,
  Image,
  Link,
  Text,
  Tooltip,
  PopoverTrigger,
  Popover,
  PopoverFooter,
  PopoverBody,
  Button,
  PopoverContent,
  useDisclosure,
  PopoverCloseButton,
  PopoverHeader,
  PopoverArrow,
  Badge,
} from '@chakra-ui/react';
import { message, Popconfirm, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAuthenticated } from '../actions/auth';
import { addBook, removeBook, viewBook, getBookCount } from '../actions/book';
import Comments from '../components/Comments';
import { ListContext, MyBooksContext } from '../context/Context';

const ViewBook = () => {
  let params = useParams();
  const { Option } = Select;
  const { user, token } = isAuthenticated();
  const { myBooks, setMyBooks } = useContext(MyBooksContext);
  const { list } = useContext(ListContext);
  const [book, setBook] = useState<any | null>([]);
  const [bookCount, setBookCount] = useState<any | null>([]);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [selectOption, setSelectOption] = useState<any | null>('');
  const [accessInfo, setAccessInfo] = useState<any | null>([]);
  const [bookId, setBookId] = useState<any | null>('');

  // check book in user List to allow for Add or Remove
  const checkList =
    myBooks &&
    myBooks.length > 0 &&
    myBooks.some((b: any) => bookId && bookId === b.id);

  const getBook = async () => {
    try {
      const res = await viewBook(params.bookId);
      if (res.data) {
        setBook(res.data.volumeInfo);
        setAccessInfo(res.data.accessInfo);
        setBookId(res.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCount = async () => {
    try {
      const res = await getBookCount(params.bookId);
      if (res.data) {
        setBookCount(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBook = async () => {
    let bookDetails: any = {
      id: bookId,
      volumeInfo: {
        title: book.title,
        authors: book.authors,
        publisher: book.publisher,
        publishedDate: book.publishedDate,
        imageLinks: book.imageLinks,
      },
      list: selectOption,
    };

    try {
      const res = await addBook(user._id, bookDetails, token);
      if (res.data) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          onClose();
          setMyBooks(res.data);
          message.success('Book added to your list', 4);
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) message.error(error.response.data, 4);
    }
  };

  const handleRemoveBook = async () => {
    try {
      const res = await removeBook(user._id, { bookId: bookId }, token);
      if (res.data) {
        setMyBooks(res.data);
        message.success('Book removed from your list', 4);
      }
    } catch (error: any) {
      if (error.response.status === 400) message.error(error.response.data, 4);
    }
  };

  useEffect(() => {
    getBook();
    getCount();
    setSelectOption(list && list[0]._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myBooks]);

  return (
    <>
      <Popover
        placement='top-end'
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        {book && (
          <Flex
            my='5rem'
            mx={{ base: '0.6rem', md: '5rem', xl: '10rem' }}
            justifyContent='center'
            flexDir={{ base: 'column', md: 'column', lg: 'row' }}
          >
            <Box
              bg='white'
              shadow='md'
              rounded='md'
              maxH={'38rem'}
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
                alt='Book image'
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
                  <chakra.p>
                    {book.publishedDate && book.publishedDate}
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
              shadow='md'
              bg='white'
              maxW={{ base: '100%', md: '100%', lg: '73%' }}
            >
              <Flex justifyContent='space-between' alignItems='center'>
                <Text
                  color='gray.600'
                  fontSize='lg'
                  fontWeight='700'
                  rounded='md'
                >
                  Book Description
                </Text>
                {user && token && (
                  <Box>
                    <Tooltip
                      hasArrow
                      label='Remove from List'
                      bg='gray.300'
                      color='black'
                      placement='top'
                    >
                      <Text
                        fontSize={'1.4rem'}
                        color='orange.500'
                        cursor='pointer'
                        _hover={{
                          color: 'orange.600',
                        }}
                      >
                        {checkList && (
                          <Popconfirm
                            placement='top'
                            title={'Remove book from List?'}
                            onConfirm={handleRemoveBook}
                            okText='Yes'
                            cancelText='No'
                          >
                            <i className='fa-solid fa-bookmark'></i>
                          </Popconfirm>
                        )}
                      </Text>
                    </Tooltip>

                    <PopoverTrigger>
                      <Text
                        fontSize={'1.4rem'}
                        color='orange.500'
                        cursor='pointer'
                        _hover={{
                          color: 'orange.600',
                        }}
                      >
                        {!checkList && (
                          <Tooltip
                            hasArrow
                            label='Add to List'
                            bg='gray.300'
                            color='black'
                            placement='top'
                          >
                            <i className='fa-regular fa-bookmark'></i>
                          </Tooltip>
                        )}
                      </Text>
                    </PopoverTrigger>
                  </Box>
                )}
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
                  textAlign='justify'
                >
                  {book.description &&
                    book.description.replace(/(<([^>]+)>)/gi, '')}
                </chakra.p>
              </Box>

              {bookCount && bookCount > 0 && (
                <Flex justify={{ sm: 'flex-start', md: 'flex-end' }}>
                  <Box
                    rounded='1rem'
                    bg='orange.50'
                    fontWeight='500'
                    className='selectable'
                    px='0.5rem'
                    mt='1.7rem'
                  >
                    <Box display='flex' alignItems='center'>
                      <Box as='span' fontSize='0.7rem' pr='0.3rem'>
                        <i className='fa-solid fa-user'></i>
                      </Box>{' '}
                      <Box
                        as='span'
                        color='gray.600'
                        fontSize='0.83rem'
                        pt='0.05rem'
                        className='selectable'
                      >
                        {`${bookCount && bookCount} ${
                          bookCount === 1 ? 'user' : 'users'
                        } added this book to their
                        list`}
                      </Box>
                    </Box>
                  </Box>
                </Flex>
              )}

              <Flex
                justifyContent='space-between'
                alignItems='center'
                mt='2.2rem'
              >
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
                        <Link
                          href={accessInfo.epub.acsTokenLink}
                          target='_blank'
                        >
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
                        <Link
                          href={accessInfo.pdf.acsTokenLink}
                          target='_blank'
                        >
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
              <Box>
                <Comments params={params} />
              </Box>
            </Box>
          </Flex>
        )}
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'>Add book to List</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Select
              showSearch
              defaultValue={list && list[0]._id}
              style={{ width: '100%', textTransform: 'capitalize' }}
              placeholder='Select list'
              optionFilterProp='children'
              filterOption={(input, option) =>
                (option!.children as unknown as string).includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA!.children as unknown as string)
                  .toUpperCase()
                  .localeCompare(
                    (optionB!.children as unknown as string).toUpperCase()
                  )
              }
              onChange={(value: { value: string; label: React.ReactNode }) => {
                setSelectOption(value);
              }}
            >
              {list &&
                list.map((l: any, i: any) => (
                  <Option
                    value={l._id}
                    key={i}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {l.name}
                  </Option>
                ))}
            </Select>
          </PopoverBody>
          <PopoverFooter textAlign='right'>
            <Button variant='ghost' size='sm' mr='0.5rem' onClick={onClose}>
              Cancel
            </Button>
            <Button
              size='sm'
              fontWeight='500'
              bg={'orange.500'}
              color={'white'}
              _hover={{
                bg: 'orange.600',
              }}
              onClick={handleAddBook}
            >
              {loading ? (
                <Box
                  className='spinner-border text-light'
                  role='status'
                  h='1.4rem'
                  w='1.4rem'
                >
                  <Box as='span' className='sr-only'>
                    Loading...
                  </Box>
                </Box>
              ) : (
                'Submit'
              )}
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ViewBook;
