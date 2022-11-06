import { StarIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  chakra,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Tooltip,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';
import { message, Select, Popconfirm } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../actions/auth';
import { addBook, removeBook } from '../actions/book';
import { ListContext, MyBooksContext } from '../context/Context';

const BookCard = ({ ...book }) => {
  const { user, token } = isAuthenticated();
  const { list } = useContext(ListContext);
  const { myBooks, setMyBooks } = useContext(MyBooksContext);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [loading, setLoading] = useState<Boolean>(false);
  const [selectOption, setSelectOption] = useState<string>('');

  const { Option } = Select;

  // check book in user List to allow for Add or Remove
  const checkList =
    myBooks && myBooks.length > 0 && myBooks.some((b: any) => book.id === b.id);

  const handleAddBook = async () => {
    let bookDetails: any = {
      id: book.id,
      volumeInfo: {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        publisher: book.volumeInfo.publisher,
        publishedDate: book.volumeInfo.publishedDate,
        averageRating: book.volumeInfo.averageRating,
        imageLinks: book.volumeInfo.imageLinks,
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
      const res = await removeBook(user._id, { bookId: book.id }, token);
      if (res.data) {
        setMyBooks(res.data);
        message.success('Book removed from your list', 4);
      }
    } catch (error: any) {
      if (error.response.status === 400) message.error(error.response.data, 4);
    }
  };

  useEffect(() => {
    setSelectOption(list && list[0]._id);
  }, [myBooks]);

  return (
    <>
      <Popover
        placement='top-end'
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
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
                <>
                  <Tooltip
                    hasArrow
                    label='Remove from List'
                    bg='gray.300'
                    color='black'
                    placement='top'
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
                </>
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
                {book.volumeInfo.authors &&
                book.volumeInfo.authors.length > 1 ? (
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
                  {book.volumeInfo.publishedDate &&
                    book.volumeInfo.publishedDate}
                </chakra.p>
              </Flex>

              <Flex
                mt={5}
                alignItems='center'
                justifyContent='space-between'
                align='center'
              >
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

                <Flex align='center'>
                  {book.volumeInfo.averageRating && (
                    <Badge
                      rounded='1rem'
                      mr='0.5rem'
                      bg='orange.50'
                      fontWeight='500'
                    >
                      <Flex align='center'>
                        <Box
                          color='gray.600'
                          fontSize='0.82rem'
                          mr='0.08rem'
                          className='selectable'
                        >
                          {book.volumeInfo.averageRating &&
                            book.volumeInfo.averageRating}
                        </Box>

                        <Box pb='0.25rem'>
                          {book.volumeInfo.averageRating && (
                            <StarIcon
                              fontSize='0.7rem'
                              color='gold'
                              alignSelf='center'
                            />
                          )}
                        </Box>
                      </Flex>
                    </Badge>
                  )}

                  {book && book.count && (
                    <Badge rounded='1rem' bg='orange.50' fontWeight='500'>
                      <Tooltip
                        placement='top'
                        hasArrow
                        fontSize='0.8rem'
                        label={`${book && book.count} ${
                          book.count === 1 ? 'user' : 'users'
                        } added this book`}
                      >
                        <Box
                          display='flex'
                          alignItems='center'
                          cursor='pointer'
                        >
                          <Box as='span' fontSize='0.68rem' pr='0.15rem'>
                            <i className='fa-solid fa-user'></i>
                          </Box>{' '}
                          <Box
                            as='span'
                            color='gray.600'
                            fontSize='0.83rem'
                            pt='0.05rem'
                            className='selectable'
                          >
                            {book && book.count}
                          </Box>
                        </Box>
                      </Tooltip>
                    </Badge>
                  )}
                </Flex>
              </Flex>
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
              onChange={(value: string) => {
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

export default BookCard;
