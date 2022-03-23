import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from "../../components/utils/notification/Notification";
import {dispatchLogin} from "../../redux/actions/authAction";
import {useDispatch} from 'react-redux'

const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}

export default function Login() {
  
  const [user, setUser] = useState(initialState)
  const dispatch = useDispatch()
  const history = useHistory()

  const {email, password, err, success} = user
  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
  }


  const handleSubmit = async e => {
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:5000/user/login', {email, password})
      setUser({...user, err:'', success: res.data.msg})
      localStorage.setItem('fistLogin', true)
      dispatch(dispatchLogin())
      history.push("/")
    }catch(err){
      err.response.data.msg &&
      setUser({...user, err: err.response.data.msg, success: ''})
    }

  }


  return (
      <>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      Sign in with
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
                    <small>Or sign in with credentials</small>
                  </div>
                  {err && showErrMsg(err)}
                  {success && showSuccessMsg(success)}
                  <form onSubmit={handleSubmit}>
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
                          id="email"
                          value={email}
                          name="email"
                          onChange={handleChangeInput}
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
                          id="password"
                          value={password}
                          name="password"
                          onChange={handleChangeInput}
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
                        Remember me
                      </span>
                      </label>
                    </div>

                    <div className="text-center mt-6">
                      <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type="submit"
                          value="login"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <Link to="/forogt_password" className="text-blueGray-200">
                    <small>Forgot password</small>
                  </Link>
                </div>
                <div className="w-1/2 text-right">
                  <Link to="/auth/register" className="text-blueGray-200">
                    <small>Create new account</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}
