import { Box, Button, Card, Text } from '@mantine/core';
import { IconArrowRight, IconPlus } from '@tabler/icons-react';

import classes from './Rooms.module.css';
import Subheader from '../subheader/Subheader';
import NewRoom from '../new-room-modal/NewRoom';
import { useState } from 'react';

interface Props {
  rooms: any[];
  createRoom: (name: string) => Promise<void>;
  joinRoom: (roomId: number) => Promise<void>;
}

export default function Rooms({ rooms, createRoom, joinRoom }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalState = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleJoinRoom = (roomId: number) => {
    joinRoom(roomId);
  };

  const handleCreateRoom = (name: string) => {
    createRoom(name);
    handleModalState();
  };

  return (
    <Box className={classes.container}>
      <NewRoom
        open={isModalOpen}
        handleModalState={handleModalState}
        handleCreateRoom={handleCreateRoom}
      />
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
              onClick={() => handleJoinRoom(room.id)}
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
