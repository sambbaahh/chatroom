import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';

export default function LoginForm() {
  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },

    // validate: {
    //   username: (value) =>
    //     value.length < 2 ? 'Username can not be empty' : null,
    //   password: (value) =>
    //     value.length < 1 ? 'Password can not be empty' : null,
    // },
  });

  return (
    <Paper withBorder shadow="md" py={50} px={100} radius="md">
      <form onSubmit={form.onSubmit(console.log)}>
        <TextInput
          label="Username"
          placeholder="Your username"
          required
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...form.getInputProps('password')}
        />
        <Button fullWidth mt="xl" type="submit">
          Log in
        </Button>
        <Text c="dimmed" size="sm" ta="center" mt={10}>
          Do not have an account yet?{' '}
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate('/register')}
          >
            Create account
          </Anchor>
        </Text>
      </form>
    </Paper>
  );
}
