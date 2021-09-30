import React from 'react';
import './app.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Upload from './components/pages/Upload.js';
import Profile from './components/pages/Profile.js';
import Map from './Map';

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="nav-brand">Travel Map</div>
          </Link>
        </nav>
        <Switch>
          <Route exact path="/">
            <Map />
          </Route>
          <Route component={Upload} path="/upload" />
          <Route component={Profile} path="/profile" />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
