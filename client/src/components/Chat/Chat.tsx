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
import Message from './message/Message';
import MessageInput from './message-input/MessageInput';

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

type Props = {
  roomName: string;
};

// <Box
// style={{
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
// }}
// >
// <Button> close </Button>
// <Text> Huone </Text>
// <Button> exit </Button>
// </Box>

export default function Chat({ roomName }: Props) {
  const userInRoom = true;

  if (!userInRoom) {
    return (
      <Container className={classes.notInRoomContainer}>
        <IconMessages className={classes.notInRoomIcon} />
        <Text>Join room to chat with people!</Text>
      </Container>
    );
  }

  return (
    <Container className={classes.inRoomContainer}>
      <Box
        style={{
          height: '100%',
          overflow: 'scroll',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((message, index, allMessages) => (
          <Message
            message={message}
            allMessages={allMessages}
            index={index}
            key={index}
          />
        ))}
      </Box>
      <MessageInput />
    </Container>
  );
}
