import React from 'react';

import './App.css';
import { routes } from "./config";
import {
    ThemeProvider
} from './context';
import {
    Paper,
    Typography
} from "@mui/material";
import {
    Route,
    Routes,
    BrowserRouter as Router,
} from "react-router-dom";
import * as Pages from "./pages";

function App() {
  return (
      <ThemeProvider>
          <Paper
              square
              sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              bgcolor: 'background.default',
              color: 'text.primary',
          }}>
              <Router>
                  <Routes>
                      <Route path={`/`} element={<Pages.Layout />}>
                          <Route index element={<Pages.Home />} />
                          <Route path={`subnet/:subnetId`} element={<Pages.Subnet />} />
                      </Route>
                  </Routes>
              </Router>
          </Paper>
      </ThemeProvider>
  );
}

export default App;
