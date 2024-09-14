"use client" 
import { scrapeAndStoreProduct } from '@/lib/actions'
import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url'
import React, {FormEvent, useState} from 'react'

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url)
    const hostname = parsedURL.hostname

      if (hostname.includes('amazon.com') ||
          hostname.includes('amazon') ||
          hostname.endsWith('amazon')
      ) {return true}

  } catch (error) {
    return false
  }
  return false
}

const SearchBar = () => {

 
  

  const [searchPrompt, setSearchPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const isValidLink = isValidAmazonProductURL(searchPrompt)

    if (!isValidLink) {
      return alert('Please enter a valid Amazon Product URL')
    }
    
    try {
      setIsLoading(true)

      // scrape the product page
      const product = await scrapeAndStoreProduct(searchPrompt)

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  return (
    <form
     className='flex flex-wrap gap-4 mt-12'
      onSubmit={handleSubmit}>

        <input
          type='text'
          value={searchPrompt}
          onChange={(e) => setSearchPrompt(e.target.value)}
          className='searchbar-input'
          placeholder='Enter product link'
        />
        <button 
          type='submit' 
          className='searchbar-btn'
          disabled ={searchPrompt === ''}  
          >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
  
    </form>
  )
}
}

export default SearchBar