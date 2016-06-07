const conn = require('./syntaxdb.js')

conn.concepts('python').search('for loops').query().then( data => {
  console.log(data)
}).catch(err => { throw err })

conn.concepts('python').fields(['id']).query().then( data => {
  console.log(data)
}).catch(err => {throw err})
