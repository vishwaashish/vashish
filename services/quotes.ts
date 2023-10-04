// const quote = require('./../assets/json/quotes.json')
import quote from './../assets/json/quotes.json'

export const getQuotes = async () => {
    console.log(quote)
  const response = await fetch('./../assets/json/quotes.json')
  console.log('response', response)
  return await response.json()
}
