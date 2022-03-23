import React from "react";
import {useState} from "react";
import {showErrMsg, showSuccessMsg} from "../../components/utils/notification/Notification";
import axios from "axios";
import {isEmpty, isEmail, isLength, isMatch} from '../../components/utils/validation/Validation'

const initialState = {
  name: '',
  email: '',
  password: '',
  cf_password: '',
  address:'',
  city: '',
  state: '',
  zip: '',
  country: '',
  telephone: '',
  err: '',
  success: ''
}
export default function Register() {
  const [user, setUser] = useState(initialState)

  const {name,email, password, cf_password,address,city,state,zip,country,telephone,err, success} = user
  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
  }


  const handleSubmit = async e => {
    e.preventDefault()
    if(isEmpty(name) ||isEmpty(password) ||isEmpty(address) ||isEmpty(city) ||isEmpty(state) ||isEmpty(zip)  ||isEmpty(country) ||isEmpty(telephone)  )
      return setUser({...user, err: "Please fill in all fields", success:''})
    if(!isEmail(email))
      return setUser({...user, err: "Invalid Email", success:''})
    if(isLength(password))
      return setUser({...user, err: "Password must be at least 6 characters", success:''})
    if(!isMatch(password ,cf_password))
      return setUser({...user, err: "Password did not match", success:''})
    try{
        const res = await axios.post('http://localhost:5000/user/register',{
          name,email, password,address,city,state,zip,country,telephone
        })
      setUser({...user, err:'', success: res.data.msg})
    }catch(err){
      err.response.data.msg &&
      setUser({...user, err: err.response.data.msg, success: ''})
    }

  }

  return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Sign up with
                    </h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <button
                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                    >
                      <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("assets/img/github.svg").default}
                      />
                      Github
                    </button>
                    <button
                        className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                    >
                      <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("assets/img/google.svg").default}
                      />
                      Google
                    </button>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>Or sign up with credentials</small>
                  </div>
                  {err && showErrMsg(err)}
                  {success && showSuccessMsg(success)}
                  <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Name
                      </label>
                      <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Name"
                          id="name" value={name} name="name" onChange={handleChangeInput}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Email
                      </label>
                      <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Email"
                          id="email" value={email} name="email" onChange={handleChangeInput}
                      />
                    </div>



                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Password
                      </label>
                      <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Password"
                          id="password" value={password} name="password" onChange={handleChangeInput}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Confirm password
                      </label>
                      <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Confirm password"
                          id="cf_password" value={cf_password} name="cf_password" onChange={handleChangeInput}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Address
                      </label>
                      <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Address"
                          id="address" value={address} name="address" onChange={handleChangeInput}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        City
                      </label>
                      <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="City"
                          id="city" value={city} name="city" onChange={handleChangeInput}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        State
                      </label>
                      <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="State"
                          id="state" value={state} name="state" onChange={handleChangeInput}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Zip/Postal code
                      </label>
                      <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Zip/Postal code"
                          id="zip" value={zip} name="zip" onChange={handleChangeInput}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Country
                      </label>
                      <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Country"
                          id="country" value={country} name="country" onChange={handleChangeInput}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                      >
                        Telephone
                      </label>
                      <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          placeholder="Telephone number"
                          id="telephone" value={telephone} name="telephone" onChange={handleChangeInput}
                      />
                    </div>


                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                          <a
                              href="#pablo"
                              className="text-lightBlue-500"
                              onClick={(e) => e.preventDefault()}
                          >
                          Privacy Policy
                        </a>
                      </span>
                      </label>
                    </div>


                    <div className="text-center mt-6">
                      <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                      >
                        Create Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
