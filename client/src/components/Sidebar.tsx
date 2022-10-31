import {
  Box,
  Flex,
  ChakraProps,
  OmitCommonProps,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { message } from 'antd';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { isAuthenticated } from '../actions/auth';
import { addList } from '../actions/list';
import AddListModal from './AddListModal';

const Sidebar = (
  { list, activeNav, setActiveNav, sidebar }: any,
  props: JSX.IntrinsicAttributes &
    OmitCommonProps<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      keyof ChakraProps
    > &
    ChakraProps & { as?: 'div' | undefined }
) => {
  const { user, token } = isAuthenticated();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState<any | null>();

  const handleSubmit = async () => {
    try {
      const res = await addList(user._id, { name: value }, token);
      if (res.data) {
        setLoading(true);
        setTimeout(() => {
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

  const handleLogout = () => {
    window.localStorage.removeItem('just-books');
    window.location.reload();
  };

  return (
    <>
      <Box
        position={{ md: 'relative' }}
        h={{ sm: '100vh', md: '80vh' }}
        shadow={{ base: 'none', md: 'md' }}
        bg='white'
        _dark={{ bg: 'gray.800' }}
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
            // onClick={() => {
            //   sidebar.onClose();
            // }}
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
              list.map((l: any, i: any) => (
                <Text
                  key={i}
                  cursor='pointer'
                  color={activeNav === l._id ? 'orange.500' : ''}
                  fontSize={{ base: '0.9rem', md: '0.95rem' }}
                  py='0.2rem'
                  onClick={() => {
                    setActiveNav(l._id);
                    sidebar.onClose();
                  }}
                  textTransform='capitalize'
                  display='flex'
                  alignItems='center'
                >
                  <Text as='span' fontSize='0.6rem'>
                    <i className='fa-solid fa-bookmark'></i>
                  </Text>
                  &nbsp;{l.name}
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
        <AddListModal
          value={value}
          setValue={setValue}
          loading={loading}
          handleSubmit={handleSubmit}
          isOpen={isOpen}
          onClose={onClose}
          error={error}
          setError={setError}
        />
      </Box>
    </>
  );
};

export default Sidebar;
