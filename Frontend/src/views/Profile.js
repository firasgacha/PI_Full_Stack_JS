import React, {useEffect, useState} from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import {isLength, isMatch} from "components/utils/validation/Validation"
import {showSuccessMsg, showErrMsg} from "components/utils/notification/Notification"
import {fetchAllUsers,dispatchGetAllUsers} from "../redux/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Link} from "react-router-dom";


const initialState = {
  name: '',
  password: '',
  address: '',
  cf_password: '',
  err: '',
  success: ''
}

export default function Profile() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)


  const{user, isAdmin} = auth
  const [data,setData] = useState(initialState)
  const {name, email,password, address, cf_password, err, success} = data
  const [avatar, setAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [callback , setCallback] = useState(false)

  const dispatch = useDispatch()
  useEffect(() => {
    if(isAdmin){
      fetchAllUsers(token).then(res =>{
        dispatch(dispatchGetAllUsers(res))
      })
    }
  },[token, isAdmin, dispatch, callback])

  const changeAvatar = async(e) => {
    e.preventDefault()
    try {
      const file = e.target.files[0]

      if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

      if(file.size > 1024 * 1024)
        return setData({...data, err: "Size too large." , success: ''})

      if(file.type !== 'image/jpeg' && file.type !== 'image/png')
        return setData({...data, err: "File format is incorrect." , success: ''})

      let formData =  new FormData()
      formData.append('file', file)

      setLoading(true)
      const res = await axios.post('/api/upload_avatar', formData, {
        headers: {'content-type': 'multipart/form-data', Authorization: token}
      })

      setLoading(false)
      setAvatar(res.data.url)

    } catch (err) {
      setData({...data, err: err.response.data.msg , success: ''})
    }
  }
  const handleChange = e => {
    const {name, value} = e.target
    setData({...data, [name]: value, err: '', success: ''})
  }
  const updateInfo = () => {
    try {
          axios.patch('/user/update',{
            name: name ? name : user.name,
            address: address ? address: user.address,
            avatar: avatar ? avatar : user.avatar
          },{
            headers: {Authorization: token}
          })

      setData({...data, err: '' , success: "Updated Success!"})

    }catch(err){
      setData({...data, err: err.response.data.msg , success: ''})
    }
  }

  const updatePassword = () => {
    if(isLength(password))
      return setData({...data, err: "Password must be at least 6 characters.", success: ''})

    if(!isMatch(password, cf_password))
      return setData({...data, err: "Password did not match.", success: ''})

    try {
      axios.post('/user/reset', {password},{
        headers: {Authorization: token}
      })

      setData({...data, err: '' , success: "Updated Success!"})
    } catch (err) {
      setData({...data, err: err.response.data.msg , success: ''})
    }
  }

  const handleUpdate = () => {
    if(name || avatar || address) updateInfo()
    if(password) updatePassword()
  }

  const handleDelete = async (id) => {
    try {
      if(user._id !== id){
        if(window.confirm("Are you sure you want to delete this account?")){
          setLoading(true)
          await axios.delete(`/user/delete/${id}`, {
            headers: {Authorization: token}
          })
          setLoading(false)
          setCallback(!callback)
        }
      }

    } catch (err) {
      setData({...data, err: err.response.data.msg , success: ''})
    }
  }

  return (
      <>
        <Navbar transparent />
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                      "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                }}
            >
            <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
            ></span>
            </div>
            <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
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
                    className="text-blueGray-200 fill-current"
                    points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-36 h-36 relative m-4 rounded bg-white">
                        <img
                            alt="..."
                            src={avatar ? avatar : user.avatar}
                            className="w-full h-full object-cover display-block bg-white"
                        />
                      <span className="absolute -bottom-24 left-0 w-full h-1/2 bg-gray-200 text-center font-normal uppercase text-blueGray-800 transition ease-in-out duration-50 hover:-bottom-1">
                          <i className="fas fa-camera"></i>
                          <label for="file_up" className="cursor-pointer ml-1">Change</label>
                          <input type="file" name="file" id="file_up" className="hidden" onChange={changeAvatar}/>
                        </span>

                    </div>
                  </div>

                  <div className="text-center mt-12">
                    <div>
                      {err && showErrMsg(err)}
                      {success && showSuccessMsg(success)}
                      {loading && <h3>Loading.....</h3>}
                    </div>
                    <div className="my-2">
                      <label className="block text-sm font-normal leading-normal text-blueGray-700 mb-2">Name</label>
                      <input className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150 ml-2" type="text" name="name" id="name" defaultValue={user.name}
                             placeholder="Your name" onChange={handleChange}/>
                    </div>
                    <div className="my-2">
                      <label className="block text-sm font-normal leading-normal mb-2 text-blueGray-700 mb-2">E-mail</label>
                      <input className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150 ml-2" type="email" name="email" id="email" defaultValue={user.email}
                            disabled  />
                    </div>
                    <div className="my-2">
                      <label className="block text-sm font-normal leading-normal mb-2 text-blueGray-700 mb-2">Address</label>
                      <input className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150 ml-2" type="text" name="address" id="address" defaultValue={user.address}
                               placeholder="Your Address"  onChange={handleChange}/>
                    </div>
                    <div className="my-2">
                      <label className="text-sm font-normal leading-normal mb-2 text-blueGray-700 mb-2 block">Password</label>
                      <input  className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150 ml-2" type="password"  name="password" id="password"
                          value={password}   placeholder="New password"  onChange={handleChange}/>
                    </div>
                    <div className="my-2">
                      <label className="text-sm block font-normal leading-normal mb-2 text-blueGray-700 mb-2">Confirm password</label>
                      <input className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150 ml-2" type="password" name="cf_password" id="cf_password"
                            value={cf_password} placeholder="Confirm password" onChange={handleChange}/>
                    </div>
                    <div>
                      <em style={{color: "crimson"}}>
                        * If you update your password here, you will not be able
                        to login quickly using google and facebook.
                      </em>
                    </div>
                    <button disabled={loading} onClick={handleUpdate}>Update</button>

                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <div style={{overflowX: "auto"}}>
                          <table className="customers">
                            <thead>
                            <tr>
                              <th className="ml-2">ID</th>
                              <th className="ml-2">Name</th>
                              <th className="ml-2">Email</th>
                              <th className="ml-2">Admin</th>
                              <th className="ml-2">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                              users.map(user => (
                                  <tr key={user._id}>
                                    <td className="px-2">{user._id}</td>
                                    <td className="px-2">{user.name}</td>
                                    <td className="px-2">{user.email}</td>
                                    <td className="px-2">
                                      {
                                        user.role === 1
                                            ? <i className="fas fa-check cursor-pointer" title="Admin"></i>
                                            : <i className="fas fa-times cursor-pointer" title="User"></i>
                                      }
                                    </td>
                                    <td className="px-2">
                                      <Link to={`/edit_user/${user._id}`} className="px-2">
                                        <i className="fas fa-edit cursor-pointer" title="Edit"></i>
                                      </Link>
                                      <i className="fas fa-trash-alt cursor-pointer" title="Remove"
                                         onClick={() => handleDelete(user._id)} ></i>
                                    </td>
                                  </tr>
                              ))
                            }
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
  );
}
