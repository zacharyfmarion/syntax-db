# SyntaxDB

[![Build Status](https://travis-ci.org/zacharyfmarion/syntax-db.svg?branch=master)](https://travis-ci.org/zacharyfmarion/syntax-db)

This is a small wrapper module for the syntax-db REST API. You can query the site through a series of chainable commands similar to jquery:

```js
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

## Usage

All queries end with the `query()` function, which actually executes the call the syntaxdb server. This function returns a promise containg the JSON received from the query (or an error if the query was invalid). So a basic request will look something like this;

```js
db.languages().query().then( data => {
  console.log(data)
}).catch( err => { throw err })
```

Or, if you are using Babel and have acess to es7 features, you can use async/await:

```js
async function getLanguages() {
  try {
    const languages = await db.languages().query()
    console.log(languages)
  } catch(err) {
    throw err 
  }
}
```

## API

### `query()`
### `categories(lang)`
### `languages(lang=null)`
### `concepts(lang=null, category_id=null)`

### `search(query)`
### `limit(limit)`
### `fields(fields)`
### `sort(field, reverse=false)`

> PS: I'm not affiliated at all with syntax-db...just think it's a great site! :)
