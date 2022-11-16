import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Radio,
  RadioGroup,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ClientEvent } from '../events/ClientEvent';
import useSocket from '../hooks/useSocket';

type FormValues = {
  name: string;
  gender: 'male' | 'female';
  birthday: Date;
  contacts: {
    email: string;
  }[];
};

export default function RegisterUser() {
  const socket = useSocket();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const { fields, append, remove } = useFieldArray({
    name: 'contacts',
    control,
  });

  const onSubmit: SubmitHandler<FormValues> = ({
    name,
    gender,
    birthday,
    contacts,
  }) => {
    const time = new Date(birthday).getTime();
    const emails = [...new Set(contacts.map(item => item.email))];
    socket?.emit(
      ClientEvent.CREATE_USER,
      name,
      gender,
      time,
      emails,
      (id: string) => {
        localStorage.setItem('token', id);
        navigate('/', { replace: true });
      }
    );
  };

  useEffect(() => {
    if (fields.length == 0) append({ email: '' });
  }, []);

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={5}
      maxW={{ base: 'xs', md: 'md', lg: 'lg' }}
      mx="auto"
      my={10}
    >
      <FormControl isInvalid={errors.name != null}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter name"
          variant="filled"
          {...register('name', { required: 'Name is required' })}
        />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl as="fieldset">
        <FormLabel as="legend">Gender</FormLabel>
        <RadioGroup defaultValue="male">
          <HStack spacing="24px">
            <Radio value="male" {...register('gender')}>
              Male
            </Radio>
            <Radio value="female" {...register('gender')}>
              Female
            </Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <FormControl isInvalid={errors.birthday != null}>
        <FormLabel>Birthday</FormLabel>
        <Input
          type="date"
          variant="filled"
          {...register('birthday', { required: 'Birthday is required' })}
        />
        <FormErrorMessage>{errors.birthday?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.contacts?.message != null}>
        <FormLabel>Contacts</FormLabel>
        <VStack alignItems="start" spacing="4" mt={4} w="100%">
          {fields.map((field, index) => (
            <FormControl
              key={field.id}
              isInvalid={errors.contacts?.[index]?.email != null}
            >
              <VStack w="100%" align="start">
                <InputGroup>
                  <Input
                    type="email"
                    variant="filled"
                    placeholder="Enter contact"
                    {...register(`contacts.${index}.email` as const, {
                      required: 'Contacts is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                  />
                  {index == 0 ? null : (
                    <InputRightAddon p={0} overflow="hidden">
                      <Button
                        onClick={() => remove(index)}
                        w="100%"
                        borderRadius={0}
                      >
                        Remove
                      </Button>
                    </InputRightAddon>
                  )}
                </InputGroup>
                <FormErrorMessage>
                  {errors.contacts?.[index]?.email?.message}
                </FormErrorMessage>
              </VStack>
            </FormControl>
          ))}
          <Button onClick={() => append({ email: '' })}>Add Contact</Button>
        </VStack>
        <FormErrorMessage>{errors.contacts?.message}</FormErrorMessage>
      </FormControl>
      <Button
        w="100%"
        my={5}
        type="submit"
        bg="purple.600"
        _hover={{ bg: 'purple.500' }}
        _active={{ bg: 'purple.700' }}
      >
        Save
      </Button>
    </VStack>
  );
}
