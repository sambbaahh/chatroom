import { useEffect, useRef } from 'react';
import { ActionIcon, Box, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

import classes from './MessageInput.module.css';

interface Props {
  handleSendMessage: (content: string) => void;
}

export default function MessageInput({ handleSendMessage }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { content: '' },
    validate: {
      content: (value) => value.length < 1,
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, [form]);

  return (
    <Box className={classes.container}>
      <form
        className={classes.form}
        onSubmit={form.onSubmit(async ({ content }) => {
          handleSendMessage(content);
          form.setValues({ content: '' });
        })}
      >
        <TextInput
          ref={inputRef}
          classNames={{ input: classes.input }}
          placeholder="Send message..."
          {...form.getInputProps('content')}
          rightSection={
            <ActionIcon type="submit" className={classes.iconButton}>
              <IconSend></IconSend>
            </ActionIcon>
          }
        />
      </form>
    </Box>
  );
}
