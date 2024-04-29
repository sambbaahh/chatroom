import { useState } from 'react';
import { Box, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { getHotkeyHandler } from '@mantine/hooks';

import classes from './MessageInput.module.css';

export default function MessageInput({ handleSendMessage }) {
  const [content, setContent] = useState('');

  return (
    <Box className={classes.container}>
      <TextInput
        classNames={{ input: classes.input }}
        placeholder="Send message..."
        onChange={(event) => setContent(event.currentTarget.value)}
        rightSection={
          <IconSend
            className={classes.iconButton}
            onClick={() => handleSendMessage(content)}
          ></IconSend>
        }
        onKeyDown={getHotkeyHandler([
          ['Enter', () => handleSendMessage(content)],
        ])}
      />
    </Box>
  );
}
