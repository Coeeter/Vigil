import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CopyableInput from '../components/CopyableInput';
import FormBox from '../components/FormBox';
import RangeInput, { RangeInputProps } from '../components/RangeInput';

export default function Home() {
  const [token, setToken] = useState('');
  const [bpm, setBpm] = useState<number>(0);
  const [temp, setTemp] = useState<number>(0);
  const navigate = useNavigate();

  const inputs: RangeInputProps[] = [
    {
      label: 'Patients BPM',
      helperText: 'To replicate the heart rate in beats per minute (BPM)',
      min: 50,
      max: 100,
      units: 'BPM',
      onValueChange: setTemp,
    },
    {
      label: 'Patients Temperature',
      helperText: 'To replicate the temperature in degrees celcius (°C)',
      min: 20,
      max: 50,
      units: '°C',
      onValueChange: setBpm,
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/register-user');
    setToken(token);
  }, []);

  return (
    <Box>
      <Box as="nav" p={5} bg="purple.600">
        <HStack justifyContent="space-between">
          <Heading size="lg">Vigil</Heading>
          <Button
            bg="transparent"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/register-user');
            }}
          >
            Log Out
          </Button>
        </HStack>
      </Box>
      <VStack as="main" p={5} alignItems="center">
        <VStack
          as="form"
          w={{ base: 'xs', md: 'md', lg: 'lg' }}
          spacing={5}
          alignItems="start"
          onSubmit={e => {
            e.preventDefault();
            console.log(e.target);
          }}
        >
          <CopyableInput label="Device id" textToBeCopied={token} />
          {inputs.map((item, index) => (
            <RangeInput key={index} {...item} />
          ))}
          <FormBox>
            <Checkbox colorScheme="purple">Has fell down?</Checkbox>
          </FormBox>
          <Button
            type="submit"
            bg="purple.600"
            _hover={{ bg: 'purple.500' }}
            _active={{ bg: 'purple.700' }}
            w="100%"
          >
            Submit
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
}
