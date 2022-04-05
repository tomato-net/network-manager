import React from 'react';
import {
    Route,
    Routes,
    BrowserRouter as Router,
} from "react-router-dom";

import './App.css';
import {ThemeProvider} from './context';
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
