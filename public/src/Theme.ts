import { Theme, theme as baseTheme, extendTheme } from '@chakra-ui/react';

const theme: Theme = {
  ...baseTheme,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
};

export default theme;
