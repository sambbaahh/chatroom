import { Box, Center, Container, Divider, Grid } from '@mantine/core';
import Rooms from '../../components/Rooms/Rooms';
import Chat from '../../components/Chat/Chat';
import { useState } from 'react';

export default function MainPage() {
  const [hideRooms, setHideRooms] = useState<boolean>(false);

  return (
    <Grid gutter={0} style={{ height: '100%' }}>
      {!hideRooms && (
        <Grid.Col span={5} style={{ height: '100%', overflow: 'scroll' }}>
          <Rooms setHideRooms={setHideRooms} />
        </Grid.Col>
      )}
      <Grid.Col
        span={hideRooms ? 12 : 7}
        style={{ height: '100%', overflow: 'scroll' }}
      >
        <Chat />
      </Grid.Col>
    </Grid>
  );
}
