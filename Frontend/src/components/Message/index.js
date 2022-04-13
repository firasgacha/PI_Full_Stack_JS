import React,{useState} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { MessageLeft, MessageRight } from "./Message";
import { Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as api from '../../api/Api';
import SendIcon from '@mui/icons-material/Send';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
        wrapForm : {
            display: "flex",
            justifyContent: "center",
            width: "95%",
            margin: `${theme.spacing(0)} auto`
        },
        wrapText  : {
            width: "100%"
        },
        button: {
            //margin: theme.spacing(1),
        },
    })
);

export default function ChatBox(props) {
    const classes = useStyles();
    const [msg, setMsg] = useState();
    const complId = props.complId;
    const userName = props.userName;
    const sendMsg = async () => {
        await api.sendMessage(complId,
          {
            from: userName,
            content: msg
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
    return (
        <div className={classes.container}>
            <Paper className={classes.paper} zDepth={2}>
                <Fab size="medium" color="primary" aria-label="add" onClick={props.close}>
                    <CloseIcon />
                </Fab>
                <Paper id="style-1" className={classes.messagesBody}>
                    {props.msgs.map((msg) =>
                        <div key={msg.id}>
                            <MessageLeft
                                message={msg.content}
                                timestamp={msg.timestamp}
                                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                                displayName={msg.from}
                                avatarDisp={true}
                            />
                            {msg.createdAt}
                        </div>
                    )}
                </Paper>
                <form className={classes.wrapForm}  noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="Enter your message"
                className={classes.wrapText}
                //margin="normal"
                onChange={(e) => setMsg(e.target.value)}
            />
            <Button onClick={sendMsg} variant="contained" color="primary" className={classes.button}>
                <SendIcon />
            </Button>
            </form>
            </Paper>
        </div>
    );
}
