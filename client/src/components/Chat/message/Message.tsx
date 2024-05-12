import { Text, Box, Avatar, Card } from '@mantine/core';

import classes from './Message.module.css';
import { Message as MessageInterface } from '../../../interfaces';

interface Props {
  message: MessageInterface;
  index: number;
  allMessages: MessageInterface[];
  chatRef: React.RefObject<HTMLDivElement>;
}

export default function Message({
  chatRef,
  message,
  index,
  allMessages,
}: Props) {
  const me: string = 'ME';
  const admin: string = 'ADMIN';

  const getClassname = (): string => {
    switch (message.username) {
      case me:
        return classes.messageWrapperSended;
      case admin:
        return classes.messageWrapperAdmin;
      default:
        return classes.messageWrapperReceived;
    }
  };

  const notAdminOrMe = (): boolean =>
    message.username !== me && message.username !== admin;

  const showIconAndName = (): boolean =>
    notAdminOrMe() &&
    (index === 0 || allMessages[index - 1].username !== message.username);

  return (
    <Box className={classes.container} ref={chatRef}>
      {showIconAndName() && (
        <Box className={classes.userInformationContainer}>
          <Box className={classes.iconWrapper}>
            <Avatar>{message.username.charAt(0)}</Avatar>
          </Box>
          <Text className={classes.usernameText}>{message.username}</Text>{' '}
        </Box>
      )}
      <Card withBorder={message.username !== admin} className={getClassname()}>
        <Text>{message.content}</Text>
      </Card>
    </Box>
  );
}
