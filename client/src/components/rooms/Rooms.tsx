import { Box, Button, Card, ScrollArea, Text } from '@mantine/core';
import { IconArrowRight, IconPlus } from '@tabler/icons-react';

import classes from './Rooms.module.css';
import Subheader from '../subheader/Subheader';
import NewRoom from '../new-room-modal/NewRoom';
import { useState } from 'react';
import { Room } from '../../interfaces';

interface Props {
  rooms: Room[];
  setRoomName: (name: string) => void;
  createRoom: (name: string) => void;
  joinRoom: (roomId: number) => void;
}

export default function Rooms({
  rooms,
  setRoomName,
  createRoom,
  joinRoom,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalState = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleJoinRoom = (roomId: number, roomName: string) => {
    joinRoom(roomId);
    setRoomName(roomName);
  };

  const handleCreateRoom = (name: string) => {
    createRoom(name);
    setRoomName(name);
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
      <ScrollArea type="hover" scrollbarSize={2} scrollHideDelay={0}>
        <Box className={classes.roomsContainer}>
          {rooms.map((room) => (
            <Card key={room.id} className={classes.card} withBorder>
              <Text>{room.name}</Text>
              <Button
                rightSection={<IconArrowRight />}
                onClick={() => handleJoinRoom(room.id, room.name)}
                size="sm"
                variant="light"
              >
                {' '}
                Join{' '}
              </Button>
            </Card>
          ))}
        </Box>
      </ScrollArea>
    </Box>
  );
}
