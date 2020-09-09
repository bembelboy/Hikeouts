import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

//COMPONENETS
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import MainNavigation from './shared/Navigation/MainNavigation';

function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <MainNavigation />
        <Route component={LandingPage} path='/home' />
        <Route component={ProfilePage} path='/profile/:id' exact />
      </div>

    </BrowserRouter>
  );
}

export default App;
