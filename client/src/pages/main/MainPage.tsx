import { Box, Grid, Button, Text, Divider } from '@mantine/core';
import Rooms from '../../components/rooms/Rooms';
import Chat from '../../components/chat/Chat';
import { useState } from 'react';

import classes from './MainPage.module.css';

export default function MainPage() {
  const [hideRooms, setHideRooms] = useState<boolean>(false);

  const handleCollapseRooms = () => {
    setHideRooms(!hideRooms);
  };

  return (
    <Grid gutter={0} className={classes.container}>
      {!hideRooms && (
        <>
          <Grid.Col span={4.5} className={classes.column}>
            <Rooms setHideRooms={setHideRooms} />
          </Grid.Col>
          <Grid.Col span={0.4} className={classes.column}>
            <Box className={classes.dividerWrapper}></Box>
          </Grid.Col>
        </>
      )}
      <Grid.Col span={hideRooms ? 12 : 7.1} className={classes.column}>
        <Chat handleCollapseRooms={handleCollapseRooms} />
      </Grid.Col>
    </Grid>
  );
}
