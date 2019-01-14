# Quickstart: Analytics.js + React
This tutorial will help you start sending data from your React application to Segment and any of our destinations, using our <a href="https://segment.com/docs/sources/website/analytics.js/">Analytics.js library</a>. As soon as you're setup you'll be able to turn on any new destinations with the flip of a switch!

Want to try it for yourself? Scroll down to the <a href="#demo">demo section</a> and run the app!

## 🔌 Installation
### ✂️ Step 1: Copy the Snippet
Installing Segment is easy, just paste this snippet into the head of your site:
```html
<script type="text/javascript">
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  analytics.load("YOUR_WRITE_KEY");
  analytics.page();
  }}();
</script>
```

When you paste it, you'll need to replace `YOUR_WRITE_KEY` with your Segment project's <b>Write Key</b>, which you can find in your project setup guide or settings.

Now `window.analytics` is loaded and available to use throughout your app!

### 🔍 Step 2: Identify Users
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

### ⏰ Step 3: Track Actions
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

You'll want to track events that are indicators of success for your site, like <b>Signed Up</b>, <b>Item Purchased</b>, or <b>Article Bookmarked</b>. To get started, we recommend tracking just a few important events. You can always add more later!

Once you've added a few track calls, <b>you're done</b>! You successfully installed Analytics.js tracking. Now you're ready to turn on any destination you fancy from our interface. 🎉

## 📺 <span name="demo">Demo</span>
1. Add your Segment <b>Write Key</b>, which you can find in your project setup guide or settings, to the snippet in <a href="https://github.com/segmentio/analytics.js-react-quickstart/blob/master/public/index.html#L28">index.html</a>:
```html
<script type="text/javascript">
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  analytics.load("YOUR_WRITE_KEY");
  analytics.page();
  }}();
</script>
```

2. Install the dependencies and run the app:
```javascript
npm install
npm start
```

3. View the live events being triggered in your Segment dashboard debugger. You should see the page view and the `Clicked Learn React Link` event when clicked.

## 🤔 What's Next?
Check out our full <a href="https://segment.com/docs/sources/website/analytics.js/">Analytics.js reference</a> to see what else is possible, or read about the <a href="https://segment.com/docs/sources/server/http/">Tracking API methods</a> to get a sense for the bigger picture.

If you have any questions, or see anywhere we can improve our documentation, <a href="https://segment.com/contact/">please let us know</a>!
