import React, { useState, useEffect} from 'react';
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import * as api from '../../api/Api';
import axios from "axios";
import { Image } from 'cloudinary-react';
import Alert from '../../components/Alert/Alert';
import {fetchUser,dispatchGetUser} from '../../redux/actions/authAction';
import {useDispatch, useSelector} from "react-redux";

export default function SendComplaint () {
  //Define here local state that store the form Data
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("User Not Connected");
  const [connected, setConnceted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [color, setColor] = useState("");
  const [show, setShow] = useState("no");
  const [publicId, setPublicId] = useState("");
  const[imgShow , setImgShow] = useState("null");
  const [Categorie, setCategorie] = useState("");


  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)
  const{user, isAdmin} = auth
  const [callback , setCallback] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if(token){
      fetchUser(token).then(res =>{
        dispatch(dispatchGetUser(res))
        setUserId(res.data._id)
        setEmail(res.data.email)
        setConnceted(true)       
      })
    }
  },[token, isAdmin, dispatch, callback])

  const PostImage = () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "qysdlxzm");

    axios.post(
      "https://api.cloudinary.com/v1_1/du8mkgw6r/image/upload",
      formData,
    ).then((response) => {
      console.log(response);
      const result = response.data;
      setImage(result.secure_url);
      setImgShow("yes");
      setPublicId(result.public_id);
    });
  }
  const DeleteImage = async() => {
    setImgShow("null");
  }
  const handleSubmite = () => {
    const credentials = { type, description, image, email, userId };
    api.createComplaint(credentials)
      .then(response => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          setColor("red");
          setShow("yes");
        }
        else {
          setColor("green");
          setShow("yes");  
          window.location.reload()
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

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
                  <Alert message="Complaint Sended Successfully" backgroundColor={color} show={show} />
                  <div className="relative w-full mb-3 mt-8" hidden={connected}>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Problem Type"
                    >
                      E-mail
                    </label>
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                      <i className="fa fa-mail-bulk"></i>
                    </span>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Select Your Problem"
                      name="problemType"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Problem Type"
                    >
                      Problem Type
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
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>

                  <div className="relative w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Problem Type"
                    >
                      Categorie
                    </label>
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
                    <i className="fas fa-calendar-check"></i>                    </span>
                    <select onChange={(e) => setCategorie(e.target.value)}
                    className="border-0 px-3 py-3  text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                          >
                      <option value="">Select Your Categorie</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="Screen Shot"
                    >
                      Upload Your Screen Shot
                    </label>
                    <div>
                      {imgShow !="null"
                      ? <Image cloudName="du8mkgw6r" publicId={image} /> : null
                      }      
                    </div>
                    <input
                      type="file"
                      placeholder="Upload Your Screen Shot"
                      onChange={(event) => {
                        setSelectedImage(event.target.files[0])
                      }} />
                    <button onClick={PostImage} className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-3 py-2">Upload</button>
                    <button onClick={DeleteImage} className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-3 py-2">Delete</button>
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
                    {/* <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={handleSubmite}
                    >
                      Send
                    </button> */}
                    <button class="btn" onClick={handleSubmite}>Send</button>
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
}