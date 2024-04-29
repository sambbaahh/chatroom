import { Text, Box, Avatar, Card } from '@mantine/core';

import classes from './Message.module.css';
import { Message as MessageInterface } from '../../../interfaces';

interface Props {
  message: MessageInterface;
  index: number;
  allMessages: MessageInterface[];
}

export default function Message({ message, index, allMessages }: Props) {
  const me = 'ME';

  const showIconAndName = (): boolean =>
    message.username !== me &&
    (index === 0 || allMessages[index - 1].username !== message.username);

  const showMarginOnSendedMessage = (): boolean =>
    message.username === me &&
    (index === 0 || allMessages[index - 1].username !== message.username);

  return (
    <Box className={classes.container}>
      {showIconAndName() && (
        <Box className={classes.userInformationContainer}>
          <Box className={classes.iconWrapper}>
            <Avatar>{message.username.charAt(0)}</Avatar>
          </Box>
          <Text className={classes.usernameText}>{message.username}</Text>{' '}
        </Box>
      )}
      {showMarginOnSendedMessage() && (
        <Box className={classes.userInformationContainer}></Box>
      )}
      <Card
        withBorder
        className={
          message.username === me
            ? classes.messageWrapperSended
            : classes.messageWrapperReceived
        }
        style={{}}
      >
        <Text>{message.content}</Text>
      </Card>
    </Box>
  );
}
