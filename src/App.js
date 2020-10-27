import React from 'react';
import { Route, Switch } from 'react-router-dom';

//STYLES
import './App.css';

//COMPONENETS
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import MainNavigation from './shared/Navigation/MainNavigation';
import AuthMain from './container/Auth/AuthMain';
import EditPage from './pages/EditPage';
import PostPage from './pages/PostPage';
import ContactPage from './pages/ContactPage';
import NewsFeedPage from './pages/NewsFeedPage';

function App() {


  return (

    <div className="App">
      <MainNavigation />
      <Switch>
        <Route  component={NewsFeedPage} path='/myFellows' />
        <Route component={PostPage} path='/createPost'/>  
        <Route component={ProfilePage} path='/profile/:id' exact />
        <Route component={EditPage}  path={'/profile/:id/edit'} exact /> 
        <Route component={ContactPage} path={'/Contact'} exact />
        <Route component={LandingPage} path='/' />
        <Route component={AuthMain} path='/auth' />
      </Switch>

    </div>
  );
}

export default App;
