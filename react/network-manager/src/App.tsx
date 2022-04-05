import React from 'react';

import './App.css';
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
          <Router>
              <Routes>
                  <Route path={`/`} element={<Pages.Layout />}>
                      <Route index element={<Pages.Home />} />
                      <Route path={`subnet/:subnetId`} element={<Pages.Subnet />} />
                      <Route path={`interface/:interfaceId`} element={<Pages.Interface />} />
                      <Route path={`package/:packageId`} element={<Pages.Package />} />
                  </Route>
              </Routes>
          </Router>
      </ThemeProvider>
  );
}

export default App;
