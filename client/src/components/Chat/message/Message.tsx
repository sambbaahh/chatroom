import { Text, Box, Avatar } from '@mantine/core';

import classes from './Message.module.css';

interface Props {
  message: object;
  index: number;
  allMessages: Array<object>;
}

export default function Message({ message, index, allMessages }: Props) {
  const me = 'sami';

  return (
    <Box className={classes.container}>
      <Box className={classes.iconWrapper}>
        {message.username !== me &&
          index < allMessages.length &&
          allMessages[index - 1].username !== message.username && (
            <Avatar>{message.username.charAt(0)}</Avatar>
          )}
      </Box>
      <Box
        className={
          message.username === me
            ? classes.messageWrapperSended
            : classes.messageWrapperReceived
        }
        style={{}}
      >
        <Text variant="h1">{message.content}</Text>
      </Box>
    </Box>
  );
}
