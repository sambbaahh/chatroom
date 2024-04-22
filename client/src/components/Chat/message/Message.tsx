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

import classes from './Message.module.css';

interface Props {
  message: object;
  index: number;
  allMessages: Array<object>;
}

export default function Message({ message, index, allMessages }: Props) {
  const me = 'sami';

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <Box
        key={index}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '2rem',
        }}
      >
        {message.username !== me &&
          index < allMessages.length &&
          allMessages[index - 1].username !== message.username && (
            <Avatar>{message.username.charAt(0)}</Avatar>
          )}
      </Box>
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
  );
}
