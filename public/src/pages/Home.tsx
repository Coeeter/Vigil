import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CopyableInput from '../components/CopyableInput';
import FormBox from '../components/FormBox';
import RangeInput, { RangeInputProps } from '../components/RangeInput';
import { ClientEvent } from '../events/ClientEvent';
import useInterval from '../hooks/useInterval';
import fetch from '../utils/fetch';

export default function Home() {
  const [dataInStorage, setDataInStorage] = useState<{
    bpm: number;
    temp: number;
    hasFell: boolean;
  }>({ bpm: 75, temp: 36, hasFell: false });
  const [token, setToken] = useState('');
  const [bpm, setBpm] = useState(dataInStorage.bpm);
  const [temp, setTemp] = useState(dataInStorage.temp);
  const [hasFell, setHasFell] = useState(dataInStorage.hasFell);
  const [notSaved, setNotSaved] = useState(false);
  const navigate = useNavigate();

  const inputs: RangeInputProps[] = [
    {
      label: 'Patients BPM',
      helperText: 'To replicate the heart rate in beats per minute (BPM)',
      defaultValue: bpm,
      min: 20,
      max: 210,
      units: 'BPM',
      onValueChange: setBpm,
    },
    {
      label: 'Patients Temperature',
      helperText: 'To replicate the temperature in degrees celcius (°C)',
      defaultValue: temp,
      min: 34,
      max: 40,
      units: '°C',
      onValueChange: setTemp,
    },
  ];

  const saveConfig = () => {
    const data = {
      bpm,
      temp,
      hasFell,
    };
    localStorage.setItem('data', JSON.stringify(data));
    setDataInStorage(data);
  };

  const uploadData = () => {
    fetch(
      ClientEvent.DATA_COLLECTED,
      token,
      dataInStorage.bpm,
      dataInStorage.temp,
      new Date(Date.now()),
      dataInStorage.hasFell
    );
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/register-user');
    setToken(token);
    const data = localStorage.getItem('data');
    if (data) {
      const obj = JSON.parse(data);
      setDataInStorage(obj);
      setBpm(obj.bpm);
      setTemp(obj.temp);
      setHasFell(obj.hasFell);
    }
  }, []);

  useEffect(() => {
    if (!dataInStorage) {
      if (bpm != 75 || temp != 36 || hasFell == false) {
        setNotSaved(true);
      }
      return setNotSaved(false);
    }
    if (
      dataInStorage.bpm != bpm ||
      dataInStorage.hasFell != hasFell ||
      dataInStorage.temp != temp
    )
      return setNotSaved(true);
    setNotSaved(false);
  }, [bpm, temp, hasFell, dataInStorage]);

  useInterval(
    () => {
      uploadData();
    },
    10000,
    [dataInStorage, token]
  );

  return (
    <Box>
      <Box as="nav" p={5} bg="purple.600">
        <HStack justifyContent="space-between">
          <Heading size="lg">Vigil</Heading>
          <Button
            bg="transparent"
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('data');
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
            saveConfig();
          }}
        >
          <CopyableInput
            label="Device id"
            textToBeCopied={token}
            helperText="The device id and the data below will be sent every 15 seconds"
          />
          {inputs.map((item, index) => (
            <RangeInput key={index} {...item} />
          ))}
          <FormBox>
            <Checkbox
              colorScheme="purple"
              isChecked={hasFell}
              onChange={e => setHasFell(e.target.checked)}
            >
              Has fell down?
            </Checkbox>
          </FormBox>
          <HStack w="100%">
            <Button
              flexGrow="1"
              variant="outline"
              disabled={!notSaved}
              onClick={() => {
                setBpm(dataInStorage.bpm);
                setTemp(dataInStorage.temp);
                setHasFell(dataInStorage.hasFell);
              }}
            >
              Revert
            </Button>
            <Button
              type="submit"
              bg="purple.600"
              flexGrow="1"
              _hover={{ bg: 'purple.500' }}
              _active={{ bg: 'purple.700' }}
            >
              Save
            </Button>
          </HStack>
          {notSaved ? (
            <Alert status="warning">
              <AlertIcon />
              <AlertTitle>Some changes have not been saved</AlertTitle>
            </Alert>
          ) : null}
        </VStack>
      </VStack>
    </Box>
  );
}
