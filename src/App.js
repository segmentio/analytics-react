import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import './App.css';

class App extends Component {
  trackClickEvent(title) {
    window.analytics.track(title);
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Main trackClickEvent={this.trackClickEvent} />
      </div>
    );
  }
}

export default App;
