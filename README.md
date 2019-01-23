<div align="center">
  <img src="https://user-images.githubusercontent.com/658544/51635694-49383600-1f0c-11e9-804a-973e4792cac8.png"/>
</div>

_You can't fix what you can't measure._ Analytics helps you understand your product, users, and business. Also, it helps you understand your app's funnel, core metrics, and product market fit. Here's **how**:

1. **Collect analytics data** from your app(s). _Tip: The top 200 Segment companies collect data from 5+ source types (web, mobile, server, crm, ..)._
2. **Send the data to 1+ analytics tools** (like Google Analytics, Amplitude, Mixpanel, etc..). _Tip: The top 200 Segment companies send data to 8 destination categories (analytics, warehouse, s3, email, session recording, remarketing, ..)._
3. **Explore your data** by creating metrics (like new signups, retention cohorts, and revenue). _Tip: Retention cohorts are the best way of measuring product market fit. Netflix has 70% paid retention after 12 months, 30% after 7 years._

Segment collects analytics data and sends it to 250+ apps with the flip of a switch (e.g. Google Analytics, Mixpanel, Optimizely, Facebook Ads, Slack, Sentry, and many more...). You only need one snippet and you can turn integrations on and off whenever you want with no additional code.

This tutorial will help you start sending data from your React application to Segment and any of our destinations, using our <a href="https://segment.com/docs/sources/website/analytics.js/">Analytics.js library</a>. As soon as you're setup you'll be able to turn on any new destinations with the flip of a switch!

Want to try it for yourself? Scroll down to the <a href="#demo">demo section</a> and run the app!

<p align="center">
  <img src="https://user-images.githubusercontent.com/16131737/51644423-f0c16280-1f24-11e9-9d36-2c2ccfbeb0ec.gif"/>
</p>

# 🔌 Installation
## ✂️ Step 1: Copy the Snippet
Installing Segment is easy, just paste this snippet into the head of your site. When you paste it, you'll need to replace `YOUR_WRITE_KEY` with your Segment project's <b>Write Key</b>, which you can find in your project setup guide or settings:
```html
<script type="text/javascript">
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  analytics.load("YOUR_WRITE_KEY");
  }}();
</script>
```
Now `window.analytics` is loaded and available to use throughout your app!

