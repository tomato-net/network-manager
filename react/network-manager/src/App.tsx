import React from 'react';

import './App.css';
import * as Components from './components';
import { ThemeProvider } from './context';
import { Typography } from "@mui/material";

function App() {
  return (
      <ThemeProvider>
          <div>
              <Components.ThemeToggleButton />
              <Components.Home />
              <Typography variant={`subtitle1`}>
                  Powered by {process.env.REACT_APP_API_URL}
              </Typography>
          </div>
      </ThemeProvider>
  );
}

export default App;
