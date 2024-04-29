import { useState } from 'react';
import { Box, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { getHotkeyHandler } from '@mantine/hooks';

import classes from './MessageInput.module.css';

interface Props {
  handleSendMessage: (content: string) => void;
}

export default function MessageInput({ handleSendMessage }: Props) {
  const [content, setContent] = useState('');

  return (
    <Box className={classes.container}>
      <TextInput
        classNames={{ input: classes.input }}
        placeholder="Send message..."
        value={content}
        onChange={(event) => setContent(event.currentTarget.value)}
        rightSection={
          <IconSend
            className={classes.iconButton}
            onClick={() => {
              handleSendMessage(content);
              setContent('');
            }}
          ></IconSend>
        }
        onKeyDown={getHotkeyHandler([
          [
            'Enter',
            () => {
              handleSendMessage(content);
              setContent('');
            },
          ],
        ])}
      />
    </Box>
  );
}
