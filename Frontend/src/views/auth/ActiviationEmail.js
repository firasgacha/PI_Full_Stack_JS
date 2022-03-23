import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../components/utils/notification/Notification'

function ActivationEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
    const history = useHistory()

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('http://localhost:5000/user/activation', {activation_token})
                    setSuccess(res.data.msg)
                    history.push("/auth/login")
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <div className="active_page">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
        </div>
    )
}

export default ActivationEmail