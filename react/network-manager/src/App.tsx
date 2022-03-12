import React from 'react';

import './App.css';
import * as Components from './components';
import { ThemeProvider } from './context';
import { Box, Typography } from "@mui/material";

function App() {
  return (
      <ThemeProvider>
          <Box sx={{
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
              <Components.Home id={`2`} />
              <Typography variant={`subtitle1`}>
                  Powered by {process.env.REACT_APP_API_URL}
              </Typography>
          </Box>
      </ThemeProvider>
  );
}

export default App;
