import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import './App.css';

class App extends Component {
  componentDidMount() {
    window.analytics.page(window.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.analytics.page(this.props.location.pathname);
    }
  }

  trackClickEvent(event) {
    window.analytics.track(event);
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

export default withRouter(props => <App {...props} />);
