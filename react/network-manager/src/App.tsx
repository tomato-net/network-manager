import React from 'react';

import './App.css';
import * as Components from './components';
import { ThemeProvider } from './context';
import { Stack, Typography } from "@mui/material";

function App() {
  return (
      <ThemeProvider>
          <Stack sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
              color: 'text.primary',
              borderRadius: 1,
              p: 3,
          }}>
              <Components.ThemeToggleButton />
              <Components.SubnetSearch />
              <Typography variant={`subtitle1`}>
                  Powered by {process.env.REACT_APP_API_URL}
              </Typography>
          </Stack>
      </ThemeProvider>
  );
}

export default App;
