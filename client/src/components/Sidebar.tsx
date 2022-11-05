import {
  Box,
  Flex,
  ChakraProps,
  OmitCommonProps,
  Text,
  useDisclosure,
  Stack,
  Input,
} from '@chakra-ui/react';
import { message, Popconfirm } from 'antd';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { isAuthenticated } from '../actions/auth';
import { addList, deleteList, editList } from '../actions/list';
import AddListModal from './AddListModal';

const Sidebar = (
  { list, activeNav, setActiveNav, sidebar, setList }: any,
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
  const [value, setValue] = useState<any | null>('');
  const [edit, setEdit] = useState<any | null>('');
  const [editValue, setEditValue] = useState<any | null>('');

  //get default list and store in variable
  const defaultActive = list && list.length > 0 && list[0]._id;

  const handleSubmit = async () => {
    try {
      const res = await addList(user._id, { name: value }, token);
      if (res.data) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          onClose();
          setList(res.data);
          message.success(value + ' added to your list', 4);
          setValue('');
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) setError(error.response.data);
      setLoading(false);
    }
  };

  const handleListEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await editList(
        user._id,
        { listId: edit, name: editValue },
        token
      );

      if (res.data) {
        setList(res.data);
        setEdit('');
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDeleteList = async (listId: any) => {
    try {
      const res = await deleteList(user._id, { listId: listId }, token);

      if (res.data) {
        setList(res.data);
      }
    } catch (error: any) {
      console.log(error);
    }
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
          py='4'
        >
          <Flex
            fontWeight='600'
            fontSize={{ base: '1rem', md: '1.1rem' }}
            justifyContent='space-between'
            alignItems='center'
            flexDir='row'
          >
            <>
              My Lists{' '}
              <Box
                pl='0.5rem'
                onClick={onOpen}
                cursor='pointer'
                fontSize='1.8rem'
              >
                <i className='fa-solid fa-circle-plus'></i>
              </Box>
            </>
          </Flex>
          <Flex py='1' flexDir='column'>
            {list &&
              list.length > 0 &&
              list.map((l: any, i: any) => (
                <Box
                  key={i}
                  color={activeNav === l._id ? 'orange.500' : ''}
                  fontSize={{ base: '0.9rem', md: '0.92rem' }}
                  py='0.2rem'
                  textTransform='capitalize'
                >
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Box display='flex' alignItems='center'>
                      <Text as='span' fontSize='0.6rem'>
                        <i className='fa-solid fa-bookmark'></i>
                      </Text>
                      <Box
                        onClick={() => {
                          setActiveNav(l._id);

                          sidebar.onClose();
                          activeNav !== l._id && setEdit('');
                        }}
                        cursor='pointer'
                        pl='0.4rem'
                      >
                        {edit && activeNav === l._id ? (
                          <Box as='form' onSubmit={handleListEdit}>
                            <Input
                              value={editValue}
                              size='xs'
                              textTransform='capitalize'
                              color='gray.700'
                              width='90%'
                              autoFocus
                              isRequired
                              onChange={(e) => setEditValue(e.target.value)}
                            />
                          </Box>
                        ) : (
                          l.name
                        )}
                      </Box>
                    </Box>

                    <Stack
                      direction={'row'}
                      align='center'
                      cursor={'pointer'}
                      display={activeNav === l._id ? 'flex' : 'none'}
                    >
                      <Text fontSize='0.8rem'>
                        {edit ? (
                          <Box
                            as='span'
                            onClick={handleListEdit}
                            fontSize='1rem'
                          >
                            <i className='fa-solid fa-check'></i>
                          </Box>
                        ) : (
                          <Box
                            as='span'
                            onClick={() => {
                              setEdit(l._id);
                              setEditValue(l.name);
                            }}
                          >
                            <i className='fa-solid fa-pen-to-square'></i>
                          </Box>
                        )}{' '}
                      </Text>

                      <Popconfirm
                        placement='top'
                        title='Delete this list? '
                        onConfirm={() => handleDeleteList(l._id)}
                        okText='Yes'
                        cancelText='No'
                      >
                        <Text
                          fontSize='0.8rem'
                          display={l._id === defaultActive ? 'none' : 'block'}
                        >
                          <i className='fa-solid fa-trash-can'></i>
                        </Text>
                      </Popconfirm>
                    </Stack>
                  </Box>
                </Box>
              ))}
          </Flex>
        </Flex>
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
