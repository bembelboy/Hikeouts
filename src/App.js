import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route component={LandingPage} path='/' exact />
        <Route component={AuthPage} path='/auth/:mode' exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
