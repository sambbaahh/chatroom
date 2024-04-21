import { Title, Container, Box, rem } from '@mantine/core';
import { IconMessages } from '@tabler/icons-react';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  return (
    <Container
      size={'sm'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
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
          Create account
        </Title>
      </Box>
      <RegisterForm />
    </Container>
  );
}
