import React, {useState} from 'react';
import {isEmail} from '../../components/utils/validation/Validation';
import {showErrMsg, showSuccessMsg} from '../../components/utils/notification/Notification'
import axios from "axios";




    const initialState = {
        email: '',
        err: '',
        success: ''
    }

    function ForgotPassword() {
        const [data, setData] = useState(initialState)

        const {email, err, success} = data

        const handleChangeInput = e => {
            const {name, value} = e.target
            setData({...data, [name]:value, err: '', success: ''})
        }

        const forgotPassword = async () => {
            if(!isEmail(email))
                return setData({...data, err: 'Invalid email.', success: ''})

            try {
                const res = await axios.post('/user/forgot', {email})

                return setData({...data, err: '', success: res.data.msg})
            } catch (err) {
                err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
            }
        }
  return (
      <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
               <div className="relative w-full mb-3">
                   <h2 className="text-2xl font-bold text-center text-blueGray-200 ">Forgot Password</h2>
                   {err && showErrMsg(err)}
                   {success && showSuccessMsg(success)}
                   <label className="block uppercase text-blueGray-200 text-xs font-bold mb-2" htmlFor="grid-password">
                       Enter your email address
                   </label>
                   <input type="email" name="email" id="email" value={email} onChange={handleChangeInput} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                   <button className="bg-blueGray-400 text-white active:bg-blueGray-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                           onClick={forgotPassword}>Verify your email</button>
               </div>
              </div>
          </div>
      </div>
  )
}
export default ForgotPassword;