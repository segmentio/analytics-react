import React from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './Main.css';

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;

const Main = ({ trackClickEvent }) => (
  <div>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/about" component={About} />
    </Switch>
    <div>
      <img src={logo} className="main-logo" alt="logo" />
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <a
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackClickEvent('Clicked Learn React Link')}
      >
        Learn React
      </a>
    </div>
  </div>
);

export default Main;
