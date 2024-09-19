import ReactDOM from 'react-dom/client';

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';

import App from './app.tsx';
import { AuthProvider } from './hooks/use-auth.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <MantineProvider defaultColorScheme="auto">
        <App />
      </MantineProvider>
    </AuthProvider>
  </BrowserRouter>
);
