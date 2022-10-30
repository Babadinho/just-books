import {
  Box,
  Flex,
  ChakraProps,
  OmitCommonProps,
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { message } from 'antd';
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useContext,
  useEffect,
  useState,
} from 'react';
import { isAuthenticated } from '../actions/auth';
import { addList, getList } from '../actions/list';

const Sidebar = (
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      keyof ChakraProps
    > &
    ChakraProps & { as?: 'div' | undefined }
) => {
  const [list, setList] = useState<any | null>();
  const [newList, setNewList] = useState<any | null>();
  const { user, token } = isAuthenticated();
  const sidebar = useDisclosure();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [activeNav, setActiveNav] = useState<any | null>('Default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState<any | null>();

  const loadList = async () => {
    try {
      const res = await getList(user._id, token);
      setList(res.data);
    } catch (error: any) {
      message.error(error.response.data, 4);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await addList(user._id, { name: value }, token);
      if (res.data) {
        setLoading(true);
        setTimeout(() => {
          setNewList(res.data);
          setLoading(false);
          onClose();
          setValue('');
          message.success(res.data.name + ' added to your list', 4);
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) setError(error.response.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadList();
  }, [newList]);

  const handleLogout = () => {
    window.localStorage.removeItem('just-books');
    window.location.reload();
  };

  const CreatelistModal = (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setValue('');
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='1.2rem' color='gray.700'>
            Create new List
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} color='gray.600'>
              <FormControl>
                <Input
                  borderColor={error ? 'red' : '#e2e8f0'}
                  _focus={{
                    outline: 'none',
                  }}
                  placeholder='Enter list name'
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError('');
                  }}
                />
                <Text color='red.500' pt='0.3rem'>
                  {error && error}
                </Text>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              loadingText='Submitting'
              size='md'
              mr='0.7rem'
              fontWeight='500'
              bg={'orange.500'}
              color={'white'}
              _hover={{
                bg: 'orange.600',
              }}
              onClick={handleSubmit}
            >
              {loading ? (
                <Box className='spinner-border text-light' role='status'>
                  <Box as='span' className='sr-only'>
                    Loading...
                  </Box>
                </Box>
              ) : (
                'Submit'
              )}
            </Button>
            <Button
              variant='ghost'
              onClick={() => {
                onClose();
                setValue('');
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  return (
    <>
      <Box
        position={{ md: 'relative' }}
        h={{ sm: '100vh', md: '80vh' }}
        shadow={{ base: 'none', md: 'md' }}
        bg='white'
        _dark={{ bg: 'gray.800' }}
        w='15rem'
        {...props}
      >
        <Flex
          direction='column'
          as='nav'
          fontSize='sm'
          color='gray.600'
          aria-label='Main Navigation'
          px='4'
          pl='6'
          py='6'
        >
          <Flex
            onClick={() => {
              sidebar.onClose();
            }}
            fontWeight='600'
            fontSize={{ base: '1rem', md: '1rem' }}
            justifyContent='space-between'
            alignItems='center'
          >
            <Box>
              <i className='fa-solid fa-list'></i> &nbsp;My Lists
            </Box>
            <Box pr='1rem' onClick={onOpen} cursor='pointer'>
              <i className='fa-solid fa-circle-plus fa-2x'></i>
            </Box>
          </Flex>
          <Flex pl='3' py='2' flexDir='column'>
            {list &&
              list.length > 0 &&
              list.map((l: { name: any }, i: any) => (
                <Text
                  cursor='pointer'
                  color={activeNav === l.name ? 'orange.500' : ''}
                  fontSize={{ base: '0.9rem', md: '0.95rem' }}
                  py='0.1rem'
                  onClick={() => setActiveNav(l.name)}
                  textTransform='capitalize'
                >
                  <i className='fa-solid fa-caret-right'></i>&nbsp;{l.name}
                </Text>
              ))}
          </Flex>
        </Flex>
        <Box pl='6' px='4' py='4' w='full' position='absolute' bottom='0'>
          <Button
            w='full'
            fontWeight='600'
            fontSize='0.87rem'
            onClick={handleLogout}
            mt='5rem'
          >
            <i className='fa-solid fa-right-from-bracket'></i> &nbsp;Sign out
          </Button>
        </Box>
        {CreatelistModal}
      </Box>
    </>
  );
};

export default Sidebar;
