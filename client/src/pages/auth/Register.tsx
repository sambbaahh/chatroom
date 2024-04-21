import { Title, Container, Box } from '@mantine/core';
import { IconMessages } from '@tabler/icons-react';
import RegisterForm from '../../components/auth/RegisterForm';

import classes from './Auth.module.css';

export default function Register() {
  return (
    <Container className={classes.container}>
      <Box className={classes.titleContainer}>
        <IconMessages className={classes.titleImage} />
        <Title className={classes.titleText}>Create account</Title>
      </Box>
      <RegisterForm />
    </Container>
  );
}
