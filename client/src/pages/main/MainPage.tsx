import { Box, Grid, Button, Text } from '@mantine/core';
import Rooms from '../../components/rooms/Rooms';
import Chat from '../../components/chat/Chat';
import { useState } from 'react';

import classes from './MainPage.module.css';

export default function MainPage() {
  const [hideRooms, setHideRooms] = useState<boolean>(false);

  return (
    <Grid gutter={0} className={classes.container}>
      {!hideRooms && (
        <Grid.Col span={5} className={classes.column}>
          <Rooms setHideRooms={setHideRooms} />
        </Grid.Col>
      )}
      <Grid.Col span={hideRooms ? 12 : 7} className={classes.column}>
        <Chat />
      </Grid.Col>
    </Grid>
  );
}
