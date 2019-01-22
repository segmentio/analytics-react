import React, { Component } from 'react';

export default class Home extends Component {
  componentDidMount() {
    window.analytics.page('Home');
  }

  render() {
    return (
      <h2>Home</h2>
    );
  }
}
