import {
  Flex,
  Box,
  Stack,
  Text,
  Input,
  Heading,
  useColorModeValue,
  FormControl,
  Button,
  FormLabel,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { authenticate, login } from '../actions/auth';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Context';
import { message } from 'antd';

interface UserInfo {
  username: string;
  password: string;
}

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [values, setValues] = useState<UserInfo | null>({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { username, password } = values;

  const handleChange = (name: string) => (e: { target: { value: string } }) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await login({
        username: username,
        password: password,
      });
      setLoading(true);
      if (res.data) {
        authenticate(res.data);
        setTimeout(() => {
          setValues({
            username: '',
            password: '',
          });
          setUser(res.data);
          navigate('/');
        }, 2000);
      }
    } catch (error: any) {
      message.error(error.response.data, 4);
      setLoading(false);
    }
  };

  return (
    <>
      <Flex align={'center'} justify={'center'} mt='2rem'>
        <Stack
          spacing={8}
          mx={'auto'}
          maxW={'lg'}
          py={12}
          px={4}
          w={{ sm: 'full', md: '55vh' }}
        >
          <Stack align={'center'}>
            <Heading fontSize={'3xl'} color={'orange.500'}>
              Login to your Account
            </Heading>
            <Text fontSize={'1xl'} color={'gray.600'} align={'center'}>
              Login to view and manage your book list
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4} color='gray.600'>
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  value={username}
                  onChange={handleChange('username')}
                  focusBorderColor='orange.500'
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={password}
                  onChange={handleChange('password')}
                  focusBorderColor='orange.500'
                />
              </FormControl>
              <Stack spacing={10} onClick={handleSubmit}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  fontWeight='500'
                  bg={'orange.500'}
                  color={'white'}
                  _hover={{
                    bg: 'orange.600',
                  }}
                >
                  {loading ? (
                    <div className='spinner-border text-light' role='status'>
                      <span className='sr-only'>Loading...</span>
                    </div>
                  ) : (
                    'Login'
                  )}
                </Button>
              </Stack>
              <Box textAlign='center' fontSize='0.95rem' pt='0.5rem'>
                Don't have an account?{' '}
                <Link to='/register'>
                  {' '}
                  <Box
                    as='span'
                    color='orange.500'
                    _hover={{ color: 'orange.600' }}
                  >
                    Register
                  </Box>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
