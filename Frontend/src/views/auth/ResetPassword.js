import React, {useState} from 'react'
import Navbar from "../../components/Navbars/AuthNavbar";
import FooterSmall from "../../components/Footers/FooterSmall";
import axios from 'axios';
import {useHistory, useParams} from "react-router-dom";
import {showErrMsg,showSuccessMsg} from "../../components/utils/notification/Notification";
import {isLength, isMatch} from "../../components/utils/validation/Validation";


const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: '',
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()
    const history = useHistory()


    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const handleResetPass = async () =>{
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters", success:''})
        if(!isMatch(password ,cf_password))
            return setData({...data, err: "Password did not match", success:''})
        try {
            const res = await axios.post('/user/reset',{password}, {
                headers: { Authorization: token}
            })
            history.push("/")
            return setData({...data, err: '', success: res.data.msg})

        }catch(err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success:''})
        }

    }
  return (
      <>
      <Navbar transparent />
    <main>
        <section className="relative w-full h-full py-40 min-h-screen">
            <div
                className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                style={{
                    backgroundImage:
                        "url(" + require("assets/img/register_bg_2.png").default + ")",
                }}
            >
                <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                        <div className="w-full lg:w-4/12 px-4">
                            <div className="relative w-full mb-3">
                                <h2 className="text-2xl font-bold text-center text-blueGray-200 ">Reset Password</h2>
                                {err && showErrMsg(err)}
                                {success && showSuccessMsg(success)}
                                <label className="block uppercase text-blueGray-200 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Enter your new password
                                </label>
                                <input type="password" name="password" id="password" value={password} onChange={handleChangeInput}
                                       className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                                <label className="block uppercase text-blueGray-200 text-xs font-bold mb-2" htmlFor="grid-password">
                                    Confirm your new password
                                </label>
                                <input type="password" name="cf_password" id="cf_password" value={cf_password} onChange={handleChangeInput}
                                       className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"/>
                                <button className="bg-blueGray-400 text-white active:bg-blueGray-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        onClick={handleResetPass}>Reset password</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <FooterSmall absolute />
        </section>
    </main>
    </>
  )
}

export default ResetPassword