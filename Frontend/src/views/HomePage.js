import React from 'react'
import Navbar from '../components/Navbars/IndexNavbar';
import Carousel from '../components/HomePage/Carousel';
import Stats from '../components/HomePage/Stats';
import Footer from '../components/Footers/Footer';


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
      <Stats />
      <br />
      <br />
      <Footer />

      <link href="https://cdn.jsdelivr.net/npm/daisyui@2.14.2/dist/full.css" rel="stylesheet" type="text/css" />
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
    </>
  )
}
