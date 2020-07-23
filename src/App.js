import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route component={LandingPage} path='/user/:id' exact />
        <Route component={AuthPage} path='/auth/:mode' exact />
        <Route component={ProfilePage} path='/' exact />
      </div>
    </BrowserRouter>
  );
}

export default App;
