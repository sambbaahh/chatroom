import { Text, Box, Container, Button } from '@mantine/core';
import {
  IconMessages,
  IconLayoutSidebarLeftCollapse,
  IconX,
} from '@tabler/icons-react';

import classes from './Chat.module.css';
import Message from './message/Message';
import MessageInput from './message-input/MessageInput';
import Subheader from '../subheader/Subheader';
import { useState } from 'react';

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

export default function Chat({ handleCollapseRooms }) {
  const [isUserInRoom, setisUserInRoom] = useState(true);

  const handleDisconnectChat = () => {
    setisUserInRoom(!isUserInRoom);
  };

  if (!isUserInRoom) {
    return (
      <Box className={classes.notInRoomContainer}>
        <IconMessages className={classes.notInRoomIcon} />
        <Text>Join room to chat with people!</Text>
      </Box>
    );
  }

  return (
    <Box className={classes.inRoomContainer}>
      <Subheader>
        <IconLayoutSidebarLeftCollapse
          className={classes.iconButton}
          onClick={handleCollapseRooms}
        />
        <Text> Huone </Text>
        <IconX className={classes.iconButton} onClick={handleDisconnectChat} />
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
    </Box>
  );
}