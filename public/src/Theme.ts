import { Theme, theme as baseTheme } from '@chakra-ui/react';

const theme: Theme = {
  ...baseTheme,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
};

export default theme;
