import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { message } from 'antd';
import { authenticate, register } from '../actions/auth';
import { UserContext } from '../context/Context';

const Register = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    _id: '',
    username: '',
    password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);

  const { username, password, confirm_password } = values;

  const handleChange = (name: string) => (e: { target: { value: any } }) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirm_password) {
      return message.error('Password does not match', 4);
    }
    try {
      const res = await register({
        username: username,
        password: password,
      });
      setLoading(true);
      if (res.data) {
        authenticate(res.data);
        setTimeout(() => {
          setValues({
            ...values,
            _id: res.data._id,
            username: res.data.username,
            password: '',
          });
          message.success('Registration successful', 4);
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
      <Flex align={'center'} justify={'center'}>
        <Stack
          spacing={8}
          mx={'auto'}
          maxW={'lg'}
          py={12}
          px={6}
          // w={{ sm: 'lg', md: '60vh' }}
        >
          <Stack align={'center'}>
            <Heading fontSize={'3xl'} color={'orange.500'}>
              Register an Account
            </Heading>
            <Text fontSize={'1xl'} color={'gray.600'} align={'center'}>
              An account lets you add your favourite books to your list
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
              <FormControl id='confirm_password'>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type='password'
                  value={confirm_password}
                  onChange={handleChange('confirm_password')}
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
                    'Register'
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

export default Register;
