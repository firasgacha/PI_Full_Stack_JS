import React from 'react'
import Navbar from '../components/Navbars/IndexNavbar';
import Carousel from '../components/HomePage/Carousel';
import Stats from '../components/HomePage/Stats';
import CarouselProducts from '../components/Product/CarouselProducts';
import 'flowbite';
import Contact from './contactUs/Contact';
import PromoProducts from '../components/HomePage/PromoProducts';
import DiveIn from '../components/HomePage/DiveIn';
export default function HomePage() {

  return (
    <>
      <Navbar />
      <Carousel />
      <div className="flex flex-col items-center justify-center mt-5">
        <h1 className="text-3xl font-bold text-center">
          Welcome to the best platform Baazar!
        </h1>
        <h2 className="text-xl font-bold text-center">
          Find the best products in the world!
        </h2>
      </div>
      <br />
      <CarouselProducts />
      <br />
      <div className="hero min-h-screen" style={{ backgroundImage: `url("https://api.lorem.space/image/fashion?w=1000&h=800")` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          </div>
        </div>
      </div>
      <DiveIn/>
      <div className="carousel w-full">
        <div id="item1" className="carousel-item w-full">
          <img src="https://media.mytek.tn/media/webp_image/wysiwyg/banner/Avrl22/pc-portable-gamer-msi-1290-252px-2.webp" class="w-full" />
        </div>
      </div>
      <div className="flex flex-col w-full border-opacity-50">
        <div className="grid h-20 card bg-primary rounded-box place-items-center">
          <p className='text-white'>Baazar is powered by 100% renewable electricity.</p>
        </div>
      </div>
      <Stats />
      <br />
      <br />
      <PromoProducts />
      <br />
      <br />
      <br />
      <Contact show={false} />
      <link href="https://cdn.jsdelivr.net/npm/daisyui@2.14.2/dist/full.css" rel="stylesheet" type="text/css" />
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
      <script src="../path/to/flowbite/dist/flowbite.js"></script>
    </>
  )
}
