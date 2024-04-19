import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Box,
  rem,
} from '@mantine/core';
import { IconMessages } from '@tabler/icons-react';

export default function Login() {
  return (
    <Container
      size={'50%'}
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
          Welcome back!
        </Title>
      </Box>
      <Paper withBorder shadow="md" p={30} radius="md">
        <TextInput label="Username" placeholder="Your username" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Button fullWidth mt="xl">
          Sign in
        </Button>
        <Text c="dimmed" size="sm" ta="center" mt={10}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
