import React, {Fragment, useEffect, useState} from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import styled from "styled-components";
import {Avatar, Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {dispatchGetAllUsers, fetchAllUsers} from "../../redux/actions/userActions";

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
    const auth = useSelector(state => state.auth)
    const users = useSelector(state => state.users)
    const token = useSelector(state => state.token)
    const {user , isLogged} = auth
    const dispatch = useDispatch()
    let user_name=[]
    let user_avatar=[]
    useEffect(() => {
        if(isLogged) {
            fetchAllUsers(token).then(res => {
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[dispatch,isLogged])

    console.log(users);
    const [type] = useState(props.type);
    const [formdata] = useState(props.formdata);
    let ret;
    if(type=="Feedbacks") {
        const {feedback} = formdata
        for (var a in feedback) {
            for (var b in users) {
                if(feedback[a]['User']==users[b]['_id']) {
                    user_name.push(users[b]['name'])
                    user_avatar.push(users[b]['avatar'])
                }
            }
        }
           ret=<div style={{ padding: 14,fontFamily: "sans-serif" }} >
               <h1>Comments</h1>{
               feedback.map((feed, index) =>
               <Paper key={index} style={{ padding: "40px 20px", marginTop: 20 }}>
                   <Grid container wrap="nowrap" spacing={2}>
                       <Grid item>
                           <Avatar alt="" src={user_avatar[index]} />
                       </Grid>
                       <Grid justifyContent="left" item xs zeroMinWidth>
                           <h4 style={{ margin: 0, textAlign: "left" }}>{user_name[index]}</h4>
                           <p style={{ textAlign: "left" }}>
                               {feed.Comment+"."}
                           </p>
                           <p style={{ textAlign: "left", color: "gray" }}>
                               {feed.createdAt+"."}
                           </p>
                       </Grid>
                   </Grid>
               </Paper>
               )}
               </div>
    }
    if(type=="Ratings") {
        const {rate} = formdata
        for (var c in rate) {
            for (var d in users) {
                if(rate[c]['User']==users[d]['_id'])
                    user_name.push(users[d]['name'])
            }
        }
        ret=<div style={{ padding: 14,fontFamily: "sans-serif" }} >
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
                    {user_name[index]}
                    <Rating
                        name="hover-feedback"
                        value={rat.Stars}
                        getLabelText={getLabelText}
                        readOnly
                    />
                    {(
                        <Box sx={{ ml: 0.5 }}>{+rat.Stars+" "+labels[rat.Stars]}</Box>
                    )}
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {rat.createdAt+"."}
                    </p>
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
                <img key={index} id="taswira" src={"http://localhost:5000/images/"+img.img}
                     className="bg-white"/>
                </Paper>
            )}
        </div>
    }
    return(
        <>
            {(() => {
                if(!props.front)
                    return <div className="text-blueGray-400 text-center mb-3 font-bold">
                        <small>{type} Product</small>
                    </div>
            })()}
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