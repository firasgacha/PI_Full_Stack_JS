import axios from 'axios';
const url = 'http://localhost:1337';

// const API = axios.create({ baseURL: 'http://localhost:1337/' });

// Complaint API //
export const getAllComplaint = () => axios.get(`${url}/complaint/getComplaints`);
export const createComplaint = (newComplaint)=> axios.post(`${url}/complaint/addComplaint`, newComplaint);
export const updateComplaint = (id, updateComplaint) => axios.patch(`${url}/complaint/updateComplaint/${id}`, updateComplaint);
export const deleteComplaint = (id) => axios.delete(`${url}/complaint/deleteComplaint/${id}`);
// export const fetchProductById = (id)=> axios.get(`${url}/products/${id}`);
// export const smartFetchProduct = (pagination)=> axios.post(`${url}/products/page`, pagination);
// export const getNbPages=()=> axios.get(`${url}/products/page/1`);



// User API //
export const getUserById = (id)=> {
    axios.get(`${url}/user/getOneUser/${id}`)
};