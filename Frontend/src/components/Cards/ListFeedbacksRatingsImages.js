import React, {useState} from "react";

export default function ListFeedbacksRatingsImages(props){
    const [type] = useState(props.type);
    const [formdata] = useState(props.formdata);
    let ret;
    if(type=="Feedbacks") {
        const {feedback} = formdata
           ret=feedback.map((feed, index) =>
                <p key={index}>
                    {'User: ' + feed.User + ' Comment: ' + feed.Comment}
                </p>
            )

    }
    if(type=="Ratings") {
        const {rate} = formdata
        ret=rate.map((feed, index) =>
            <p key={index}>
                {'User: ' + rate.User + ' Stars: ' + rate.Stars}
            </p>
        )
    }
    if(type=="Images") {
        const {multi_files} = formdata
        ret=multi_files.map((img,index) =>
                <img key={index} id="taswira" src={"http://localhost:3000/images/"+img.img}
                     className="bg-white"/>
            )
    }
    return(
        <>
            <div className="text-blueGray-400 text-center mb-3 font-bold">
                <small>{type} Product</small>
            </div>
            {ret}
            <br/>
        </>
    );


}