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
import { useAuth } from '../../hooks/useAuth';
import { User } from '../../interfaces';

import classes from './AuthComponents.module.css';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();

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
      passwordConfirmation: (value, { password }) => {
        if (password.length < 6) {
          return 'Password must be at least six characters long';
        } else if (value !== password) {
          return 'Passwords do not match';
        } else {
          return null;
        }
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const registerationData: User = {
        username: values.username,
        password: values.password,
      };
      await register(registerationData);
    } catch (err) {
      console.log(err);
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
          <PasswordInput
            className={classes.input}
            label="Confirm password"
            placeholder="Retype your password"
            required
            {...form.getInputProps('passwordConfirmation')}
          />
          <Button className={classes.mainButton} fullWidth type="submit">
            Create account
          </Button>
          <Text className={classes.secondaryText}>
            Already registered?{' '}
            <Anchor
              className={classes.secondaryButton}
              component="button"
              type="button"
              onClick={() => navigate('/login')}
            >
              Log in
            </Anchor>
          </Text>
        </form>
      </Paper>
    </Container>
  );
}
