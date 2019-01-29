import React, { Component } from 'react';
import logo from './logo.svg';

export default class Home extends Component {
  componentDidMount() {
    window.analytics.page('Home');
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <img src={logo} className="main-logo" alt="logo" />
      </div>
    );
  }
}
