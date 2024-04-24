import { ActionIcon, Box, Button, Card, Text } from '@mantine/core';
import { IconArrowRight, IconPlus } from '@tabler/icons-react';

import classes from './Rooms.module.css';
import Subheader from '../subheader/Subheader';

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

export default function Rooms({ setHideRooms }) {
  const handleJoin = () => {};

  return (
    <Box className={classes.container}>
      <Subheader>
        <Text>Available rooms:</Text>
        <ActionIcon>
          <IconPlus />
        </ActionIcon>
      </Subheader>
      <Box className={classes.roomsContainer}>
        {rooms.map((room) => (
          <Card key={room.id} className={classes.card} withBorder>
            <Text>{room.name}</Text>
            <Button
              rightSection={<IconArrowRight size={14} />}
              onClick={() => handleJoin()}
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