###  Single-Page Application
Clicking a link or a new tab will not reload the webpage in an SPA. Therefore, using `analytics.page()` in `index.html` is not ideal and we need to simulate a page load. However, we can achieve `page` calls with the use of [react-router](https://reacttraining.com/react-router) and React's lifecycle methods.

If we seperate our pages into their own components and allow the [`<Route />`](https://reacttraining.com/react-router/core/api/Route) component to handle when our pages render, then we can use `componentDidMount` to invoke our `page` calls:

```javascript
export default class HomePage extends Component {
  componentDidMount() {
    window.analytics.page('Home');
  }

  render() {
    return (
      <h1>
        Home
      </h1>
    );
  }
}
```

##  🔍 Step 2: Identify Users
The `identify` method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits you know about them. You can read more about it in the <a href="https://segment.com/docs/sources/website/analytics.js/#identify">identify reference</a>.

<b>Note:</b> You won't need to call `identify` for anonymous visitors to your site. We'll automatically assign them an `anonymousId`, so just calling `page` and `track` will still work just fine without `identify`.

Here's what a basic call to `identify` might look like:

```javascript
window.analytics.identify('f4ca124298', {
  name: 'Michael Bolton',
  email: 'mbolton@initech.com'
});
```

That's identifying Michael by his unique User ID and labeling him with `name` and `email` traits.

### Event Handler
If you're using a form to handle user signups or logins, the `onSubmit` handler is a great use-case to call `identify`:
```javascript
export default class IdentifyForm extends Component {
  state = {
    name: '',
    email: ''
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  onIdentifySubmit() {
    const { name, email } = this.state;

    // Add your own unique ID here or we will automatically assign an anonymousID
    window.analytics.identify({
      name,
      email
    });
  }

  render() {
    const { name, email } = this.state;

    return (
      <form onSubmit={this.onIdentifySubmit}>
        <input value={name} type="text" onChange={this.handleChange} />
        <input value={email} type="text" onChange={this.handleChange} /> 
        <input type="submit" />
      </form>
    )
 }
}
```

## ⏰ Step 3: Track Actions
The `track` method is how you tell Segment about which actions your users are performing on your site. Every action triggers what we call an "event", which can also have associated properties. It is important to figure out exactly what events you want to `track` instead of tracking anything and everything. You can read more about `track` in the <a href="https://segment.com/docs/sources/website/analytics.js/#track">track reference</a>.

Here's what a call to `track` might look like when a user bookmarks an article:

```javascript
window.analytics.track('Article Bookmarked', {
  title: 'Snow Fall',
  subtitle: 'The Avalanche at Tunnel Creek',
  author: 'John Branch'
});
```

That's telling us that your user just triggered the <b>Article Bookmarked</b> event and bookmarked the `Snow Fall` article authored by `John Branch`. Properties can be anything you want to associate to an event when it is tracked.

### Event Handler
[Event handlers](https://reactjs.org/docs/handling-events.html) are oftenly used to call `track`, such as: `onClick`, `onSubmit`, `onMouseOver`:

```javascript
export default class Signup extends Component {
  trackClickEvent() {
    window.analytics.track('User Signup');
  }

  render() {
    return (
      <button onClick={this.trackClickEvent}>
        Signup with Segment today!
      </button>
    );
  }
}
```

### Lifecycle Method
[Lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle) are also great use cases for tracking particular events. For example, if you want to track components that are conditionally rendered from a parent component and that are outside the scope of a `page` call, then you can use `componentDidMount` to trigger a `track` event:

```javascript
export default class VideoPlayer extends Component {
  componentDidMount() {
    window.analytics.track('Video Played');
  }

  render() {
    return (
      <video autoplay>
        <source src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" type="video/mp4">
      </video>
    )
  }
}
```

### Error Boundary
Using a higher-order component to wrap around children components can be useful for catching errors. Usually when an error occurs, we will log the error with `track` and gracefully display the appropriate child component:

```javascript
export default class ErrorBoundary extends Component {
  static propTypes = {
    /**
     * Fallback component to display when uncaught exceptions occur in a component tree:
     * function({ error: PropTypes.object, errorInfo: PropTypes.object }): PropTypes.node
     */
    errorComponent: PropTypes.func
  };

  static defaultProps = {
    errorComponent: () => null
  };

  state = {
    error: null,
    errorInfo: null
  };

  componentDidCatch(error, errorInfo) {
    const { error, errorInfo } = this.state;

    this.setState({
      error,
      errorInfo
    });

    window.analytics.track('JavaScript Error', {
      error,
      errorInfo
    });
  }

  render() {
    const { error, errorInfo } = this.state;
    const { ErrorComponent, children } = this.props;

    return error ? (
      <ErrorComponent
        error={error}
        errorInfo={errorInfo}
      />
    ) : (
      children
    );
  }
}
```

Once you've added a few track calls, **you're done**! You successfully installed `Analytics.js` tracking. Now you're ready to turn on any destination you fancy from our interface. 🎉

## 🎓 Advanced
### Typecheck
Typechecking with [`prop-types`](https://reactjs.org/docs/typechecking-with-proptypes.html) can catch a lot of potential bugs and prevent handing down information in the wrong format. For example, enforcing a format for `user` related objects can help with data standardization. You can get creative with what traits you expect to be sent to Segment for `identify` and `track`:

```javascript
export default class User extends Component {
  static propTypes = {
    id: PropTypes.string,
    identifyTraits: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      isAuthorized: PropTypes.bool.isRequired
    }),
    trackTitle: PropTypes.string,
    trackTraits: PropTypes.object
  };

  identify() {
    const { id, identifyTraits } = this.props;

    window.analytics.identify(id, identifyTraits);
  }

  track() {
    const { trackTitle, trackTraits } = this.props;

    window.analytics.track(trackTitle, trackTraits);
  }

  render() {
    const { children } = this.props;

    return children;
  }
}
```

# 📺 <span name="demo">Demo</span>
1. Add your Segment <b>Write Key</b>, which you can find in your project setup guide or settings, to the snippet in <a href="https://github.com/segmentio/analytics-react/blob/master/public/index.html#L28">index.html</a>:
```html
<script type="text/javascript">
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  analytics.load("YOUR_WRITE_KEY");
  }}();
</script>
```

2. Install the dependencies and run the app:
```javascript
npm install
npm start
```

3. View the live events being triggered in your Segment dashboard debugger:
    + Page event: `Home`
    + Page event: `About`
    + Track event: `Learn React Link Clicked`

# 🤔 What's Next?
Interested in allowing your visitors to control and customize their tracking preferences on a website? Integrate our [consent-manager](https://github.com/segmentio/consent-manager), which is imported via the snippet and uses our pre-built React component under the hood.

Check out our full <a href="https://segment.com/docs/sources/website/analytics.js/">Analytics.js reference</a> to see what else is possible, or read about the <a href="https://segment.com/docs/sources/server/http/">Tracking API methods</a> to get a sense for the bigger picture. If you have any questions, or see anywhere we can improve our documentation, <a href="https://segment.com/contact/">please let us know</a>!
