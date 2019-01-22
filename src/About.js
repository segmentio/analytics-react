import React, { Component } from 'react';

export default class About extends Component {
  componentDidMount() {
    window.analytics.page('About');
  }

  render() {
    return (
      <h2>About</h2>
    );
  }
}
