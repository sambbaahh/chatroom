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
import { Message as MessageInterface } from '../../interfaces';

type Props = {
  areRoomsHidden: boolean;
  handleCollapseRooms: () => void;
  roomName: string;
  messages: MessageInterface[];
  isUserInRoom: boolean;
  leaveRoom: () => void;
  sendMessage: (content: string) => void;
};

export default function Chat({
  areRoomsHidden,
  handleCollapseRooms,
  roomName,
  messages,
  isUserInRoom,
  leaveRoom,
  sendMessage,
}: Props) {
  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  const handleDisconnectChat = () => {
    leaveRoom();
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
        <Text> {roomName} </Text>
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
      <MessageInput handleSendMessage={handleSendMessage} />
    </Box>
  );
}
