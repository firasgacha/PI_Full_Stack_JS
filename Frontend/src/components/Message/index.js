import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { MessageLeft, MessageRight } from "./Message";
import { Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as api from '../../api/Api';
import SendIcon from '@mui/icons-material/Send';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { fetchUser, dispatchGetUser } from '../../redux/actions/authAction';
import { useDispatch, useSelector } from "react-redux";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            width: "80vw",
            height: "80vh",
            maxWidth: "500px",
            maxHeight: "700px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        paper2: {
            width: "80vw",
            maxWidth: "500px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative"
        },
        container: {
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        messagesBody: {
            width: "calc( 100% - 20px )",
            margin: 10,
            overflowY: "scroll",
            height: "calc( 100% - 80px )"
        },
        wrapForm: {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: `${theme.spacing(0)} auto`
        },
        wrapText: {
            width: "100%"
        },
        button: {
            //margin: theme.spacing(1),
        },
    })
);

export default function ChatBox(props) {
    const classes = useStyles();
    const [msg, setMsg] = useState('');
    const complId = props.complId;
    const userName = props.userName;
    const [role, setRole] = useState("");
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const [connected, setConnceted] = useState(false);
    const { user, isAdmin } = auth;
    const [callback, setCallback] = useState(false);
    const dispatch = useDispatch();


    const sendMsg = async () => {
        await api.sendMessage(complId,
            {
                from: role,
                content: msg,
            })
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if (status !== 'SUCCESS') {
                    alert(message, status)
                }
                else {
                    console.log(result);
                }
            }).catch(err => { console.log(err.message) })
    }
    useEffect(() => {
        if (token) {
          fetchUser(token).then(res => {
            dispatch(dispatchGetUser(res))
            setRole(res.data.role)
            setConnceted(true)
          })
        }
      }, [token, isAdmin, dispatch, callback])
    return (

        <div className={classes.container}>
            <Paper className={classes.paper} zDepth={2}>
                <Fab size="medium" color="primary" aria-label="add" onClick={() => {
                    props.refresh();
                    props.close();
                }}>
                    <CloseIcon />
                </Fab>
                <Paper id="style-1" className={classes.messagesBody}>
                        <div>
                            {props.msgs.map((msg) =>
                                <div key={msg.id}>
                                    {msg.from == "1" ?
                                <div>
                                <MessageRight

                                    message={msg.content}
                                    // timestamp={msg.timestamp}
                                    photoURL="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                                    // displayName="Admin"
                                    avatarDisp={true}
                                />
                                {/* {msg.createdAt} */}
                                </div>
                                : <div>
                                <MessageLeft

                                    message={msg.content}
                                    // timestamp={msg.timestamp}
                                    photoURL="https://www.gpao.fr/wp-content/uploads/2020/03/62681-flat-icons-face-computer-design-avatar-icon.png"
                                    // displayName="User"
                                    avatarDisp={true}
                                />
                                {/* {msg.createdAt} */}
                                </div>    
                                }
                                </div>
                            )}
                        </div>
                </Paper>
                <form className={classes.wrapForm} noValidate autoComplete="off">
                    <TextField
                        id="standard-text"
                        label="Enter your message"
                        className={classes.wrapText}
                        //margin="normal"
                        onChange={(e) => setMsg(e.target.value)}
                    />
                    <Button type='reset' variant="contained" color="primary" className={classes.button}onClick={() => {
                    sendMsg();
                    props.refresh();
                }}>
                        <SendIcon />
                    </Button>
                </form>
            </Paper>
        </div>
    );
}
