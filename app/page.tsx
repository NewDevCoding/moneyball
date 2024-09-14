import HeroCarousel from '@/components/HeroCarousel'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <>
      <section className='px-6  md:px-20 py-24 '>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col justify-center '>
            <p className='small-text'>
              Smart Purchasing begins with MoneyBall
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className='head-text'>
              Unleash the power of 
              <span className='text-green-700'> MoneyBall</span>
            </h1>

            <p className='mt-6'>
              Powerful product scraping tools to grow your business
            </p>

            <SearchBar />
          </div>

          <HeroCarousel />
        </div>

      </section>

      <section className='trending-section'>
        <h2 className='section-text'>Trending</h2>

        <div className='flex flex-wrap gap-x-8 gap-y-16'>
          {['Apple Iphone 16', 'book', 'sneakers'].map((product) => (
            <div>{product}</div>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home