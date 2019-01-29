import React, { Component } from 'react';
import './About.css';

export default class About extends Component {
  componentDidMount() {
    window.analytics.page('About');
  }

  render() {
    return (
      <div>
        <h2>About</h2>
        <p className="about-content">
          Segment collects analytics data and sends it to 250+ apps with the flip of a switch (e.g. Google Analytics, Mixpanel, Optimizely, Facebook Ads, Slack, Sentry). You only need one snippet and you can turn integrations on and off whenever you want with no additional code.
        </p>
      </div>
    );
  }
}
