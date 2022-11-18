import {
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FormBox from './FormBox';

export interface RangeInputProps {
  label: string;
  helperText: string;
  min: number;
  max: number;
  units: string;
  onValueChange: (value: number) => void;
}

export default function RangeInput({
  label,
  helperText,
  min,
  max,
  units,
  onValueChange,
}: RangeInputProps) {
  const [value, setValue] = useState((min + max) / 2);

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  return (
    <FormBox>
      <FormControl>
        <FormLabel>
          {label}: {value} {units}
        </FormLabel>
        <HStack w="100%" spacing={5}>
          <Text w={10} textAlign="start">
            {min}
          </Text>
          <Slider
            colorScheme="purple"
            value={value}
            onChange={setValue}
            min={min}
            max={max}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text w={10} textAlign="end">
            {max}
          </Text>
        </HStack>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </FormBox>
  );
}
