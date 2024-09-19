import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Button,
  Container,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useAuth } from '../../hooks/use-auth';

import classes from './auth-components.module.css';

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
    try {
      await login(values);
    } catch (err) {
      console.log('error in login form');
    }
  };

  return (
    <Container className={classes.container}>
      <Paper withBorder className={classes.paper}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            className={classes.input}
            label="Username"
            placeholder="Your username"
            required
            {...form.getInputProps('username')}
          />
          <PasswordInput
            className={classes.input}
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps('password')}
          />
          <Button className={classes.mainButton} fullWidth type="submit">
            Log in
          </Button>
          <Text className={classes.secondaryText}>
            Do not have an account yet?{' '}
            <Anchor
              className={classes.secondaryButton}
              component="button"
              type="button"
              onClick={() => navigate('/register')}
            >
              Create account
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  );
}
