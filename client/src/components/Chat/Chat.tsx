import { Text, Box, Container, Button } from '@mantine/core';
import { IconMessages } from '@tabler/icons-react';

import classes from './Chat.module.css';
import Message from './message/Message';
import MessageInput from './message-input/MessageInput';
import Subheader from '../subheader/Subheader';

const messages = [
  {
    username: 'sami',
    content: 'Ensimmäinen viesti!',
    timestamp: '2024-04-22T12:00:00Z',
  },
  {
    username: 'iida',
    content: 'Toinen viesti.',
    timestamp: '2024-04-22T12:05:00Z',
  },
  {
    username: 'sami',
    content: 'Ensimmäinen viesti!',
    timestamp: '2024-04-22T12:00:00Z',
  },
  {
    username: 'sami',
    content: 'Ensimmäinen viesti!',
    timestamp: '2024-04-22T12:00:00Z',
  },
  {
    username: 'hiauu',
    content: 'Kolmas viesti tässä.',
    timestamp: '2024-04-22T12:10:00Z',
  },
  {
    username: 'iida',
    content: 'Toinen viesti.',
    timestamp: '2024-04-22T12:05:00Z',
  },
  {
    username: 'iida',
    content: 'Toinen viesti.',
    timestamp: '2024-04-22T12:05:00Z',
  },
  {
    username: 'hiauu',
    content: 'Kolmas viesti tässä.',
    timestamp: '2024-04-22T12:10:00Z',
  },
  {
    username: 'iida',
    content: 'Toinen viesti.',
    timestamp: '2024-04-22T12:05:00Z',
  },
  {
    username: 'iida',
    content: 'Toinen viesti.',
    timestamp: '2024-04-22T12:05:00Z',
  },
  {
    username: 'hiauu',
    content: 'Kolmas viesti tässä.',
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
      <Subheader>
        <Button> close </Button>
        <Text> Huone </Text>
        <Button> exit </Button>
      </Subheader>
      <Box className={classes.messagesContainer}>
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
