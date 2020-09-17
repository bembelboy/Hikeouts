import React from 'react';
import { Route, Switch } from 'react-router-dom';


//STYLES
import './App.css';

//COMPONENETS
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import MainNavigation from './shared/Navigation/MainNavigation';
import AuthMain from './container/Auth/AuthMain';
import Home from './DUMMY_DATA/home';

function App() {



  return (

    <div className="App">
      <MainNavigation />
      <Switch>
        <Route path='/myFellows' component={Home} />
        <Route component={ProfilePage} path='/profile/:id' exact />
        <Route component={LandingPage} path='/' />
        <Route component={AuthMain} path='/auth' />
      </Switch>
    </div>
  );
}

export default App;
