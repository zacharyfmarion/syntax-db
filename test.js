//require the library
const conn = require('./syntaxdb.js')

// query the database
conn.categories('python')
  .limit(2)
  .sort('id', true)
  .query()
  .then( data => {
    console.log(data)
}).catch( err => {throw err})

conn.languages().sort('language_name', true).query().then(data => {
  //console.log(data)
}).catch(err => {throw err})

conn.languages('python').fields(['id', 'language_name']).query().then(data => {
  //console.log(data)
}).catch(err => {throw err})

conn.concepts('python').query().then( data => {
  //console.log(data)
}).catch(err => {throw err})

conn.search('function').query().then( data => {
  //console.log(data)
}).catch(err => {throw err})
