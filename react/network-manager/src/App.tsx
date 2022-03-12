import React from 'react';

import './App.css';
import * as Components from './components';
import { ThemeProvider } from './context';

function App() {
  return (
      <ThemeProvider>
          <Components.ToggleThemeButton />
      </ThemeProvider>
  );
}

export default App;
