import React from 'react'
import Navbar from '../components/Navbars/IndexNavbar';
import Contact from './contactUs/Contact';

export default function AboutUs() {
    return (
        <>
            <Navbar />
            <div className="hero min-h-screen bg-base-200 mt-4">
                <div className="hero-content flex-col lg:flex-row">
                    <img src='http://radtm.com/wp-content/uploads/2019/11/about-us.png' style={{ width: '400px', height: '400px' }} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-5xl font-bold">Privacy Policy</h1>
                        <h3 className="py-6 text-xl">
                            Baazar is the global marketplace for unique and creative goods. It’s home to a universe of special, extraordinary items, from unique handcrafted pieces to vintage treasures.

                            In a time of increasing automation, it’s our mission to keep human connection at the heart of commerce.

                        </h3>
                        <h3 className="py-6 text-xl">
                            We have appropriate security measures in place to prevent your personal data from being accidentally lost, unauthorized use or access, modification or disclosure.

                            In addition, we restrict access to your personal data to those employees, agents, contractors and other third parties who need to know that data in order to perform their duties.                         </h3>
                        <h3 className="py-6 text-xl">
                            They will only process your personal data on our instructions and are subject to a duty of confidentiality.

                            We have procedures in place to deal with any suspected breach of personal data and will notify you and any relevant regulatory body of any breach where we are legally required to do so.                        </h3>
                    </div>
                </div>
            </div>
            <Contact show={false} />
        </>
    )
}
