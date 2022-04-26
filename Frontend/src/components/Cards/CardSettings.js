import React, {useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import {isLength, isMatch} from "../utils/validation/Validation";

// components
const initialState = {
  name: '',
  password: '',
  address: '',
  email: '',
  city: '',
  country: '',
  zip: '',
  cf_password: '',
  err: '',
  success: ''
}


export default function CardSettings() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)


  const{user} = auth
  const [data,setData] = useState(initialState)
  const {name, email,password, city,zip,country,address, cf_password} = data
  const [avatar, setAvatar] = useState(false)
  const [loading, setLoading] = useState(false)

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
        avatar: avatar ? avatar : user.avatar,
        email: email ? email : user.email,
        city: city ? city : user.city,
        zip: zip ? zip : user.zip,
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
    if(name || avatar || address || country || zip || city) updateInfo()
    if(password) updatePassword()
  }
  return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">My account</h6>
              <span
                  className="absolute -bottom-24 left-0 w-full h-1/2 bg-gray-200 text-center font-normal uppercase text-blueGray-800 transition ease-in-out duration-50 hover:-bottom-1">
                          <i className="fas fa-camera"/>
                          <label htmlFor="file_up" className="cursor-pointer ml-1">Change</label>
                          <input type="file" name="file" id="file_up" className="hidden" onChange={changeAvatar}/>
                        </span>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                User Information
              </h6>

              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                      Email address
                    </label>
                    <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={user.email}
                        name="email" id="email"
                        disabled
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
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
                        name="name" id="name" defaultValue={user.name}
                        onChange={handleChange}/>
                  </div>
                </div>
              </div>

              <hr className="mt-6 border-b-1 border-blueGray-300" />

              <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Contact Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4">
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
                        name="address" id="address" defaultValue={user.address}
                        onChange={handleChange}/>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
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
                        defaultValue={user.city}
                        name="city" id="city"
                        onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
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
                        defaultValue={user.country}
                        name="country" id="country"
                        onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                      Postal Code
                    </label>
                    <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        defaultValue={user.zip}
                        name="zip" id="zip"
                        onChange={handleChange}
                    />
                  </div>
                  <button disabled={loading} onClick={handleUpdate}>Update</button>

                </div>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </form>
          </div>
        </div>
      </>
  );
}
