import HeroCarousel from '@/components/HeroCarousel'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import { getAllProducts } from '@/lib/actions'
import React from 'react'
import ProductCard from '@/components/productCard'

const Home = async () => {

  const allProducts = await getAllProducts()


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
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default Home