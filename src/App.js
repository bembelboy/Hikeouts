import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { firebaseAuth } from './context/provider/AuthProvider';

//STYLES
import './App.css';

//COMPONENETS
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import MainNavigation from './shared/Navigation/MainNavigation';
import AuthMain from './container/Auth/AuthMain';

function App() {

  const { handleSignup } = useContext(firebaseAuth)
  console.log(handleSignup)

  return (
    <div className="App">
      <MainNavigation />
      <Switch>
        <Route component={LandingPage} path='/' />
        <Route component={AuthMain} path='/auth' />
        <Route component={ProfilePage} path='/profile/:id' exact />
      </Switch>

    </div>
  );
}

export default App;
