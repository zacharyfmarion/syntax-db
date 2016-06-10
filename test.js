//require the library
const conn = require('./syntaxdb.js'), Client = require('node-rest-client').Client, client = new Client()
// import ava (yay es6)
import test from 'ava'

// function to help generate test data
function promiseQuery(query) {
  return new Promise((resolve, reject) => {
    client.get(query, (body, res) => {
      resolve(body) 
    }).on('error', err => { throw err })
  })
}

/** See if you can retrieve the categories for a language */
test('categories', async t => {
  let languages = await promiseQuery('https://syntaxdb.com/api/v1/languages?fields=language_permalink')
  languages = languages.map( (el) => {return el.language_permalink})
  // plan to test for each language
  t.plan(languages.length)
  for (let lang of languages) {
    const res = await conn.categories(lang).query()
    const expected = await promiseQuery(`https://syntaxdb.com/api/v1/languages/${lang}/categories`)
    t.deepEqual(res, expected, `The ${lang} categories are not the same`)
  }
})

test('languages with not language specified', async t => {
  const res = await conn.languages().query() 
  const expected = await promiseQuery(`https://syntaxdb.com/api/v1/languages`)
  t.deepEqual(res, expected)
})

test('languages with language specified', async t => {
  let languages = await promiseQuery('https://syntaxdb.com/api/v1/languages?fields=language_permalink')
  languages = languages.map( (el) => {return el.language_permalink})
  // plan to test for each language
  t.plan(languages.length)
  for (let lang of languages) {
    const res = await conn.languages(lang).query() 
    const expected = await promiseQuery(`https://syntaxdb.com/api/v1/languages/${lang}`)
    t.deepEqual(res, expected)
  }
})

test('concepts without lang or category specified', async t => {
  const res = await conn.concepts().query() 
  const expected = await promiseQuery(`https://syntaxdb.com/api/v1/concepts`)
  t.deepEqual(res, expected)
})

test('concepts with lang specified', async t => {
  let languages = await promiseQuery('https://syntaxdb.com/api/v1/languages?fields=language_permalink')
  languages = languages.map( (el) => {return el.language_permalink})
  // plan to test for each language
  t.plan(languages.length)
  for (let lang of languages) {
    const res = await conn.concepts(lang).query() 
    const expected = await promiseQuery(`https://syntaxdb.com/api/v1/languages/${lang}/concepts`)
    t.deepEqual(res, expected)
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
    const expected = all_concepts.filter(val => { return val.category_id == cat_id})
    const res = await conn.concepts(lang, cat_id).query() 
    t.deepEqual(res, expected)
  }
})

test('search without lang', async t => {
  const searches = ['For loops', 'classes', 'variables']
  t.plan(searches.length)
  for (let search of searches) {
    const res = await conn.concepts().search(search).query()
    const expected = await promiseQuery(`https://syntaxdb.com/api/v1/concepts/search?q=${search}`) 
    t.deepEqual(res, expected)
  }
})

test('search with lang', async t => {
  const searches = ['For loops', 'classes', 'variables']
  let languages = await promiseQuery('https://syntaxdb.com/api/v1/languages?fields=language_permalink')
  languages = languages.map( (el) => {return el.language_permalink})
  t.plan(searches.length * languages.length)
  for (let lang of languages) {
    for (let search of searches) {
      const res = await conn.concepts(lang).search(search).query()
      const expected = await promiseQuery(`https://syntaxdb.com/api/v1/languages/${lang}/concepts/search?q=${search}`) 
      t.deepEqual(res, expected)
    }
  }
})

test.skip('fields', async t => {

})

test.skip('sort', async t => {

})

















