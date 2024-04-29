import { Box, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { getHotkeyHandler } from '@mantine/hooks';

import classes from './MessageInput.module.css';

export default function MessageInput() {
  return (
    <Box className={classes.container}>
      <TextInput
        classNames={{ input: classes.input }}
        placeholder="Send message..."
        rightSection={
          <IconSend
            className={classes.iconButton}
            onClick={() => console.log('pöö')}
          ></IconSend>
        }
        onKeyDown={getHotkeyHandler([['Enter', () => console.log('pöö 2')]])}
      />
    </Box>
  );
}
