import { Title, Container, Box } from '@mantine/core';
import { IconMessages } from '@tabler/icons-react';
import LoginForm from '../../components/auth/LoginForm';

import classes from './Auth.module.css';

export default function Login() {
  return (
    <Container className={classes.container}>
      <Box className={classes.titleContainer}>
        <IconMessages className={classes.titleImage} />
        <Title className={classes.titleText}>Welcome back to ChatRoom!</Title>
      </Box>
      <LoginForm />
    </Container>
  );
}
