import React from 'react'
import Navbar from '../components/Navbars/IndexNavbar';
import Contact from './contactUs/Contact';
import logo1 from '../assets/img/human.jpg';

export default function PrivacySettings() {
  const human = logo1;
  return (
    <>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={human} style={{width: '400px', height: '400px'}} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Keep Commerce Human</h1>
            <h3 className="py-6 text-xl">
              Baazar is the global marketplace for unique and creative goods. It’s home to a universe of special, extraordinary items, from unique handcrafted pieces to vintage treasures.

              In a time of increasing automation, it’s our mission to keep human connection at the heart of commerce.
            </h3>
            <h3 className="py-6 text-xl">
            That’s why we built a place where creativity lives and thrives because it’s powered by people. We help our community of sellers turn their ideas into successful businesses. Our platform connects them with millions of buyers looking for an alternative—something special with a human touch, for those moments in life that deserve imagination.
            </h3>
            <h3 className="py-6 text-xl">
            As a company, we strive to lead with our guiding principles and to help spread ideas of sustainability and responsibility whose impact can reach far beyond our own business.
            </h3>
          </div>
        </div>
      </div>
      <Contact show={false} />
    </>
  )
}
