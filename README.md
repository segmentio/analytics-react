# Segment React Quickstart Guide
<div align="center">
  <img src="https://user-images.githubusercontent.com/16131737/51960819-6b035280-240f-11e9-93c2-95d6a62822db.png"/>
  <p><b><i>You can't fix what you can't measure</i></b></p>
</div>

Analytics helps you measure your users, product, and business. It unlocks insights into your app's funnel, core business metrics, and whether you have product-market fit.

## How to get started
1. **Collect analytics data** from your app(s).
    - The top 200 Segment companies collect data from 5+ source types (web, mobile, server, CRM, etc.).
2. **Send the data to analytics tools** (for example, Google Analytics, Amplitude, Mixpanel).
    - Over 250+ Segment companies send data to eight categories of destinations such as analytics tools, warehouses, email marketing and remarketing systems, session recording, and more.
3. **Explore your data** by creating metrics (for example, new signups, retention cohorts, and revenue generation).
    - The best Segment companies use retention cohorts to measure product market fit. Netflix has 70% paid retention after 12 months, 30% after 7 years.

[Segment](https://segment.com) collects analytics data and allows you to send it to more than 250 apps (such as Google Analytics, Mixpanel, Optimizely, Facebook Ads, Slack, Sentry) just by flipping a switch. You only need one Segment code snippet, and you can turn integrations on and off at will, with no additional code. [Sign up with Segment today](https://app.segment.com/signup?ref=github&library=react).

### Why?
1. **Power all your analytics apps with the same data**. Instead of writing code to integrate all of your tools individually, send data to Segment, once.

2. **Install tracking for the last time**. We're the last integration you'll ever need to write. You only need to instrument Segment once. Reduce all of your tracking code and advertising tags into a single set of API calls.

3. **Send data from anywhere**. Send Segment data from any device, and we'll transform and send it on to any tool.

4. **Query your data in SQL**. Slice, dice, and analyze your data in detail with Segment SQL. We'll transform and load your customer behavioral data directly from your apps into Amazon Redshift, Google BigQuery, or Postgres. Save weeks of engineering time by not having to invent your own data warehouse and ETL pipeline.

    For example, you can capture data on any app:
    ```js
    analytics.track('Order Completed', { price: 99.84 })
    ```
    Then, query the resulting data in SQL:

    ```sql
    select * from app.order_completed
    order by price desc
    ```



# 🏃💨 Quickstart

In this tutorial you'll add your write key to this React demo app to start sending data from the app to Segment, and from there to any of our destinations, using our [Analytics.js library](https://segment.com/docs/sources/website/analytics.js/). Once your app is set up, you'll be able to turn on new destinations with the click of a button! Ready to try it for yourself? Scroll down to the <a href="#demo">demo section</a> and run the app!

Start sending data from any [source](https://segment.com/docs/guides/general/what-is-a-source) and see events live in the Segment **debugger**:

<div align="center">
  <img src="https://user-images.githubusercontent.com/16131737/51933162-8a6d9180-23b5-11e9-909b-d7737591b09a.gif"/>
</div>
<br/>

Once you have data being sent to Segment, forward this data to any of our 250+ [destinations](https://segment.com/docs/guides/general/what-is-a-destination):

<div align="center">
  <img src="https://user-images.githubusercontent.com/16131737/51859644-7b6edc80-22ec-11e9-8597-113a8b05ee07.gif"/>
</div>

## 📺 <span name="demo">Demo</span>
To start with this demo app, follow the instructions below:

1. [Sign up](https://app.segment.com/signup?ref=github&library=react) with Segment and edit the snippet in [index.html](https://github.com/segmentio/analytics-react/blob/master/public/index.html#L28) to replace `YOUR_WRITE_KEY` with your Segment **Write Key**.
    > **Tip!** You can find your key in your project setup guide or settings in the Segment.

    Your snippet will look something like the example below.

    ```html
    <script type="text/javascript">
      !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
      analytics.load("YOUR_WRITE_KEY");
      }}();
    </script>
    ```

2. From the command line, use `npm install` to install the dependencies, then `npm start` to run the app.

    ```bash
    npm install
    npm start
    ```

3. Go to the Segment site, and in the Debugger look at the live events being triggered in your app. You should see the following:
    - Page event: `Home` - When someone views the `home` page.
    - Page event: `About` - When someone views the `about` page.
    - Track event: `Learn React Link Clicked` - When someone clicks the "Learn React" link.

Congrats! You're seeing live data from your demo React app in Segment! 🎉

# 🔌 Installing on Your App
Okay, the demo app is cool, but how do I get this in my own React app? Follow the steps below.

## ✂️ Step 1: Copy the Snippet
To install Segment in your own app, paste the snippet below into the `head` tag of your site. Then, [sign up](https://app.segment.com/signup?ref=github&library=react) with Segment and replace `YOUR_WRITE_KEY` in the snippet with your Segment project's **Write Key**.

> **Tip!** You can find your write key in your Segment project setup guide or settings.

```html
<script type="text/javascript">
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  analytics.load("YOUR_WRITE_KEY");
  // analytics.page() // Uncomment if your application is NOT an SPA
  }}();
</script>
```
Now `window.analytics` is loaded and available to use throughout your app!

In the next sections you'll build out your implementation to track page loads, to identify individual users of your app, and track the actions they take.


## 📱 Step 2: Track Page Views in an SPA
> **Tip!** If your React application is **not** a Single Page application, you can uncomment the section in the above snippet and skip to Step 3.

The snippet from Step 1 loads `Analytics.js` into your app and is ready to track page loads. However, most React apps are a Single Page App (SPA), and in SPAs clicking a link or a new tab does not reload the whole webpage.

The `page` method lets you record page views on your website, along with optional information about the page being viewed. You can read more about how this works in the [page reference](https://segment.com/docs/sources/website/analytics.js/#page).

This means that using `analytics.page()` in `index.html` on a SPA will not detect page component loads, and you'll need to simulate a page load some other way. You can use [react-router](https://reacttraining.com/react-router) and React's lifecycle methods to create `page` calls.

If you separate your pages into their own components and allow the [`<Route />`](https://reacttraining.com/react-router/core/api/Route) component to handle when the page renders, you can use `componentDidMount` to invoke `page` calls. The example below shows one way you could do this.

```JSX
export default class HomePage extends Component {
  componentDidMount() {
    window.analytics.page('Home');
  }

  render() {
    return (
      <h1>
        Home page.
      </h1>
    );
  }
}
```


## 🔍 Step 3: Identify Users
The `identify` method is how you tell Segment who the current user is. It includes a unique User ID and any optional traits you can pass on about them. You can read more about this in the [identify reference](https://segment.com/docs/sources/website/analytics.js/#identify).

**Note:** You don't need to call `identify` for anonymous visitors to your site. Segment automatically assigns them an `anonymousId`, so just calling `page` and `track` still works just fine without `identify`.

Here's what a basic call to `identify` might look like:

```javascript
window.analytics.identify('f4ca124298', {
  name: 'Michael Bolton',
  email: 'mbolton@initech.com'
});
```

This call identifies Michael by his unique User ID and labels him with `name` and `email` traits.

In React, if you have a form where users sign up or log in, you can use the `onSubmit` handler to call `identify`, as in the example below:

```JSX
export default class IdentifyForm extends Component {
  state = {
    name: '',
    email: ''
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit() {
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
      <form onSubmit={this.handleSubmit}>
        <input name="name" type="text" value={name} onChange={this.handleChange} />
        <input name="email" type="email" value={email} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
 }
}
```

> **Tip!** Other handlers might be better for other situations. You can see the [React docs on event handlers](https://reactjs.org/docs/handling-events.html) for more information.

## ⏰ Step 4: Track Actions
The `track` method is how you tell Segment about which actions your users are performing on your site. Every action triggers what we call an "event", which can also have associated properties. It is important to figure out exactly what events you want to `track` instead of tracking anything and everything. A good way to do this is to build a [tracking plan](https://segment.com/docs/guides/sources/can-i-see-an-example-of-a-tracking-plan/). You can read more about `track` in the [track reference](https://segment.com/docs/sources/website/analytics.js/#track).

Here's what a call to `track` might look like when a user bookmarks an article:

```javascript
window.analytics.track('Article Bookmarked', {
  title: 'Snow Fall',
  subtitle: 'The Avalanche at Tunnel Creek',
  author: 'John Branch'
});
```

The snippet tells us that the user just triggered the **Article Bookmarked** event, and the article they bookmarked was the `Snow Fall` article authored by `John Branch`. Properties can be anything you want to associate to an event when it is tracked.

### Track Calls with Event Handlers
In React, you can use several event handlers, such as `onClick`, `onSubmit`, `onMouseOver`, to call the `track` events. In the example below, we use the `onClick` handler to make a `track` call to log a `User Signup`.

```JSX
export default class SignupButton extends Component {
  trackEvent() {
    window.analytics.track('User Signup');
  }

  render() {
    return (
      <button onClick={this.trackEvent}>
        Signup with Segment today!
      </button>
    );
  }
}
```

> **Tip!** Other handlers might be better for other situations. You can see the [React docs on event handlers](https://reactjs.org/docs/handling-events.html) for more information.

### Track Calls with Lifecycle Methods
[Lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle) are also great for tracking particular events, and in fact we used a lifecycle method in Step 2 to track page component loads. For example, if you want to track components that are conditionally rendered from a parent component and that are outside the scope of a `page` call, then you can use `componentDidMount` to trigger a `track` event:

```JSX
export default class VideoPlayer extends Component {
  componentDidMount() {
    window.analytics.track('Video Played');
  }

  render() {
    return (
      <video autoplay>
        <source src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" type="video/mp4">
      </video>
    );
  }
}
```

## 🤔 What's next?
Once you've added a few track calls, **you're done**! You've successfully installed `Analytics.js` tracking. Now you're ready to see your data in the Segment dashboard, and turn on any destination tools. 🎉

## 🎓 Advanced
Once you've mastered the basics, here are some advanced use cases you can apply with Segment.

### Track Calls for Error Logging
You can also use `track` calls to log errors, using a higher-order component such as `ErrorBoundary` to wrap around child components. Then, when an error occurs you log the error with `track` and gracefully display the appropriate child component. In this example, when an error is caught by `componentDidCatch`, we set the state, `track` the error, and then the `ErrorComponent` will be rendered.

```JSX
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
    const { errorComponent: ErrorComponent, children } = this.props;

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

### Typechecking with PropTypes
You can use typechecking with [`prop-types`](https://reactjs.org/docs/typechecking-with-proptypes.html) to catch a lot of potential bugs and prevent handing down information in the wrong format. For example, you can enforce a format for `user` related objects which can help with data standardization. You can get creative with the traits you expect to be sent to Segment for `identify` and `track`:

```JSX
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

If you love typechecking, you'll love our open-source project [typewriter](https://github.com/segmentio/typewriter), which enforces a strongly-typed tracking spec via a JSON schema. Interested more in data standardization? Check out our [protocols product](https://segment.com/product/protocols) to improve data quality.

You may wondering what you can be doing with all the raw data you are sending to Segment from your React app. With our [warehouses product](https://segment.com/product/warehouses), your analysts and data engineers can shift focus from data normalization and pipeline maintenance to providing insights for business teams. Having the ability to query data directly in SQL and layer on visualization tools can take your product to the next level.

## 💾 Warehouses
A warehouse is a special subset of destinations where we load data in bulk at a regular intervals, inserting and updating events and objects while automatically adjusting their schema to fit the data you've sent to Segment. We do the heavy lifting of capturing, schematizing, and loading your user data into your data warehouse of choice.

Examples of data warehouses include Amazon Redshift, Google BigQuery, MySQL, and Postgres.

<div align="center">
  <img src="https://user-images.githubusercontent.com/16131737/51726992-d23f9200-201e-11e9-8b68-608ebaaa6c65.gif"/>
</div>

## 🔒 What about privacy?
Want to allow your visitors to control and customize their tracking preferences on your site? Integrate our [consent-manager](https://github.com/segmentio/consent-manager), which is imported via the snippet and uses our pre-built React component under the hood.

## 📝 Docs & Feedback
Check out our full [Analytics.js reference](https://segment.com/docs/sources/website/analytics.js/) to see what else is possible, or read about the [Tracking API methods](https://segment.com/docs/sources/server/http/) to get a sense for the bigger picture. If you have any questions, or see anywhere we can improve our documentation, [let us know](https://segment.com/contact/)!
