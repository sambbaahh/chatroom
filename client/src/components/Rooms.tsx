import { Box, Button, Card, Divider, Flex, Text } from '@mantine/core';
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
];

export default function Rooms({ setHideRooms }) {
  return (
    <Box>
      <Box style={{ height: '10vh', overflow: 'scroll', padding: 8 }}>
        <Text> ChatRoom</Text>
        <Divider></Divider>
      </Box>
      <Box style={{ height: '90vh', overflow: 'scroll', padding: 8 }}>
        {rooms.map((room) => (
          <Card key={room.id} style={{ marginBlock: 8 }} withBorder shadow="md">
            <Flex
              mih={50}
              gap="md"
              justify="space-between"
              align="center"
              direction="row"
            >
              <Text>{room.name}</Text>
              <Button
                rightSection={<IconArrowRight size={14} />}
                // onClick={() => setHideRooms(true)}
              >
                {' '}
                Join{' '}
              </Button>
            </Flex>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
