import React, { useEffect, useState } from "react";
import * as api from '../../api/Api';
import { fetchUser, dispatchGetUser } from '../../redux/actions/authAction';
import { useDispatch, useSelector } from "react-redux";
import Navbar from "components/Navbars/AuthNavbar.js";
import ModalChat from "../../components/Modal/ModalChat";
import ModalImage from "../../components/Modal/ModalImage";
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';




export default function MyComplaints() {
  const color = "light";
  const [openTab, setOpenTab] = useState(1);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [Data, setData] = useState([]);


  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const [connected, setConnceted] = useState(false);
  const { user, isAdmin } = auth
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()

  const getComplaintsByUser = async () => {
    await api.getComplaintByUserId(userId)
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
      }).catch(err => { console.log(err) })
  }

  useEffect(() => {
    if (token) {
      fetchUser(token).then(res => {
        dispatch(dispatchGetUser(res))
        setUserId(res.data._id)
        setUserName(res.data.name)
        setConnceted(true)
        getComplaintsByUser();
      })
    }
  }, [token, isAdmin, dispatch, callback, userId])

  return (
    <>

      <Navbar transparent />
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
              <div className="flex flex-wrap">
                <div className="w-full">
                  <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                    role="tablist"
                  >
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                          (openTab === 1
                            ? "text-white bg-lightBlue-600"
                            : "text-lightBlue-600 bg-white")
                        }
                        onClick={e => {
                          e.preventDefault();
                          setOpenTab(1);
                        }}
                        data-toggle="tab"
                        href="#link1"
                        role="tablist"
                      >
                        <i className="fas fa-list text-base mr-1"></i>   Current Complaints
                      </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                          (openTab === 2
                            ? "text-white bg-lightBlue-600"
                            : "text-lightBlue-600 bg-white")
                        }
                        onClick={e => {
                          e.preventDefault();
                          setOpenTab(2);
                        }}
                        data-toggle="tab"
                        href="#link2"
                        role="tablist"
                      >
                        <i className="fas fa-archive text-base mr-1"></i>  Archive
                      </a>
                    </li>
                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                      <a
                        className={
                          "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                          (openTab === 3
                            ? "text-white bg-lightBlue-600"
                            : "text-lightBlue-600 bg-white")
                        }
                        onClick={e => {
                          e.preventDefault();
                          setOpenTab(3);
                        }}
                        data-toggle="tab"
                        href="#link3"
                        role="tablist"
                      >
                        <i className="fas fa-cog text-base mr-1"></i>  Settings
                      </a>
                    </li>
                  </ul>
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="px-4 py-5 flex-auto">
                      <div className="tab-content tab-space">
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                          <Button variant="outlined" startIcon={<RefreshIcon />} onClick={getComplaintsByUser}>
                            Refresh
                          </Button>
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
                                  Description
                                </th>
                                <th
                                  className={
                                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                    (color === "light"
                                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                  }
                                ></th>
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
                                <tr key={item.id}>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {item.type}
                                  </td>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <i className="fas fa-circle text-emerald-500 mr-2"></i>{" "}
                                    {item.status}
                                  </td>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {item.createdAt.toString().substring(0, 10)}
                                  </td>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    {item.description}
                                  </td>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                    <ModalChat userName={userName} complId={item._id} msgs={item.msgs} refresh={getComplaintsByUser} />
                                  </td>
                                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                    <ModalImage image={item.image} />
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                          <p>
                            Completely synergize resource taxing relationships via
                            premier niche markets. Professionally cultivate one-to-one
                            customer service with robust ideas.
                            <br />
                            <br />
                            Dynamically innovate resource-leveling customer service for
                            state of the art customer service.
                          </p>
                        </div>
                        <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                          <p>
                            Efficiently unleash cross-media information without
                            cross-media value. Quickly maximize timely deliverables for
                            real-time schemas.
                            <br />
                            <br /> Dramatically maintain clicks-and-mortar solutions
                            without functional solutions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

