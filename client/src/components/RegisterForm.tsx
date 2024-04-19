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

export default function RegisterForm() {
  const navigate = useNavigate();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },

    validate: {
      username: (value) =>
        value.length < 4
          ? 'Username must be at least three characters long'
          : null,
      password: (value) =>
        value.length < 6
          ? 'Password must be at least six characters long'
          : null,
      passwordConfirmation: (value, { password }) =>
        value !== password ? 'Passwords do not match' : null,
    },
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
        <PasswordInput
          label="Confirm password"
          placeholder="Retype your password"
          required
          mt="md"
          {...form.getInputProps('passwordConfirmation')}
        />
        <Button fullWidth mt="xl" type="submit">
          Create account
        </Button>
        <Text c="dimmed" size="sm" ta="center" mt={10}>
          Already registered?{' '}
          <Anchor
            size="sm"
            component="button"
            onClick={() => navigate('/login')}
          >
            Log in
          </Anchor>
        </Text>
      </form>
    </Paper>
  );
}
