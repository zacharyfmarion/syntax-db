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
  // plan to test for each language
  t.plan(languages.length)
  for (let lang of languages) {
    const categories = await conn.categories(lang).query()
    const res = await promiseQuery(`https://syntaxdb.com/api/v1/languages/${lang}/categories`)
    t.deepEqual(categories, res, `The ${lang} categories are not the same`)
  }
})

test('languages with not language specified', async t => {
  const languages = await conn.languages().query() 
  const res = await promiseQuery(`https://syntaxdb.com/api/v1/languages`)
  t.deepEqual(languages, res)
})

test('languages with language specified', async t => {
  let languages = await promiseQuery('https://syntaxdb.com/api/v1/languages?fields=language_permalink')
  languages = languages.map( (el) => {return el.language_permalink})
  // plan to test for each language
  t.plan(languages.length)
  for (let lang of languages) {
    const languages = await conn.languages(lang).query() 
    const res = await promiseQuery(`https://syntaxdb.com/api/v1/languages/${lang}`)
    t.deepEqual(languages, res)
  }
})

test('concepts without lang or category specified', async t => {
  const concepts = await conn.concepts().query() 
  const res = await promiseQuery(`https://syntaxdb.com/api/v1/concepts`)
  t.deepEqual(concepts, res)
})

test('concepts with lang specified', async t => {
  let languages = await promiseQuery('https://syntaxdb.com/api/v1/languages?fields=language_permalink')
  languages = languages.map( (el) => {return el.language_permalink})
  // plan to test for each language
  t.plan(languages.length)
  for (let lang of languages) {
    const concepts = await conn.concepts(lang).query() 
    const res = await promiseQuery(`https://syntaxdb.com/api/v1/languages/${lang}/concepts`)
    t.deepEqual(concepts, res)
  }
})

test('concepts with lang and category_id specified', async t => {
  let languages = await promiseQuery('https://syntaxdb.com/api/v1/languages?fields=language_permalink')
  languages = languages.map( (el) => {return el.language_permalink})
  // plan to test for each language
  t.plan(languages.length)
  for (let lang of languages) {
    const all_concepts = await promiseQuery(`https://syntaxdb.com/api/v1/languages/${lang}/concepts`)
    const cat_id = all_concepts[0].category_id
    const res = all_concepts.filter(val => { return val.category_id == cat_id})
    const concepts = await conn.concepts(lang, cat_id).query() 
    t.deepEqual(concepts, res)
  }
})

test.skip('search without language', async t => {
  
})
 
test.skip('search with language', async t => {
  
})

test.skip('limit', async t => {

})

test.skip('fields', async t => {

})

test.skip('sort', async t => {

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
