import { Title, Container, Box, rem } from '@mantine/core';
import { IconMessages } from '@tabler/icons-react';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <Container
      size={'sm'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <IconMessages
          style={{ width: rem(80), height: rem(80), margin: '0 auto' }}
          stroke={1}
        />
        <Title ta="center" mb={10}>
          Welcome back to ChatRoom!
        </Title>
      </Box>
      <LoginForm />
    </Container>
  );
}
