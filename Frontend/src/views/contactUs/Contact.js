import React from 'react';
import Navbar from "components/Navbars/AuthNavbar.js";
import { Link } from 'react-router-dom';


export default function Contact() {
  const [description, setDescription] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [userId, setUserId] = React.useState('');
  return (
    <>
      <Navbar transparent />
      <section className="pb-20 relative block bg-blueGray-800">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-800 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold text-white">
                Contact Us
              </h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                If you have any questions or queries a member of
                staff will always be happy to help. Feel free to
                contact us by telephone or email and we will be sure
                to get back to you as soon as possible.
              </p>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">Or</p>
              <Link to="/complaint" className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">Send Complaint</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <div className="flex-auto p-5 lg:p-10">
                <div className="flex flex-col w-full lg:flex-row">
                <label className="block uppercase text-blueGray-800 text-xs font-bold mb-2">Phone:<label className="text-blueGray-500 text-xs font-bold mb-2"> +216 22 333 444</label></label>
                </div>
                <div className="flex flex-col w-full lg:flex-row">
                <label className="block uppercase text-blueGray-800 text-xs font-bold mb-2">Email:<label className="text-blueGray-500 text-xs font-bold mb-2"> info@baazar.com</label></label>
                </div>
                <div className="flex flex-col w-full lg:flex-row">
                <label className="block uppercase text-blueGray-800 text-xs font-bold mb-2">Address:<label className="text-blueGray-500 text-xs font-bold mb-2"> Anywhere everywhere</label></label>
                </div>
                </div>
              </div>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <div className="flex-auto p-5 lg:p-10">
                <div className="flex flex-col w-full lg:flex-row">
                <label className="block uppercase text-blueGray-800 text-xs font-bold mb-2">Phone:<label className="text-blueGray-500 text-xs font-bold mb-2"> +216 22 333 444</label></label>
                </div>
                <div className="flex flex-col w-full lg:flex-row">
                <label className="block uppercase text-blueGray-800 text-xs font-bold mb-2">Email:<label className="text-blueGray-500 text-xs font-bold mb-2"> info@baazar.com</label></label>
                </div>
                <div className="flex flex-col w-full lg:flex-row">
                <label className="block uppercase text-blueGray-800 text-xs font-bold mb-2">Address:<label className="text-blueGray-500 text-xs font-bold mb-2"> Anywhere everywhere</label></label>
                </div>
                </div>
              </div>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <div className="flex-auto p-5 lg:p-10">
                <div className="flex flex-col w-full lg:flex-row">
                <label className="block uppercase text-blueGray-800 text-xs font-bold mb-2">Phone:<label className="text-blueGray-500 text-xs font-bold mb-2"> +216 22 333 444</label></label>
                </div>
                <div className="flex flex-col w-full lg:flex-row">
                <label className="block uppercase text-blueGray-800 text-xs font-bold mb-2">Email:<label className="text-blueGray-500 text-xs font-bold mb-2"> info@baazar.com</label></label>
                </div>
                <div className="flex flex-col w-full lg:flex-row">
                <label className="block uppercase text-blueGray-800 text-xs font-bold mb-2">Address:<label className="text-blueGray-500 text-xs font-bold mb-2"> Anywhere everywhere</label></label>
                </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <div className="flex-auto p-5 lg:p-10">
                  {/* <Alert message="Complaint Sended Successfully" backgroundColor={color} show={show} /> */}
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Problem Type"
                    >
                      Full Name
                    </label>
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                      <i className="fa fa-mail-bulk"></i>
                    </span>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Select Your Problem"
                      name="problemType"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Problem Type"
                    >
                      E-mail
                    </label>
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Select Your Problem"
                      name="problemType"
                      // value={problemType}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Problem Type"
                    >
                      Phone
                    </label>
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                      <i className="fas fa-exclamation-circle"></i>
                    </span>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Select Your Problem"
                      name="problemType"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="message"
                    >
                      Description
                    </label>
                    <textarea
                      rows="4"
                      cols="80"
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Type your message..."
                      name="description"
                      // value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <div className="flex-auto p-5 lg:p-10">
                 <img src="https://wwz.ifremer.fr/var/storage/images/_aliases/opengraphimage/medias-ifremer/medias-bluerevolution/contact-us/1811720-1-eng-GB/Contact-us.png" alt="" />
                 <img src="https://www.newlightziwaschools.sc.ke/wp-content/uploads/2020/07/Contact-Us.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

