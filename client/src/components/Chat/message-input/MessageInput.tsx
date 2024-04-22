import { Box, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { getHotkeyHandler } from '@mantine/hooks';

export default function MessageInput() {
  return (
    <Box style={{ marginTop: 'auto', marginBottom: '0.5rem' }}>
      <TextInput
        radius="xl"
        size="md"
        placeholder="Send message..."
        rightSectionWidth={42}
        rightSection={
          <IconSend
            size={32}
            radius="xl"
            onClick={() => console.log('pöö')}
          ></IconSend>
        }
        onKeyDown={getHotkeyHandler([['Enter', () => console.log('pöö 2')]])}
      />
    </Box>
  );
}
