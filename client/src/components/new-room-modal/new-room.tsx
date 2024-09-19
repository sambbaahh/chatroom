import { Modal, Button, TextInput, Box } from '@mantine/core';

import classes from './new-room.module.css';
import { useForm } from '@mantine/form';

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
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { name: '' },
    validate: {
      name: (value) => {
        if (value.length < 3) {
          return 'Name must be at least 3 characters long';
        }
        if (value.length > 20) {
          return 'Name must be less than 15 characters long';
        }
      },
    },
  });

  return (
    <Modal
      opened={open}
      onClose={handleModalState}
      title="Create New Room"
      centered
    >
      <form
        className={classes.form}
        onSubmit={form.onSubmit(({ name }) => {
          handleCreateRoom(name);
          form.reset();
        })}
      >
        <TextInput label="Name" {...form.getInputProps('name')} />
        <Box className={classes.buttonContainer}>
          <Button size="xs" variant="light" type="submit">
            {' '}
            Create{' '}
          </Button>
        </Box>
      </form>
    </Modal>
  );
}
