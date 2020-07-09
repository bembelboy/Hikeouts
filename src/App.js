import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './shared/Header/header';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route component={LandingPage} path='/' exact />
          <Route component={AuthPage} path='/auth' exact />
        </div>
      </BrowserRouter>
  );
}

export default App;
