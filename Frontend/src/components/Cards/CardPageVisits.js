import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {dispatchGetAllUsers, fetchAllUsers} from "../../redux/actions/userActions";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
// components
const initialState = {
  name: '',
  password: '',
  address: '',
  cf_password: '',
  err: '',
  success: ''
}

export default function CardPageVisits() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const users = useSelector(state => state.users)

  const [value, setValue] = useState("");
  const{user, isAdmin} = auth
  const [data,setData] = useState(initialState)
  const [Loading,setLoading] = useState(false)
  const [callback , setCallback] = useState(false)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [Users, setUsers] = useState([])
  const [error, setError] = useState(false)
  var save=[];



  const dispatch = useDispatch()

  useEffect(() => {
    if(isAdmin){
      fetchAllUsers(token).then(res =>{
        dispatch(dispatchGetAllUsers(res))
      })
    }
  },[token, isAdmin, dispatch, callback])
  useEffect(()=>{
    const fetchAllUsers = async(token) =>{
      setLoading(true)
      try {
        const res = await fetch(`/user/all_info?page=${page}`,{
          headers: {Authorization: token}
        })
        const {data , pages: totalPages} = await res.json();
        setPages(totalPages);
        setUsers(data);
        setLoading(false);

      }catch(error) {
        console.log(error)
        setLoading(false);
        setError('Some error occurred')
      }
    }
    fetchAllUsers(token);
  },[page])



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


  const handleChange = (event) => {
    console.log(value)
    setValue(event.target.value);

  };
  for (var i in Users)
    if(Users[i]['name'].indexOf(value)!=-1 || Users[i]['email'].indexOf(value)!=-1 )
      save.push(Users[i]);

  if(value=="")
    save=Users;

  return (
      <>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  Users List
                </h3>
              </div>
              <input type="text" id="search" placeholder="Search here" onChange={(e) =>handleChange(e)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />

              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                >
                  See all
                </button>
              </div>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  ID
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Name
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Admin
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              {
                save && save.map(user => (
                    <tr key={user._id}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {user._id}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {user.name}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {user.email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {
                          user.role === 1
                              ? <i className="fas fa-check cursor-pointer" title="Admin"/>
                              : <i className="fas fa-times cursor-pointer" title="User"/>
                        }
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <Link to={`/edit_user/${user._id}`} className="px-2">
                          <i className="fas fa-edit cursor-pointer" title="Edit"/>
                        </Link>
                        <i className="fas fa-trash-alt cursor-pointer" title="Remove"
                           onClick={() => handleDelete(user._id)} />
                      </td>
                    </tr>
                ))
              }
              <Pagination page={page} pages={pages} changePage={setPage}/>
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
      </>
  );
}
