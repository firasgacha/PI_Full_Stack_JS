import React from 'react'
import Navbar from '../components/Navbars/IndexNavbar';
import Carousel from '../components/HomePage/Carousel';
import Stats from '../components/HomePage/Stats';
import Footer from '../components/Footers/Footer';
import CarouselProducts from '../components/Product/CarouselProducts';
import 'flowbite';
import Contact from './contactUs/Contact';

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
      <div class="carousel w-full">
        <div id="item1" class="carousel-item w-full">
          <img src="https://media.mytek.tn/media/webp_image/wysiwyg/banner/Avrl22/pc-portable-gamer-msi-1290-252px-2.webp" class="w-full" />
        </div>
      </div>
      <br />
      <Stats />
      <br />
      <br />

      <br />
      <Contact show={false} />
      <Footer />
    </>
  )
}
