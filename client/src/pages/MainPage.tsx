import { Center, Container, Divider, Grid } from '@mantine/core';
import Rooms from '../components/Rooms';
import Chat from '../components/Chat';
import { useState } from 'react';

export default function Room() {
  const [hideRooms, setHideRooms] = useState<boolean>(false);

  return (
    <Container fluid px={0}>
      <Grid gutter={0}>
        {!hideRooms && (
          <Grid.Col span={5}>
            <Rooms setHideRooms={setHideRooms} />
          </Grid.Col>
        )}
        <Grid.Col span={hideRooms ? 12 : 7}>
          <Chat />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
