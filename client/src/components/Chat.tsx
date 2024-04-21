import { Flex, Text, rem } from '@mantine/core';
import { IconMessages } from '@tabler/icons-react';

export default function Chat() {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      direction="column"
      style={{ height: '100%', overflow: 'scroll' }}
    >
      <IconMessages
        style={{ width: rem(80), height: rem(80), margin: '0 auto' }}
        stroke={1}
      />
      <Text>Join room to chat with people!</Text>
    </Flex>
  );
}
