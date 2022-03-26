import React, { useState, useEffect } from 'react';
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import * as api from '../../api/Api';
import jwt from "jsonwebtoken";
import axios from "axios";

export const SendComplaint = () => {
  //Define here local state that store the form Data
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [userId, setUser] = useState("");

 async function getUser(){
  const req = await fetch('http://localhost:1337/api/user',{
    headers:{
      'x-access-token': localStorage.getItem('token')
    }
  });
  const data = await req.json();
   if (data.status === 'ok'){
    setUser(data.id);
    console.log(userId);
  }else{
    alert(data.error);
    window.location.href = '/auth';
  }
 }
  const handleSubmite = () => {
    const Credentials = { type, image, description ,userId}
    const result = api.createComplaint(Credentials)
      .then(response => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          alert(message, status)
        }
        else {
          alert(message)
          window.location.reload()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleUpload = () => {
    console.log("handle upload")
    axios.post('http://localhost:1337/image-upload',image)
    .then(res => { console.log('Axios response: ',res)})
  }
  const handleFileInput = (e) => {
    console.log('handleFileInput working!')
    console.log(e.target.files[0]);
    const formData = new FormData(); 
    formData.append('my-image-file', e.target.files[0], e.target.files[0].name);
    const filelocation = 'my-image-file' + '_dateVal_'+Date.now()+ e.target.files[0].name.toString();
    setImage(filelocation.toString());
    console.log(filelocation);
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem('token');
      }else {
        getUser();
      }
    }

  },[]);
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
                Submit A Complaint
              </h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                We're sorry you've had a less than
                perfect experience
                Please tell us more so we can resolve the
                issue and improve
              </p>
            </div>
          </div>
        </div>
      </section>





      <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <div className="flex-auto p-5 lg:p-10">
                  <div className="relative w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Problem Type"
                    >
                      Problem Type
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Select Your Problem"
                      name="problemType"
                      // value={problemType}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Screen Shot"
                    >
                      Upload Your Screen Shot
                    </label>
                    {/* <input
                      type="file"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Upload Your Screen Shot"
                      name="image"
                      // value={image}
                      onChange={getFileInfo} />
                      <button onClick={handleUpload}>Upload</button> */}
                      <button onClick={handleUpload}>Upload!</button>
                      <input type="file" onChange={handleFileInput}/>
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
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={handleSubmite}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};