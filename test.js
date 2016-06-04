//require the library
const conn = require('./syntaxdb.js'), request = require('request')
// import ava (yay es6)
import test from 'ava'

// function to help generate test data
function promiseQuery(query) {
  return new Promise((resolve, reject) => {
    request(query, (err, res, body) => {
      if (err) reject(err)
      resolve(JSON.parse(body))
    })
  })
}

/** See if you can retrieve the categories for a language */
test('categories', async t => {
  let languages = await promiseQuery('https://syntaxdb.com/api/v1/languages?fields=language_permalink')
  languages = languages.map( (el) => {return el.language_permalink})
  for (let lang of languages) {
    const categories = await conn.categories(lang).query()
    const res = await promiseQuery(`https://syntaxdb.com/api/v1/languages/${lang}/categories`)
    t.deepEqual(categories, res, `The ${lang} categories are not the same`)
  }
})

// query the database
//conn.categories('python')
  //.limit(2)
  //.sort('id', true)
  //.query()
  //.then( data => {
    ////console.log(data)
//}).catch( err => {throw err})

//conn.languages().sort('language_name', true).query().then(data => {
  ////console.log(data)
//}).catch(err => {throw err})

//conn.languages('python').fields(['id', 'language_name']).query().then(data => {
  ////console.log(data)
//}).catch(err => {throw err})

//conn.concepts('python').query().then( data => {
  ////console.log(data)
//}).catch(err => {throw err})

//conn.search('function').query().then( data => {
  ////console.log(data)
//}).catch(err => {throw err})
