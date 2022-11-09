import { useContext, useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { message } from 'antd';
import { authenticate, isAuthenticated } from '../actions/auth';
import { UserContext } from '../context/Context';
import { editUser } from '../actions/user';

interface UserInfo {
  username: string;
  password: string;
  new_password: string;
}

const Settings = () => {
  const { setUser } = useContext(UserContext);
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState<UserInfo | null>({
    username: '',
    password: '',
    new_password: '',
  });
  const [loading, setLoading] = useState(false);

  const { username, password, new_password } = values;

  const handleChange = (name: string) => (e: { target: { value: any } }) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await editUser(
        user._id,
        {
          details: values,
        },
        token
      );
      setLoading(true);
      if (res.data) {
        authenticate(res.data);
        setTimeout(() => {
          setValues({
            ...values,
            username: res.data.username,
            password: '',
            new_password: '',
          });
          message.success('Profile updated successfully', 4);
          setUser(res.data);
          setLoading(false);
        }, 2000);
      }
    } catch (error: any) {
      message.error(error.response.data, 4);
      setLoading(false);
    }
  };

  useEffect(() => {
    setValues({ ...values, username: user.username });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUser]);

  const handleLogout = () => {
    window.localStorage.removeItem('just-books');
    window.location.reload();
  };

  return (
    <>
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={3} w={'75vh'}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={{ base: '1.3rem', md: '2rem' }}
          >
            <Box
              pl='0.4rem'
              cursor='pointer'
              fontSize='1rem'
              color='gray.600'
              onClick={handleLogout}
              mb='1rem'
              textAlign='right'
              className='selectable'
            >
              <i className='fa-solid fa-right-from-bracket'></i> Logout
            </Box>
            <Text
              fontSize={{ base: '1.1rem', md: '1.3rem' }}
              color={'orange.500'}
              align={'center'}
              mb='1.5rem'
            >
              Edit your username or change your password below
            </Text>

            <Stack spacing={4} color='gray.600'>
              <FormControl id='username' isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  value={username}
                  onChange={handleChange('username')}
                  focusBorderColor='orange.500'
                />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={password}
                  onChange={handleChange('password')}
                  focusBorderColor='orange.500'
                />
              </FormControl>
              <FormControl id='confirm_password'>
                <FormLabel>New Password</FormLabel>
                <Input
                  type='password'
                  value={new_password}
                  onChange={handleChange('new_password')}
                  focusBorderColor='orange.500'
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  fontWeight='500'
                  bg={'orange.500'}
                  color={'white'}
                  _hover={{
                    bg: 'orange.600',
                  }}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <div className='spinner-border text-light' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Settings;
