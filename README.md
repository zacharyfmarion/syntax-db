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

Function to actually execute the query - see above for details.

### `categories(lang)`

Get all available categories for a certain language - not that you must provide a langauge. The list of currently supported databases is shown below:


 `['java', 'c', 'cpp', 'csharp', 'python', 'ruby', 'javascript', 'swift', 'go']`

### `languages(lang=null)`

If no language given returns an array of language objects, if a language is provided an object containing the given language is returned.

### `concepts(lang=null, category_id=null)`

If no parameters specified, returns all concepts for all languages. Specifying a language returns only concepts related to this language, and spefying a category id (with a language) will give a list of language-specific concepts in a given category.

### `search(query)`

Chainable with the concepts() function. Allows you to search for a certain concept. Note that this is only valid if you are chaining with concept() or concept(lang), the API currently does not allow search through categories or langauges.

### `limit(limit)`

Limit the number of results from the call:

```javascript
db.concepts().limit(10).query().then( data => {
  console.log('data')
}).catch( err => {throw err})
```

### `fields(fields)`

Specify the fields you want the API to return for the given set of objects. Function accepts an array of strings specifying the fields to include: 

```javascript
db.categories('python').fields(['id', 'category_name', 'category_search']).query().then( data => {
  console.log(data)
}).catch( err => { throw err })
```

### `sort(field, reverse=false)`

Specify a field you want to sort the results from. You can also specify a reverse boolean, which is set to false by default.

```javascript
db.categories('java').sort('id', true).query().then( data => {
  console.log('data')
}).catch( err => {throw err})
```

## Notes

I'm not affiliated at all with syntax-db...just think it's a great site! Any contributions are welcome! :)
