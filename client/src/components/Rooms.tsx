import { Box, Button, Flex, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

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
  return rooms.map((room) => (
    <Box key={room.id}>
      <Flex
        mih={50}
        bg="rgba(0, 0, 0, .3)"
        gap="md"
        justify="space-between"
        direction="row"
      >
        <Text>{room.name}</Text>
        <Button rightSection={<IconArrowRight size={14} />}> Join </Button>
      </Flex>
    </Box>
  ));
}
