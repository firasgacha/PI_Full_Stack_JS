import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import {useApi} from "../../hooks/useApi";
import useScript from "../../hooks/useScripts";
import Modal from 'react-modal';
import {queryApi} from "../../tools/queryApi";
import AddModifyProduct from "./AddModifyProduct";
import { browserHistory } from 'react-router';
import i from "styled-components/macro";
import ListFeedbacksRatingsImages from "./ListFeedbacksRatingsImages";

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
    const [value, setValue] = useState("");
    const [type, setType] = useState("");
    const [products,err,relaod]= useApi('getjson');
    const [errors, setErrors] = useState({ visbile: false, message: "" });
    var save=[];

    const handleChange = (event) => {
        console.log(value)
        setValue(event.target.value);

    };

    for (var i in products)
        if(products[i]['Categorie']['name'].indexOf(value)!=-1 || products[i]['Etat'].indexOf(value)!=-1 ||
            products[i]['Price'].toString().indexOf(value)!=-1)
            save.push(products[i]);

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

    function ModalRatings(prod) {
        setFormData({
            categorie:prod['prod'].Categorie.name,
            price:prod['prod'].Price,
            etat:prod['prod'].Etat,
            multi_files:prod['prod'].Images,
            rate:prod['prod'].Rate
        });
        setType("Ratings");
        setIsOpen(true);
    }

    function ModalFeedbacks(prod) {
        setFormData({
            categorie:prod['prod'].Categorie.name,
            price:prod['prod'].Price,
            etat:prod['prod'].Etat,
            multi_files:prod['prod'].Images,
            feedback:prod['prod'].Feedback
        });
        setType("Feedbacks");
        setIsOpen(true);
    }

    function ModalImages(prod) {
        setFormData({
            categorie:prod['prod'].Categorie.name,
            price:prod['prod'].Price,
            etat:prod['prod'].Etat,
            multi_files:prod['prod'].Images
        });
        setType("Images");
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
        setType("Modify");
        setIsOpen(true);
    }

    function closeModal() {
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
    if(type=="Ratings")
        goto=<ListFeedbacksRatingsImages type={type} formdata={formdata}/>
    if(type=="Feedbacks")
        goto = <ListFeedbacksRatingsImages type={type} formdata={formdata}/>
    if(type=="Images")
        goto=<ListFeedbacksRatingsImages type={type} formdata={formdata}/>


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
                            <input type="text" id="search" placeholder="Search here" onChange={(e) =>handleChange(e)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" />
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
                                <button onClick={()=>ModalImages({prod:prod})} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id="in3" >Images</button>
                            </td>
                            <td>
                                <button onClick={()=>ModalFeedbacks({prod:prod})} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id="in3" >Feedbacks</button>
                            </td>
                            <td>
                                <button onClick={()=>ModalRatings({prod:prod})} className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id="in3" >Ratings</button>
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