import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FormBox from './FormBox';

export default function CopyableInput({
  label,
  textToBeCopied,
}: {
  label: string;
  textToBeCopied: string;
}) {
  const [showToolTip, setShowToolTip] = useState(false);
  const { value, setValue, onCopy, hasCopied } = useClipboard('', {
    timeout: 60000,
  });

  useEffect(() => {
    setValue(textToBeCopied);
  }, [textToBeCopied]);

  useEffect(() => {
    setShowToolTip(hasCopied);
  }, [hasCopied]);

  return (
    <FormBox>
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <InputGroup>
          <Input value={value} readOnly={true} />
          <InputRightAddon p={0} overflow="hidden">
            <Tooltip
              hasArrow
              label={hasCopied ? 'Copied' : 'Copy Device Id'}
              bg="purple.400"
              color="white"
              placement="end"
              isOpen={showToolTip}
            >
              <Button w="100%" borderRadius={0} onClick={onCopy}>
                {hasCopied ? <CheckIcon color="green.400" /> : <CopyIcon />}
              </Button>
            </Tooltip>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
    </FormBox>
  );
}
