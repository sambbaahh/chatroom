import { Grid } from '@mantine/core';
import Rooms from '../components/Rooms';
import Chat from '../components/Chat';

export default function Room() {
  return (
    <Grid dir="col">
      <Grid.Col span={6}>
        <Rooms />
      </Grid.Col>
      <Grid.Col span={6}>
        <Chat />
      </Grid.Col>
    </Grid>
  );
}
