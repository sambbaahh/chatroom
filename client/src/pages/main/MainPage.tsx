import { Box, Divider, Grid } from '@mantine/core';
import Rooms from '../../components/rooms/Rooms';
import Chat from '../../components/chat/Chat';
import { useState } from 'react';

import classes from './MainPage.module.css';
import { useSocket } from '../../hooks/useSocket';
import { useScreenDetector } from '../../hooks/useScreenDetector';

export default function MainPage() {
  const [areRoomsHidden, setAreRoomsHidden] = useState<boolean>(false);
  const {
    messages,
    rooms,
    currentRoom,
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
        {!currentRoom ? (
          <Grid.Col span={12} className={classes.column}>
            <Rooms rooms={rooms} createRoom={createRoom} joinRoom={joinRoom} />
          </Grid.Col>
        ) : (
          <Grid.Col span={12} className={classes.column}>
            <Chat
              handleCollapseRooms={handleCollapseRooms}
              areRoomsHidden={areRoomsHidden}
              currentRoom={currentRoom}
              messages={messages}
              leaveRoom={leaveRoom}
              sendMessage={sendMessage}
              isMobileWidth={isMobile}
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
            <Rooms rooms={rooms} createRoom={createRoom} joinRoom={joinRoom} />
          </Grid.Col>
          <Grid.Col span={0.4}>
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
          currentRoom={currentRoom}
          messages={messages}
          leaveRoom={leaveRoom}
          sendMessage={sendMessage}
          isMobileWidth={isMobile}
        />
      </Grid.Col>
    </Grid>
  );
}
