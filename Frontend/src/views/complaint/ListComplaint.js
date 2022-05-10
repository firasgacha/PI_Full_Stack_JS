import React, { useEffect, useState } from 'react';
import * as api from '../../api/Api';
import ModalImage from 'components/Modal/ModalImage';
import ModalChat from 'components/Modal/ModalChat';
import {useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';

const PER_PAGE = 10;

export default function GetComplaintsData() {
  const color = "light";
  const [Data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  //Auth
  const auth = useSelector(state => state.auth)
  const { user, isAdmin } = auth
  //Search
  const [SearchData, setSearchData] = useState("");
  //Pagination
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageChange({ selected : selectedPage}) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const currentPageData = Data
    .slice(offset, offset + PER_PAGE)
    .map((res, index) => <img key={index} src={res.thumbnailUrl} alt="complaint" />);
  const pgaeCount = Math.ceil(Data.length / PER_PAGE);

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
  const ChangeStatus = (id, e) => {
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
    }).catch(err => { console.log(err.message) })
  }


  useEffect(() => {
    GetComplaintsData();
  }, [user]);


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
        <div className="p-4">
          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input onChange={event => setSearchData(event.target.value)} type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
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
              {Data.filter((val) => {
                              if (SearchData == "") { return val }
                              else if (val.type?.toLowerCase().includes(SearchData.toLowerCase()) || val.status?.toLowerCase().includes(SearchData.toLowerCase())) { return val }
                            })
              .map((item) =>
                <tr key={item._id}>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.type}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.status === 'Open' ? <i className="fas fa-circle text-emerald-500 mr-2"></i> : <i className="fas fa-circle text-red-500 mr-2"></i>}
                    {item.status}
                    {/* <button onClick={() => ChangeStatus(item._id,item.status)}>Change Status</button> */}
                    {/* <Button onClick={() => ChangeStatus(item._id, item.status)}>Change Status</Button> */}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {item.createdAt.toString().substring(0, 10)}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <ModalImage image={item.image} />
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <ModalChat onOFF={item.status} onClick={GetComplaintsData} userName={userName} complId={item._id} msgs={item.msgs} refresh={GetComplaintsData} />
                  </td>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                    {/* <TableDropdown /> */}
                    {item.status === 'Open' ?
                    <button class="btn btn-error" onClick={() => ChangeStatus(item._id, item.status)}>Close Complaint</button>
                    :<button class="btn btn-success" onClick={() => ChangeStatus(item._id, item.status)}>Open Complaint</button>
                    }
                  </th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <link href="https://cdn.jsdelivr.net/npm/daisyui@2.14.2/dist/full.css" rel="stylesheet" type="text/css" />
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
      <script src="../path/to/flowbite/dist/flowbite.js"></script>
    </>
  );
};


