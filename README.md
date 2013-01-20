# [jsn](https://npmjs.org/package/jsn "jsn on npmjs") [![Build Status](https://travis-ci.org/bevacqua/jsn.png?branch=master)](https://travis-ci.org/bevacqua/jsn)

**jsn** is an open-source Node to JavaScript variable parser.

# What does JSN do?

**jsn** will take variables you pass as a context, and parse the source code to produce valid JavaScript.

 Sample **.jsn** file:

```javascript
var thatMuch = '@how.awesome';
alert(thatMuch);
```

You will need to install [jsn](https://npmjs.org/package/jsn "jsn on npmjs"), you can do that directly from **npm**

    npm install jsn

In your Node.JS code, you can parse these variables by accessing the **jsn** compiler.

```javascript
var jsn = require('jsn');
alert(thatMuch);
```