import { Box, Button, Card, Text } from '@mantine/core';
import { IconArrowRight, IconPlus } from '@tabler/icons-react';

import classes from './Rooms.module.css';
import Subheader from '../subheader/Subheader';
import NewRoom from '../new-room-modal/NewRoom';
import { useState } from 'react';

export default function Rooms({ rooms }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleJoin = () => {};

  const handleModalState = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Box className={classes.container}>
      <NewRoom open={isModalOpen} handleModalState={handleModalState} />
      <Subheader>
        <Text>Available Rooms:</Text>
        <Button
          rightSection={<IconPlus />}
          variant="default"
          size="xs"
          onClick={handleModalState}
        >
          New Room
        </Button>
      </Subheader>
      <Box className={classes.roomsContainer}>
        {rooms.map((room) => (
          <Card key={room.id} className={classes.card} withBorder>
            <Text>{room.name}</Text>
            <Button
              rightSection={<IconArrowRight />}
              onClick={() => handleJoin()}
              size="sm"
              variant="light"
            >
              {' '}
              Join{' '}
            </Button>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
