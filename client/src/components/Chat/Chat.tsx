import {
  Card,
  Flex,
  Text,
  rem,
  Box,
  Container,
  Button,
  TextInput,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { IconMessages, IconSend } from '@tabler/icons-react';

import classes from './Chat.module.css';

type Props = {
  roomName: string;
};

export default function Chat({ roomName }: Props) {
  const userInRoom = true;
  return (
    <Container
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {userInRoom ? (
        <ChatChat roomName={'testing'} />
      ) : (
        <Container className={classes.container}>
          <IconMessages
            style={{ width: rem(80), height: rem(80), margin: '0 auto' }}
            stroke={1}
          />
          <Text>Join room to chat with people!</Text>
        </Container>
      )}
    </Container>
  );
}

function ChatChat({ roomName }) {
  return (
    <>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button> close </Button>
        <Text>{roomName}</Text>
        <Button> exit </Button>
      </Box>
      <Box style={{ marginTop: 'auto', marginBottom: '0.5rem' }}>
        <TextInput
          radius="xl"
          size="md"
          placeholder="Send message..."
          rightSectionWidth={42}
          rightSection={
            <IconSend
              size={32}
              radius="xl"
              onClick={() => console.log('pöö')}
            ></IconSend>
          }
          onKeyDown={getHotkeyHandler([['Enter', () => console.log('pöö 2')]])}
        />
      </Box>
    </>
  );
}
