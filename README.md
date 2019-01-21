<div align="center">
  <img src="https://user-images.githubusercontent.com/16131737/51462823-7622f800-1d16-11e9-94a2-85fb1305b7bf.png"/>
</div>

This tutorial will help you start sending data from your React application to Segment and any of our destinations, using our <a href="https://segment.com/docs/sources/website/analytics.js/">Analytics.js library</a>. As soon as you're setup you'll be able to turn on any new destinations with the flip of a switch!

Want to try it for yourself? Scroll down to the <a href="#demo">demo section</a> and run the app!

<p align="center">
  <img src="https://user-images.githubusercontent.com/16131737/51461953-45da5a00-1d14-11e9-8727-97890d84d13c.gif"/>
</p>

# 🔌 Installation
## ✂️ Step 1: Copy the Snippet
Installing Segment is easy, just paste this snippet into the head of your site. When you paste it, you'll need to replace `YOUR_WRITE_KEY` with your Segment project's <b>Write Key</b>, which you can find in your project setup guide or settings:
```html
<script type="text/javascript">
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  analytics.load("YOUR_WRITE_KEY");
  analytics.page();
  }}();
</script>
```
Now `window.analytics` is loaded and available to use throughout your app!

###  Single-Page Application
Clicking a link or a new tab will not reload the webpage in an SPA. Thus, using `analytics.page()` in `index.html` is not ideal and we need to simulate a page load. We can do this with the use of [react-router](https://reacttraining.com/react-router) and React's lifecycle methods. **Important**: Remember to remove `analytics.page()` from the snippet!

Using the `withRouter` higher-order component, we can get access to the `location` props when the wrapped component renders. When the component renders, we can use `componentDidMount`/`componentDidUpdate` to invoke our `page` calls:

```javascript
componentDidMount() {
  window.analytics.page(window.location.pathname);
}

componentDidUpdate(prevProps) {
  if (this.props.location.pathname !== prevProps.location.pathname) {
    window.analytics.page(window.location.pathname);
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
export default class Identify extends Component {
  state = {
    name: '',
    email: ''
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  onIdentifySubmit() {
    window.analytics.identify({
      name: this.state.name,
      email: this.state.email
    });
  }

  render() {
    return (
      <form onSubmit={this.onIdentifySubmit}>
        <input value={this.state.name} type="text" onChange={this.handleChange} />
        <input value={this.state.email} type="text" onChange={this.handleChange} /> 
        <input type="submit" />
      </form>
    )
 }
}
```

## ⏰ Step 3: Track Actions
The `track` method is how you tell Segment about which actions your users are performing on your site. Every action triggers what we call an "event", which can also have associated properties. You can read more about `track` in the <a href="https://segment.com/docs/sources/website/analytics.js/#track">track reference</a>.

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
Event handlers are oftenly used to call `track`, such as: `onClick`, `onSubmit`, `onMouseOver`, `etc.`:

```javascript
export default class Track extends Component {
  trackClickEvent() {
    window.analytics.track('Clicked Hello World Button');
  }

  render() {
    return (
      <button onClick={this.trackClickEvent}>
        Hello World
      </button>
    );
  }
}
```

### Lifecyle Methods
[Lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle) are also great use cases for tracking particular events. For example, if you want to track components that are conditionally rendered from a parent component and that are outside the scope of a `page` call, then you can use `componentDidMount` to trigger a `track` event:

```javascript
export default class Panel extends Component {
  componentDidMount() {
    window.analytics.track('Viewed Panel');
  }

  render() {
    return (
      <div className="panel">
        <div className="panel-body">
          A basic panel.
        </div>
      </div>
    )
  }
};
```

### Error Boundary
Using a higher-order component to wrap around children components can be useful for catching errors. Usually when an error occurs, we like to call `track` and gracefully display the appropriate child component:

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
    this.setState({
      error,
      errorInfo
    });

    window.analytics.track({
      error: this.state.error,
      errorInfo: this.state.errorInfo
    });
  }

  render() {
    const ErrorComponent = this.props.errorComponent;

    return this.state.error ? (
      <ErrorComponent
        error={this.state.error}
        errorInfo={this.state.errorInfo}
      />
    ) : (
      this.props.children
    );
  }
}
```

Once you've added a few track calls, **you're done**! You successfully installed `Analytics.js` tracking. Now you're ready to turn on any destination you fancy from our interface. 🎉

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
    + Page event: `/`
    + Page event: `/about`
    + Track event: `Clicked Learn React Link`

# 🤔 What's Next?
Check out our full <a href="https://segment.com/docs/sources/website/analytics.js/">Analytics.js reference</a> to see what else is possible, or read about the <a href="https://segment.com/docs/sources/server/http/">Tracking API methods</a> to get a sense for the bigger picture.

Interested in allowing your visitors to control and customize their tracking preferences on a website? Integrate our [consent-manager](https://github.com/segmentio/consent-manager), which is imported via the snippet and uses our pre-built React component under the hood.

If you have any questions, or see anywhere we can improve our documentation, <a href="https://segment.com/contact/">please let us know</a>!
