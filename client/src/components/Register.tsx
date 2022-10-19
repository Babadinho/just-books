import { useState } from 'react';
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

const Register = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirm_password: ''
      });
      
      const { username, password, confirm_password } = values;

      const handleChange = (name: string) => (e: { target: { value: any; }; }) => {
        setValues({ ...values, [name]: e.target.value });
      };
    
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // try {
        //   const { data } = await login({
        //     username: username,
        //     password: password,
        //   });
        //   if (data) {
        //     //Save user and token to LocalSTorage
        //     authenticate(data);
        //     window.location.reload();
        //   }
        // } catch (err) {
        //   console.log(err);
        //   if (err.response.status === 400) message.error(err.response.data, 4);
        // }
      };

  return (
    <>
      <Flex
        minH={'80vh'}
        align={'center'}
        justify={'center'}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'3xl'}>
              Register an Account
            </Heading>
            <Text fontSize={'1xl'} color={'gray.600'} align={'center'}>
              An account lets you add your books to your favourite list.
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id='username'>
                <FormLabel>Username</FormLabel>
                <Input
                  type='text'
                  value={username}
                  onChange={handleChange('username')}
                />
              </FormControl>
              <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={password}
                  onChange={handleChange('password')}
                />
              </FormControl>
              <FormControl id='confirm_password'>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type='password'
                  value={confirm_password}
                  onChange={handleChange('confirm_password')}
                />
              </FormControl>
              <Stack spacing={10} onClick={handleSubmit}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  bg={'orange.500'}
                  color={'white'}
                  _hover={{
                    bg: 'orange.600',
                  }}
                >
                  Register
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default Register