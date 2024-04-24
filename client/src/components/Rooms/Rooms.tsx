import { Box, Button, Card, Text } from '@mantine/core';
import { IconArrowRight, IconPlus } from '@tabler/icons-react';

import classes from './Rooms.module.css';
import Subheader from '../subheader/Subheader';
import NewRoom from '../new-room-modal/NewRoom';
import { useState } from 'react';

const rooms = [
  {
    name: 'Coffee Room',
    id: 'room123',
    users_count: 10,
  },
  {
    name: 'Movie Discussion',
    id: 'room456',
    users_count: 25,
  },
  {
    name: 'Game Room',
    id: 'room789',
    users_count: 15,
  },
  {
    name: 'Hobby Room',
    id: 'room321',
    users_count: 8,
  },
  {
    name: 'Coffee Room',
    id: 'room123',
    users_count: 10,
  },
  {
    name: 'Movie Discussion',
    id: 'room456',
    users_count: 25,
  },
  {
    name: 'Game Room',
    id: 'room789',
    users_count: 15,
  },
  {
    name: 'Hobby Room',
    id: 'room321',
    users_count: 8,
  },
  {
    name: 'Hobby Room',
    id: 'room321',
    users_count: 8,
  },
  {
    name: 'Hobby Room',
    id: 'room321',
    users_count: 8,
  },
  {
    name: 'Hobby Room',
    id: 'room321',
    users_count: 8,
  },
  {
    name: 'Hobby Room',
    id: 'room321',
    users_count: 8,
  },
  {
    name: 'Hobby Room',
    id: 'room321',
    users_count: 8,
  },
  {
    name: 'Hobby Room',
    id: 'room321',
    users_count: 8,
  },
];

export default function Rooms() {
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
