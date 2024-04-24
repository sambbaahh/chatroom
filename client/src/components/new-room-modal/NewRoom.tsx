import { Modal, Button, TextInput, Box } from '@mantine/core';

import classes from './NewRoom.module.css';

interface Props {
  open: boolean;
  handleModalState: () => void;
}

export default function NewRoom({ open, handleModalState }: Props) {
  return (
    <Modal
      opened={open}
      onClose={handleModalState}
      title="Create New Room"
      centered
    >
      <TextInput label="Name" />
      <Box className={classes.buttonContainer}>
        <Button size="xs" variant="light">
          {' '}
          Create{' '}
        </Button>
      </Box>
    </Modal>
  );
}
