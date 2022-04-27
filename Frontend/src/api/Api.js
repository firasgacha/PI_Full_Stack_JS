import axios from 'axios';
const url = 'http://localhost:5000';


// Complaint API //
export const getAllComplaint = () => axios.get(`${url}/complaint/getComplaints`);
export const createComplaint = (newComplaint)=> axios.post(`${url}/complaint/addComplaint`, newComplaint);
export const updateComplaint = (id, updateComplaint) => axios.patch(`${url}/complaint/updateComplaint/${id}`, updateComplaint);
export const deleteComplaint = (id) => axios.delete(`${url}/complaint/deleteComplaint/${id}`);
export const getComplaintByUserId = (id) => axios.get(`${url}/complaint/getComplaintByUserId/${id}`);
export const getComplaintByStatus = (status) => axios.get(`${url}/complaint/getComplaintByStatus/${status}`);
export const getComplaintByUserIdAndStatus = (id,status) => axios.get(`${url}/complaint/getComplaintByStatus/${id}/${status}`);
export const updateComplaintStatus = (id,etat) => axios.patch(`${url}/complaint/update_status/${id}`,etat);
export const sendMessage = (id,msg) => axios.patch(`${url}/complaint/send_msg/${id}`,msg);

// export const fetchProductById = (id)=> axios.get(`${url}/products/${id}`);
// export const smartFetchProduct = (pagination)=> axios.post(`${url}/products/page`, pagination);
// export const getNbPages=()=> axios.get(`${url}/products/page/1`);
