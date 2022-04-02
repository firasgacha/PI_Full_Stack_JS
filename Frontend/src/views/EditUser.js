import React, {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {showSuccessMsg, showErrMsg} from '../components/utils/notification/Notification'
import Navbar from "../components/Navbars/AuthNavbar";
import Footer from "../components/Footers/Footer";


function EditUser() {
    const {id} = useParams()
    const history = useHistory()
    const [editUser, setEditUser] = useState([])

    const users = useSelector(state => state.users)
    const token = useSelector(state => state.token)

    const [checkAdmin, setCheckAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [num, setNum] = useState(0)

    useEffect(() => {
        if(users.length !== 0){
            users.forEach(user => {
                if(user._id === id){
                    setEditUser(user)
                    setCheckAdmin(user.role === 1 ? true : false)
                }
            })
        }else{
            history.push('/profile')
        }
    },[users, id, history])

    const handleUpdate = async () => {
        try {
            if(num % 2 !== 0){
                const res = await axios.patch(`/user/update_role/${editUser._id}`, {
                    role: checkAdmin ? 1 : 0
                }, {
                    headers: {Authorization: token}
                })

                setSuccess(res.data.msg)
                setNum(0)
            }
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const handleCheck = () => {
        setSuccess('')
        setErr('')
        setCheckAdmin(!checkAdmin)
        setNum(num + 1)
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
                                <div className="profile_page edit_user">
                                    <div className="row">
                                        <button onClick={() => history.goBack()} className="go_back">
                                            <i className="fas fa-long-arrow-alt-left"></i> Go Back
                                        </button>
                                    </div>

                                    <div className="col-left">
                                        <h2>Edit User</h2>

                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" name="name" defaultValue={editUser.name} disabled/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" name="email" defaultValue={editUser.email} disabled />
                                        </div>

                                        <div className="form-group">
                                            <input type="checkbox" id="isAdmin" checked={checkAdmin}
                                                   onChange={handleCheck} />
                                            <label htmlFor="isAdmin">isAdmin</label>
                                        </div>

                                        <button onClick={handleUpdate}>Update</button>

                                        {err && showErrMsg(err)}
                                        {success && showSuccessMsg(success)}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer /></>
    )
}

export default EditUser