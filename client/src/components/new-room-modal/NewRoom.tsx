import { useState } from 'react';
import { Modal, Button, TextInput, Box } from '@mantine/core';

import classes from './NewRoom.module.css';

interface Props {
  open: boolean;
  handleModalState: () => void;
  handleCreateRoom: (name: string) => void;
}

export default function NewRoom({
  open,
  handleModalState,
  handleCreateRoom,
}: Props) {
  //setup form later if more inputs are needed
  const [name, setName] = useState<string>('');

  return (
    <Modal
      opened={open}
      onClose={handleModalState}
      title="Create New Room"
      centered
    >
      <TextInput
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Box className={classes.buttonContainer}>
        <Button
          size="xs"
          variant="light"
          onClick={() => handleCreateRoom(name)}
        >
          {' '}
          Create{' '}
        </Button>
      </Box>
    </Modal>
  );
}
