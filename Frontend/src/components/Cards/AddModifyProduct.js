import React, {useState} from "react";
import {queryApi} from "../../tools/queryApi";

export default function AddModifyProduct(props){
    const [type, setType] = useState(props.type);
    const [formdata, setFormData] = useState(props.formdata);
    const [errors, setErrors] = useState({ visbile: false, message: "" });
    const onChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };
    const onChangeFile = (e) => {
        if(e.target.files.length) {
            let save_images = []
            for (var i = 0; i < e.target.files.length; i++)
                save_images.push(e.target.files[i])
            setFormData({...formdata, multi_files: save_images});
        }
    };
    const submit = async (e)=>{
        e.preventDefault();
        console.log(formdata);
        if(type=="Modify"){
            const [, err] = await queryApi("update", formdata, "POST", true);
            if (err) {
                setErrors({
                    visbile: true,
                    message: JSON.stringify(err.errors, null, 2),
                });
            }else
                window.location.reload(false);
        }
        else {
            const [, err] = await queryApi("add", formdata, "POST", true);
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
    let text_button;
    let p_button;
    if(type=="Add") {
        p_button=<input accept='image/*' type="file" multiple onChange={(e) => onChangeFile(e)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required></input>
        text_button="Save";

    }
    else {
        p_button=<input accept='image/*' type="file" multiple onChange={(e) => onChangeFile(e)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"></input>
        text_button="Update";
    }
    const {categorie, price, etat}=formdata
    return(
        <>
        <div className="text-blueGray-400 text-center mb-3 font-bold">
            <small>{type} Product</small>
        </div>
            <form onSubmit={submit} >
                <div className="form-group relative w-full mb-3" >
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Category
                    </label>
                    <input name="categorie" value={categorie} type="text" placeholder="Product Category" onChange={(e) => onChange(e)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required></input>
                </div>
                <div className="form-group relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Price Dt
                    </label>
                    <input min="0" name="price" value={price} type="number" onChange={(e) => onChange(e)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required></input>
                </div>
                <div className="form-group relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        State
                    </label>
                    <input name="etat" value={etat} type="text" placeholder="State" onChange={(e) => onChange(e)} className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" required></input>
                </div>
                <div className="form-group relative w-full mb-3">
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                    >
                        Browse
                    </label>
                    {p_button}
                </div>
                <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">{text_button}</button>
            </form>
        </>
    );


}