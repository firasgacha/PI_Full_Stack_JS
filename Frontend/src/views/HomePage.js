import React from 'react'
import Navbar from '../components/Navbars/IndexNavbar';



export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="https://media.mytek.tn/media/webp_image/wysiwyg/banner/Avrl22/slider-selection-laptop-hp-lenovo-asus-celeron.webp" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">❮</a>
            <a href="#slide2" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="https://media.mytek.tn/media/webp_image/wysiwyg/banner/Avrl22/slider-smartphone-samsung-2refs-3.webp" className="w-full"  />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">❮</a>
            <a href="#slide3" className="btn btn-circle">❯</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="https://media.mytek.tn/media/webp_image/wysiwyg/banner/Avrl22/slider-hp-amd-rayezn-desktop.webp" className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">❮</a>
            <a href="#slide4" className="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-5">
          <h1 className="text-3xl font-bold text-center">
            Welcome to the best platform Baazar!
          </h1>
          <h2 className="text-xl font-bold text-center">
            Find the best products in the world!
          </h2>
        </div>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@2.14.2/dist/full.css" rel="stylesheet" type="text/css" />
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
    </>
  )
}
