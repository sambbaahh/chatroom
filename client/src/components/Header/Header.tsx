import { useState } from 'react';
import { UnstyledButton, Group, Text, Menu, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconMessages,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react';
import { useAuth } from '../../hooks/useAuth';

import classes from './Header.module.css';

const user = {
  name: 'samii',
  email: 'janspoon@fighter.dev',
  image:
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
};

export default function Header() {
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const { logout } = useAuth();

  return (
    <Box className={classes.container}>
      <Box className={classes.logoContainer}>
        <IconMessages className={classes.logoIcon} />
        <Text>ChatRoom</Text>
      </Box>
      <Menu
        transitionProps={{ transition: 'pop-top-right' }}
        onClose={() => setUserMenuOpened(false)}
        onOpen={() => setUserMenuOpened(true)}
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton>
            <Group className={classes.menuGroup}>
              <Text className={classes.menuUserText}>{user.name}</Text>
              <IconChevronDown className={classes.menuDownIcon} />
            </Group>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconUserCircle className={classes.dropdownIcon} />}
            disabled
          >
            Profile
          </Menu.Item>
          <Menu.Item
            leftSection={<IconLogout className={classes.dropdownIcon} />}
            onClick={() => logout()}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}
