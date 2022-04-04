import React, {Fragment, useState} from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import styled from "styled-components";
import {Avatar, Grid, Paper} from "@mui/material";

const labels = {
    0: 'Useless',
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function ListFeedbacksRatingsImages(props){
    const [type] = useState(props.type);
    const [formdata] = useState(props.formdata);
    let ret;
    if(type=="Feedbacks") {
        const {feedback} = formdata
           ret=<div style={{ padding: 14,fontFamily: "sans-serif" }} >
               <h1>Comments</h1>{
               feedback.map((feed, index) =>
               <Paper key={index} style={{ padding: "40px 20px", marginTop: 20 }}>
                   <Grid container wrap="nowrap" spacing={2}>
                       <Grid item>
                           <Avatar alt="" src={""} />
                       </Grid>
                       <Grid justifyContent="left" item xs zeroMinWidth>
                           <h4 style={{ margin: 0, textAlign: "left" }}>{feed.User}</h4>
                           <p style={{ textAlign: "left" }}>
                               {feed.Comment}.{" "}
                           </p>
                           <p style={{ textAlign: "left", color: "gray" }}>
                               posted 1 minute ago
                           </p>
                       </Grid>
                   </Grid>
               </Paper>
               )}
               </div>
    }
    if(type=="Ratings") {
        const {rate} = formdata
        ret=
            <div style={{ padding: 14,fontFamily: "sans-serif" }} >
                <h1>Stars</h1>{
            rate.map((rat, index) =>
            <Paper key={index} style={{ padding: "40px 20px", marginTop: 20, backgroundColor: 'rgb(235 ,242 ,245, 1)' }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection:'column'
                    }}
                >
                    {'User ' + rat.User}
                    <Rating
                        name="hover-feedback"
                        value={rat.Stars}
                        getLabelText={getLabelText}
                        readOnly
                    />
                    {(
                        <Box sx={{ ml: 0.5 }}>{+rat.Stars+" "+labels[rat.Stars]}</Box>
                    )}
                </Box>
            </Paper>
    )}
            </div>
    }
    if(type=="Images") {
        const {multi_files} = formdata
        ret=<div style={{ padding: 14,fontFamily: "sans-serif" }} >
            <h1>Photos</h1>{
            multi_files.map((img,index) =>
                <Paper key={index} style={{ padding: "40px 20px", marginTop: 20 }}>
                <img key={index} id="taswira" src={"http://localhost:3000/images/"+img.img}
                     className="bg-white"/>
                </Paper>
            )}
        </div>
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
const Prod = styled.div`
  border-radius: 25px;
  background-color: rgb(191 ,224 ,241, 1);
  margin: 10px;
`;