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
  defaultValue: number;
  min: number;
  max: number;
  units: string;
  onValueChange: (value: number) => void;
}

export default function RangeInput({
  label,
  helperText,
  defaultValue,
  min,
  max,
  units,
  onValueChange,
}: RangeInputProps) {
  return (
    <FormBox>
      <FormControl>
        <FormLabel>
          {label}: {defaultValue} {units}
        </FormLabel>
        <HStack w="100%" spacing={5}>
          <Text w={10} textAlign="start">
            {min}
          </Text>
          <Slider
            colorScheme="purple"
            value={defaultValue}
            onChange={onValueChange}
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
