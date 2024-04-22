import {
  Card,
  Flex,
  Text,
  rem,
  Box,
  Container,
  Button,
  TextInput,
  Avatar,
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

const messages = [
  {
    username: 'sami',
    message: 'Ensimmäinen viesti!',
    timestamp: '2024-04-22T12:00:00Z',
  },
  {
    username: 'iida',
    message: 'Toinen viesti.',
    timestamp: '2024-04-22T12:05:00Z',
  },
  {
    username: 'sami',
    message: 'Ensimmäinen viesti!',
    timestamp: '2024-04-22T12:00:00Z',
  },
  {
    username: 'sami',
    message: 'Ensimmäinen viesti!',
    timestamp: '2024-04-22T12:00:00Z',
  },
  {
    username: 'hiauu',
    message: 'Kolmas viesti tässä.',
    timestamp: '2024-04-22T12:10:00Z',
  },
  {
    username: 'iida',
    message: 'Toinen viesti.',
    timestamp: '2024-04-22T12:05:00Z',
  },
  {
    username: 'iida',
    message: 'Toinen viesti.',
    timestamp: '2024-04-22T12:05:00Z',
  },
  {
    username: 'hiauu',
    message: 'Kolmas viesti tässä.',
    timestamp: '2024-04-22T12:10:00Z',
  },
  {
    username: 'iida',
    message: 'Toinen viesti.',
    timestamp: '2024-04-22T12:05:00Z',
  },
  {
    username: 'iida',
    message: 'Toinen viesti.',
    timestamp: '2024-04-22T12:05:00Z',
  },
  {
    username: 'hiauu',
    message: 'Kolmas viesti tässä.',
    timestamp: '2024-04-22T12:10:00Z',
  },
];

function ChatChat({ roomName }) {
  const me = 'sami';

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
      <Box
        style={{
          height: '100%',
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((message, index, allMessages) => (
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            {message.username !== me &&
              index < allMessages.length &&
              allMessages[index - 1].username !== message.username && (
                <Avatar>{message.username.charAt(0)}</Avatar>
              )}
            <Box
              style={{
                marginLeft: message.username === me ? 'auto' : '0px',
                alignItems: message.username === me ? 'end' : 'start',
                backgroundColor: 'lightgray',
                marginBlock: '0.5rem',
                borderRadius: '1rem',
                padding: '1rem',
                width: 'fit-content',
                maxWidth: '75%',
              }}
            >
              <Text variant="h1">{message.message}</Text>
            </Box>
          </Box>
        ))}
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
