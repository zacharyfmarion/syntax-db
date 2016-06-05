## SyntaxDB

[![Build Status](https://travis-ci.org/zacharyfmarion/syntax-db.svg?branch=master)](https://travis-ci.org/zacharyfmarion/syntax-db)

This is a small wrapper module for the syntax-db REST API. You can query the site through a series of chainable commands similar to jquery:

```javascript
const db = require('syntax-db')

// example of command chaining
// note that query() must be called at the end of the chain and
// actually executes the call to the server...this returns a promise
// containing the JSON parsed from the body of the response
db.categories('python')
  .limit(4)
  .sort('id')
  .query().then( data => {
     console.log(data)
}).catch( err => { throw err })
```

> PS: I'm not affiliated at all with syntax-db...just think it's a great site! :)
