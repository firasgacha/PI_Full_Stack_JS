import React, { useEffect, useState } from 'react';
import TableDropdown from "components/Dropdowns/TableDropdown.js";
import * as api from '../../api/Api';
import ModalImage from 'components/Modal/ModalImage';
import ModalChat from 'components/Modal/ModalChat';
import { fetchUser, dispatchGetUser } from '../../redux/actions/authAction';
import { useDispatch, useSelector } from "react-redux";
import { Button } from '@mui/material';

export default function GetComplaintsData () {
    const color = "light";
    const [Data, setData] = useState([]);
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const [connected, setConnceted] = useState(false);
    const { user, isAdmin } = auth
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()

    // Get All Complaints Data
    const GetComplaintsData = () => {
        api.getAllComplaint()
        .then(response => {
          const result = response.data;
          const { status, message, data } = result;
              if (status !== 'SUCCESS') {
                  alert(message, status)
              }
              else {
                  setData(data);
                  console.log(result);
              }
      }) .catch(err => {console.log(err)})
    }
    const ChangeStatus = (id,e) => {
      api.updateComplaintStatus(id,
        {
          status: e === 'Open' ? 'Closed' : 'Open'
        }
        ).then(response => {
        const result = response.data;
        const { status, message, data } = result;
            if (status !== 'SUCCESS') {
                alert(message, status)
            }
            else {
                GetComplaintsData();

                console.log(result);
            }
      }) .catch(err => {console.log(err.message)})
    }
   
   
    useEffect(() => {
      GetComplaintsData();
    },[]);
    useEffect(() => {
      if (token) {
        fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
          setUserId(res.data._id)
          setUserName(res.data.name)
          setConnceted(true)
        })
      }
    }, [token, isAdmin, dispatch, callback, userId])
    return (
        <>
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
              (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
            }
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3
                    className={
                      "font-semibold text-lg " +
                      (color === "light" ? "text-blueGray-700" : "text-white")
                    }
                  >
                    COMPLAINTS LIST
                  </h3>
                </div>
              </div>
            </div>
            
          
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      Problem Type
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      Status
                    </th>
                
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      Date
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      ScreenShots
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      Chat
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {Data.map((item) => 
                  <tr key={item._id}>                    
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.type}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.status ==='Open'  ? <i className="fas fa-circle text-emerald-500 mr-2"></i> : <i className="fas fa-circle text-red-500 mr-2"></i> }
                      {item.status}
                      {/* <button onClick={() => ChangeStatus(item._id,item.status)}>Change Status</button> */}
                      <Button onClick={() => ChangeStatus(item._id,item.status)}>Change Status</Button>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {item.createdAt.toString().substring(0, 10)}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <ModalImage image={item.image}/>        
                      </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    {/* <ModalChat userName={userName} complId={item._id} msgs={item.msgs} refresh={getComplaintsByUser} /> */}

                      <ModalChat userName={userName} complId={item._id} msgs={item.msgs} refresh={GetComplaintsData} />
                    </td>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">                      
                    <TableDropdown />
                    </th>
                  </tr>
                  )}
                  </tbody>
              </table>
            </div>
          </div>
        </>
      );
};


