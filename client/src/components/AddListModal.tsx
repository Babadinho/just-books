import React, { useState } from 'react';
import {
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
  Text,
  useDisclosure,
  Button,
  Box,
} from '@chakra-ui/react';

const AddListModal = ({
  value,
  setValue,
  loading,
  handleSubmit,
  isOpen,
  onClose,
  error,
  setError,
}: any) => {
  return (
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
};

export default AddListModal;
