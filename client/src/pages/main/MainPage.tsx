import { Box, Divider, Grid } from '@mantine/core';
import Rooms from '../../components/rooms/Rooms';
import Chat from '../../components/chat/Chat';
import { useState } from 'react';

import classes from './MainPage.module.css';
import { useSocket } from '../../hooks/useSocket';
import { useScreenDetector } from '../../hooks/useScreenDetector';

export default function MainPage() {
  const [areRoomsHidden, setAreRoomsHidden] = useState<boolean>(false);
  const [roomName, setRoomName] = useState<string>('');
  const {
    messages,
    rooms,
    isUserInRoom,
    joinRoom,
    createRoom,
    leaveRoom,
    sendMessage,
  } = useSocket();
  const { isMobile } = useScreenDetector();

  const handleCollapseRooms = () => {
    setAreRoomsHidden(!areRoomsHidden);
  };

  if (isMobile) {
    return (
      <Grid
        gutter={0}
        classNames={{ root: classes.container, inner: classes.gridInner }}
      >
        {!isUserInRoom ? (
          <Grid.Col span={12} className={classes.column}>
            <Rooms
              rooms={rooms}
              setRoomName={setRoomName}
              createRoom={createRoom}
              joinRoom={joinRoom}
            />
          </Grid.Col>
        ) : (
          <Grid.Col span={12} className={classes.column}>
            <Chat
              handleCollapseRooms={handleCollapseRooms}
              areRoomsHidden={areRoomsHidden}
              roomName={roomName}
              messages={messages}
              isUserInRoom={isUserInRoom}
              leaveRoom={leaveRoom}
              sendMessage={sendMessage}
            />
          </Grid.Col>
        )}
      </Grid>
    );
  }

  return (
    <Grid
      gutter={0}
      classNames={{ root: classes.container, inner: classes.gridInner }}
    >
      {!areRoomsHidden && (
        <>
          <Grid.Col span={4.5} className={classes.column}>
            <Rooms
              rooms={rooms}
              setRoomName={setRoomName}
              createRoom={createRoom}
              joinRoom={joinRoom}
            />
          </Grid.Col>
          <Grid.Col span={0.4} className={classes.column}>
            <Box className={classes.dividerWrapper}>
              <Divider orientation="vertical"></Divider>
            </Box>
          </Grid.Col>
        </>
      )}
      <Grid.Col span={areRoomsHidden ? 12 : 7.1} className={classes.column}>
        <Chat
          handleCollapseRooms={handleCollapseRooms}
          areRoomsHidden={areRoomsHidden}
          roomName={roomName}
          messages={messages}
          isUserInRoom={isUserInRoom}
          leaveRoom={leaveRoom}
          sendMessage={sendMessage}
        />
      </Grid.Col>
    </Grid>
  );
}
