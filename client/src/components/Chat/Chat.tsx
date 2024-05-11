import {
  Text,
  Box,
  ActionIcon,
  ScrollArea,
  Menu,
  Button,
  Group,
  Avatar,
} from '@mantine/core';
import {
  IconMessages,
  IconLayoutSidebarLeftCollapse,
  IconX,
  IconLayoutSidebarRightCollapse,
  IconUsers,
} from '@tabler/icons-react';

import classes from './Chat.module.css';
import Message from './message/Message';
import MessageInput from './message-input/MessageInput';
import Subheader from '../subheader/Subheader';
import { Message as MessageInterface, Room } from '../../interfaces';
import { useEffect, useRef } from 'react';

type Props = {
  areRoomsHidden: boolean;
  handleCollapseRooms: () => void;
  currentRoom: Room | undefined;
  messages: MessageInterface[];
  leaveRoom: () => void;
  sendMessage: (content: string) => void;
  isMobileWidth: boolean;
};

export default function Chat({
  areRoomsHidden,
  handleCollapseRooms,
  currentRoom,
  messages,
  leaveRoom,
  sendMessage,
  isMobileWidth,
}: Props) {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollIntoView();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  const handleDisconnectChat = () => {
    if (areRoomsHidden) {
      handleCollapseRooms();
    }
    leaveRoom();
  };

  if (!currentRoom) {
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
        <ActionIcon
          onClick={handleCollapseRooms}
          variant="default"
          disabled={isMobileWidth}
        >
          {areRoomsHidden ? (
            <IconLayoutSidebarRightCollapse className={classes.icon} />
          ) : (
            <IconLayoutSidebarLeftCollapse className={classes.icon} />
          )}
        </ActionIcon>
        <Menu>
          <Menu.Target>
            <Button size="compact-md" variant="default">
              <Group className={classes.chatTitleGroup}>
                <Text className={classes.chatTitleText}>
                  {currentRoom.name}
                </Text>
                <Text className={classes.chatTitleText}>/</Text>
                <Box className={classes.userCountContainer}>
                  <Text className={classes.chatTitleText}>
                    {currentRoom.users.length}
                  </Text>
                  <IconUsers className={classes.smallIcon} />
                </Box>
              </Group>
            </Button>
          </Menu.Target>
          <Menu.Dropdown className={classes.userDropdown}>
            <Menu.Label>Users:</Menu.Label>
            {currentRoom.users.map((user, index) => (
              <Menu.Item
                key={index}
                className={classes.menuItem}
                leftSection={<Avatar size="sm" />}
              >
                <Text>{user}</Text>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
        <ActionIcon onClick={handleDisconnectChat} variant="default">
          <IconX className={classes.iconButton} />
        </ActionIcon>
      </Subheader>
      <ScrollArea
        type="hover"
        offsetScrollbars
        scrollbarSize={2}
        scrollHideDelay={0}
      >
        <Box className={classes.messagesContainer}>
          {messages.map((message, index, allMessages) => (
            <Message
              chatRef={chatRef}
              message={message}
              allMessages={allMessages}
              index={index}
              key={index}
            />
          ))}
        </Box>
      </ScrollArea>
      <MessageInput handleSendMessage={handleSendMessage} />
    </Box>
  );
}
