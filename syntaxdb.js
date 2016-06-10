const Client = require('node-rest-client').Client;
const client = new Client()

class SyntaxDB {
  constructor()	{
    this.base = 'https://syntaxdb.com/api/v1/'	
    this.url = this.base
    this.valid_search_urls = [ `${this.base}concepts/search`]
    for (let lang of ['java', 'c', 'cpp', 'csharp', 'python', 'ruby', 'javascript', 'swift', 'go']){
      this.valid_search_urls.push(`${this.base}languages/${lang}/concepts/search`) 
    }
  }

  // Function to query the database over rest
  query() {
    let _this = this
    return new Promise((resolve, reject) => {
      client.get(_this.url, (data, res) => {
        resolve(data) 
      }).on('error', err => { reject(err) })
      //request(_this.url, (err, res, body) => {
        //if (err) reject(err)
        //resolve(JSON.parse(body))
      //}) 
    })
  }

  // CATEGORY
  categories(lang) {
    return this.resetUrl(`languages/${lang}/categories`)
  }

  // LANGUAGES
  languages(lang=null) {
    return lang ? this.resetUrl(`languages/${lang}`) : this.resetUrl(`languages`)
  }

  //CONCEPTS
  concepts(lang=null, category_id=null) {
    if (lang && category_id) {
      return this.resetUrl(`languages/${lang}/categories/${category_id}/concepts`) 
    }else if(lang && !category_id){ 
      return this.resetUrl(`languages/${lang}/concepts`)
    }else{
      return this.resetUrl(`concepts`)
    }
  }

  // QUERY PARAMETERS

  // SEARCH
  // will only search if coming from concepts
  // note that search must be before any other function chains
  search(query) { 
    const search_url = this.url + '/search'
    if (this.valid_search_urls.indexOf(search_url) > -1) {
      this.url += '/search'
      this.addParam(`q=${query}`)
      return this
    }else{
      throw new Error("You cannot search in this query") 
    }
  }

  // limit the number of results
  limit(limit) {
    this.addParam(`limit=${limit}`)
    return this
  }

  // takes an array of fields
  fields(fields){
    this.addParam(`fields=${fields.join(',')}`)
    return this
  }

  // specify sort ordering
  sort(field, reverse=false) {
    let param = !reverse ? `sort=${field}` : `sort=-${field}`
    this.addParam(param)
    return this
  }


  // HELPER FUNCTIONS
  // -----------------------------------------------------

  // reset the url to the base and add a new path
  resetUrl(path) {
    this.url = this.base + path 
    return this
  }
  
  // check whether the url already has parameters
  hasParams(){
    return this.url.replace(this.base, '').includes('?')
  }

  stripParams(){
    return this.url.replace(/\?.*/, '') 
  }

  // Add a parameter to the url string
  addParam(param) {
    this.url += this.hasParams() ? `&${param}` : `?${param}`  
  }

}

// export the object
module.exports = new SyntaxDB()
