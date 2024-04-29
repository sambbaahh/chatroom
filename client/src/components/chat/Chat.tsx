import { Text, Box, ActionIcon } from '@mantine/core';
import {
  IconMessages,
  IconLayoutSidebarLeftCollapse,
  IconX,
  IconLayoutSidebarRightCollapse,
} from '@tabler/icons-react';

import classes from './Chat.module.css';
import Message from './message/Message';
import MessageInput from './message-input/MessageInput';
import Subheader from '../subheader/Subheader';
import { useState } from 'react';

type Props = {
  areRoomsHidden: boolean;
  handleCollapseRooms: () => void;
};

export default function Chat({
  areRoomsHidden,
  handleCollapseRooms,
  messages,
  rooms,
  joinRoom,
  leaveRoom,
  sendMessage,
}: Props) {
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
        <ActionIcon onClick={handleCollapseRooms} variant="default">
          {areRoomsHidden ? (
            <IconLayoutSidebarRightCollapse className={classes.icon} />
          ) : (
            <IconLayoutSidebarLeftCollapse className={classes.icon} />
          )}
        </ActionIcon>
        <Text> Huone </Text>
        <ActionIcon onClick={handleDisconnectChat} variant="default">
          <IconX className={classes.iconButton} />
        </ActionIcon>
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
