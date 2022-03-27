import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {useApi} from "../../hooks/useApi";
import useScript from "../../hooks/useScripts";
import Modal from 'react-modal';
import {queryApi} from "../../tools/queryApi";
import AddModifyProduct from "./AddModifyProduct";
import { browserHistory } from 'react-router';
import i from "styled-components/macro";

const customStyles = {
    overlay: {
        position: 'fixed',
        zIndex: 1020,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255, 255, 255, 0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        background: 'white',
        width: '35rem',
        maxWidth: 'calc(100vw - 2rem)',
        maxHeight: 'calc(100vh - 2rem)',
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid #ccc',
        borderRadius: '0.3rem',
        height: '30rem'
    }
};

Modal.setAppElement('body');
export default function CardProduct() {
    const[formdata,setFormData]=useState({
        categorie:"",
        price:0,
        etat:"",
        multi_files:[]
    })
    const [prodmodify, setProdModify] = useState(null);
    const [value, setValue] = useState("");
    const [type, setType] = useState("");
    const [products,err,relaod]= useApi('getjson');
    const [errors, setErrors] = useState({ visbile: false, message: "" });
    var save=[];
    if(value=="")
        save=products;

    const [modalIsOpen, setIsOpen] = React.useState(false);

    async function Delete(id) {
        if (window.confirm("Are you sure ?")) {
            const [, err] = await queryApi("delete", id, "POST", false);
            if (err) {
                setErrors({
                    visbile: true,
                    message: JSON.stringify(err.errors, null, 2),
                });
            }
            else
                window.location.reload(false);
        }

    }

    function ModalAdd() {
        setType("Add");
        setIsOpen(true);
    }
    function ModalModify(prodmodify) {
        setFormData({
            id_p:prodmodify['prodmodify']._id,
            categorie:prodmodify['prodmodify'].Categorie.name,
            price:prodmodify['prodmodify'].Price,
            etat:prodmodify['prodmodify'].Etat,
            multi_files:prodmodify['prodmodify'].Images
        });
        setProdModify(prodmodify)
        console.log(prodmodify)
        setType("Modify");
        setIsOpen(true);
    }

    function closeModal() {
        setProdModify(null)
        setType("");
        setIsOpen(false);
        setFormData({
            categorie:"",
            price:0,
            etat:"",
            multi_files:[]
        });
    }
    let goto;
    if(type=="Add")
        goto=<AddModifyProduct type={type} formdata={formdata}/>
    if(type=="Modify")
        goto = <AddModifyProduct type={type} formdata={formdata}/>


    return (

        <>
            <div
                className={
                    "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded "+"bg-white"
                }
            >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg " + "text-blueGray-700"
                                }
                            >
                                Products
                            </h3>
                        </div>
                    </div>
                </div>
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                    <tr>
                        <th className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }>Store</th>
                        <th className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }>Categorie</th>
                        <th className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }>Price</th>
                        <th className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }>Etat</th>
                        <th className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }>Images</th>
                        <th className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }>Feedbacks</th>
                        <th className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }>Ratings</th>
                        <th className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }>Delete</th>
                        <th className={
                            "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " + "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        }>Modify</th>
                    </tr>
                    </thead>
                    <tbody>
                {
                    save &&  save.map((prod,index) =>
                        <tr key={index}>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {prod.Store.FullName}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {prod.Categorie.name}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {prod.Price}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {prod.Etat}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex">
                                {
                                    prod.Images.map((img,index) =>
                                        <img key={index} id="taswira" src={"http://localhost:3000/images/"+img.img}
                                             className="hprod wprod bg-white rounded-full border imgprod"/>
                                    )}
                                </div>
                            </td>
                            <td>
                                <div className="select select--multiple">
                                    <select style={{borderColor:'inherit'}} id="multi-select" multiple>
                                {
                                    prod.Feedback.map((feed,index) =>
                                        <option key={index} value={feed.User}>
                                            {feed.Comment}
                                        </option>
                                    )}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div className="select select--multiple">
                                    <select style={{borderColor:'inherit'}} id="multi-select" multiple>
                                {
                                    prod.Rate.map((rate,index) =>
                                        <option key={index} value={rate._id}>
                                            {"Rate: "+rate.Stars}
                                        </option>
                                    )}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <button onClick={() => Delete({id_p:prod._id})} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id="in2" >Delete</button>
                            </td>
                            <td>
                                <button onClick={()=>ModalModify({prodmodify:prod})} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id="in3" >Modify</button>
                            </td>

                        </tr>
                )
            }
                    </tbody>
                </table>
                <div>
                    <button onClick={ModalAdd} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id="in3" >Add</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                    >
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            {goto}
                        <button onClick={closeModal} className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">Close</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </>

    );
}