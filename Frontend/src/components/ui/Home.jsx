import React from 'react'
import HeroSlider from '../HeroSlider'
import Carousel from './Carousel'
import CategorySection from '../CategorySection'
import ProductSection from '../ProductSection'

const Home = () => {
  return (
    <div className='h-full w-full bg-[#FAF9F7]'>
      {/* Carousel */}
      <div>
        <Carousel/>
      </div>
      {/* Hero Slider */}
      <div>
        <HeroSlider/>
      </div>
      {/* Categories */}
      <div>
        <CategorySection/>
      </div>
      <div>
        <ProductSection/>
      </div>
    </div>
  )
}

export default Home