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
import { useAuth } from '../hooks/useAuth';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    login(values);
  };

  return (
    <Paper withBorder shadow="md" py={50} px={100} radius="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
