import React, { useEffect, useState } from "react";
import * as api from '../../api/Api';
import { useDispatch, useSelector } from "react-redux";
import Navbar from "components/Navbars/AuthNavbar.js";
import ModalChat from "../../components/Modal/ModalChat";
import ModalImage from "../../components/Modal/ModalImage";



export default function MyComplaints() {
  const color = "light";
  const [Data, setData] = useState([]);
  const [SearchData, setSearchData] = useState("");
  const [userName, setUserName] = useState("");
  const auth = useSelector(state => state.auth);
  const { user, isAdmin } = auth


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
      }).catch(err => { console.log(err) })
  }


  const getComplaintsByUser = () => {
    api.getComplaintByUserId(user._id)
      .then(response => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          alert(message, status)
        }
        else {
          setData(data);
          console.log(data);
        }
      }).catch(err => { console.log(err) })
  }

  useEffect(() => {
    console.log(user);
    getComplaintsByUser();
  }, [user]);


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
                            My Complaints
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* <button class="btn btn-sm" onClick={getComplaintsByUser}>Refresh</button> */}

                    <div className="block w-full overflow-x-auto">
                      {/* Projects table */}

                      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div class="p-4">
                          <label for="table-search" class="sr-only">Search</label>
                          <div class="relative mt-1">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input onChange={event => setSearchData(event.target.value)} type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                          </div>
                        </div>
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th scope="col" class="p-4">
                                <div class="flex items-center">
                                  <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                  <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                </div>
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Problem Type
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Status
                              </th>
                              <th scope="col" class="px-6 py-3">
                                Date
                              </th>
                              <th scope="col" class="px-6 py-3">
                                ScreenShots
                              </th>
                              <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Chat</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {Data.filter((val) => {
                              if (SearchData == "") { return val }
                              else if (val.type?.toLowerCase().includes(SearchData.toLowerCase()) || val.status?.toLowerCase().includes(SearchData.toLowerCase())) { return val }
                            }).map((item) =>
                              <tr key={item._id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-4 p-4">
                                  <div class="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                  </div>
                                </td>
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                  {item.type}
                                </th>
                                <td class="px-6 py-4">
                                  {item.status === 'Open' ? <i className="fas fa-circle text-emerald-500 mr-2"></i> : <i className="fas fa-circle text-red-500 mr-2"></i>}
                                  {item.status}
                                </td>
                                <td class="px-6 py-4">
                                  {item.createdAt.toString().substring(0, 10)}
                                </td>
                                <td class="px-6 py-4">
                                  <ModalImage image={item.image} />
                                </td>
                                <td class="px-6 py-4 text-right">
                                  <ModalChat onOFF={item.status} onClick={GetComplaintsData} userName={userName} complId={item._id} msgs={item.msgs} refresh={getComplaintsByUser} />
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@2.14.2/dist/full.css" rel="stylesheet" type="text/css" />
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
      <script src="../path/to/flowbite/dist/flowbite.js"></script>
    </>
  );
};

