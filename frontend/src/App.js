import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import Posting from './pages/posting/Posting';
import Home from './pages/home/Home';
import Map from './Map';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import { useContext } from 'react';
import { Context } from './context/Context';

const App = () => {
  const { user } = useContext(Context);
  // const user = false;

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Map />
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/posting">{user ? <Posting /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
