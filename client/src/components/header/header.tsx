import { UnstyledButton, Group, Text, Menu, Box, Divider } from '@mantine/core';
import {
  IconChevronDown,
  IconMessages,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react';
import { useAuth } from '../../hooks/use-auth';

import classes from './header.module.css';

export default function Header() {
  const { username, logout } = useAuth();

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.logoContainer}>
          <IconMessages className={classes.logoIcon} />
          <Text>ChatRoom</Text>
        </Box>
        <Menu position="bottom-end" withinPortal withArrow>
          <Menu.Target>
            <UnstyledButton>
              <Group className={classes.menuGroup}>
                <Text className={classes.menuUserText}>{username}</Text>
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
      <Divider></Divider>
    </>
  );
}
