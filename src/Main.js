import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import './Main.css';

const Main = ({ trackClickEvent }) => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
    <div>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClickEvent('Learn React Link Clicked')}
      >
        Learn React
      </a>
    </div>
  </div>
);

export default Main;
