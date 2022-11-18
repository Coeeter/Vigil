import { Box } from '@chakra-ui/react';
import React from 'react';

export default function FormBox({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Box
      border="1px"
      borderRadius={'lg'}
      borderColor="grey"
      p={5}
      w="100%"
    >
      {children}
    </Box>
  );
}
