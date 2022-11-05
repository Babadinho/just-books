import React, { useRef, useState } from 'react';
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
  Button,
  Box,
  Spinner,
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
  const initialRef = useRef(null);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setValue('');
        }}
        initialFocusRef={initialRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='1.1rem' color='gray.700'>
            Create new List
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} color='gray.600'>
              <FormControl>
                <Input
                  ref={initialRef}
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
              mr='0.7rem'
              variant='ghost'
              onClick={() => {
                onClose();
                setValue('');
              }}
            >
              Cancel
            </Button>
            <Button
              loadingText='Submitting'
              fontWeight='500'
              bg={'orange.500'}
              color={'white'}
              _hover={{
                bg: 'orange.600',
              }}
              onClick={handleSubmit}
            >
              {loading ? <Spinner /> : 'Submit'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddListModal;
