import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

//COMPONENETS
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import MainNavigation from './shared/Navigation/MainNavigation';

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <MainNavigation />
        <Route component={LandingPage} path='/user/:id' exact />
        <Route component={AuthPage} path='/auth/:mode' exact />
        <Route component={ProfilePage} path='/profile/:id' exact />
      </div>

    </BrowserRouter>
  );
}

export default App;
