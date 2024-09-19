import { Box } from '@mantine/core';

import classes from './subheader.module.css';

interface Props {
  children: React.ReactNode;
}

export default function Subheader({ children }: Props) {
  return <Box className={classes.container}>{children}</Box>;
}
