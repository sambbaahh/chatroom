import React from 'react';
import ReactDOM from 'react-dom/client';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import './main.css';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
