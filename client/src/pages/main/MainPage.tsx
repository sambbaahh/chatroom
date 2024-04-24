import { Box, Grid, Button, Text, Divider } from '@mantine/core';
import Rooms from '../../components/rooms/Rooms';
import Chat from '../../components/chat/Chat';
import { useState } from 'react';

import classes from './MainPage.module.css';

export default function MainPage() {
  const [areRoomsHidden, setAreRoomsHidden] = useState<boolean>(false);

  const handleCollapseRooms = () => {
    setAreRoomsHidden(!areRoomsHidden);
  };

  return (
    <Grid
      gutter={0}
      classNames={{ root: classes.container, inner: classes.gridInner }}
    >
      {!areRoomsHidden && (
        <>
          <Grid.Col span={4.5} className={classes.column}>
            <Rooms />
          </Grid.Col>
          <Grid.Col span={0.4} className={classes.column}>
            <Box className={classes.dividerWrapper}></Box>
          </Grid.Col>
        </>
      )}
      <Grid.Col span={areRoomsHidden ? 12 : 7.1} className={classes.column}>
        <Chat
          handleCollapseRooms={handleCollapseRooms}
          areRoomsHidden={areRoomsHidden}
        />
      </Grid.Col>
    </Grid>
  );
}
