import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { MessageLeft, MessageRight } from "./Message";
import * as api from '../../api/Api';
import TextField from '@material-ui/core/TextField';
import { fetchUser, dispatchGetUser } from '../../redux/actions/authAction';
import { useDispatch, useSelector } from "react-redux";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
    const [value, setValue] = React.useState('one');


    //translate
    const [options, setOptions] = useState([]);
    const [to, setTo] = useState('en');
    const axios = require('axios').default;
    const [output, setOutput] = useState([]);

    const [allMsgsFr, setAllMsgsFr] = useState([]);
    const [allMsgsAr, setAllMsgsAr] = useState([]);
    const [allMsgsEn, setAllMsgsEn] = useState([]);

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
    const [openTab, setOpenTab] = React.useState(1);

    //
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const translateFr = () => {
        // allMsgs.splice(0, allMsgs.length);
        // while(A.length > 0) {
        //     A.pop();
        // }
        const data = props.msgs;
        data.map(msg => {
            const params = new URLSearchParams();
            params.append('q', msg.content);
            params.append('source', 'auto');
            params.append('target', 'fr');
            params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

            axios.post('https://libretranslate.de/translate', params,
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }).then(res => {
                    msg.content = res.data.translatedText;
                    allMsgsFr.push(msg);
                });
        });
        allMsgsFr.reverse();
        console.log('fr ==== ', allMsgsFr);
    };

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
                    props.refresh();

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

    useEffect(() => {
        // axios.get('https://libretranslate.de/languages',
        //   { headers: { 'accept': 'application/json' } }).then(res => { console.log(res.data) });
        translateFr();
        console.log("admin===",isAdmin);
    }, []);
    return (

        <div className={classes.container}>
            <button className="btn btn-square">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                    props.refresh();
                    props.close();
                }} className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex flex-wrap">
                <div>
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 1
                                        ? "text-white bg-lightBlue-600"
                                        : "text-lightBlue-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                                <i className="fas fa-list text-base mr-1"></i>   Current Chat
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 2
                                        ? "text-white bg-lightBlue-600"
                                        : "text-lightBlue-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                <i className="fas fa-archive text-base mr-1"></i>  Frensh
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a
                                className={
                                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                    (openTab === 3
                                        ? "text-white bg-lightBlue-600"
                                        : "text-lightBlue-600 bg-white")
                                }
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                <i className="fas fa-cog text-base mr-1"></i>  Arabic
                            </a>
                        </li>
                    </ul>
                    <div>
                        <div>
                            <div>
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <Paper className={classes.paper} zdepth={2}>
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
                                    </Paper>

                                    <form className={classes.wrapForm} noValidate autoComplete="off">
                                        <input type="text" placeholder="Type here" class="input w-full max-w-xs" onChange={(e) => setMsg(e.target.value)} />

                                        <button type="reset" class="btn" onClick={() => {
                                            sendMsg();
                                        }}>Send</button>
                                    </form>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <Paper className={classes.paper} zdepth={2}>
                                        <Paper id="style-1" className={classes.messagesBody}>
                                            <div>
                                                {allMsgsFr.map((msg) =>
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
                                    </Paper>
                                </div>
                                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                    <Paper className={classes.paper} zdepth={2}>
                                        <h2 className="text-xl flex justify-center mt-20">
                                            Will be available soon
                                        </h2>
                                        <h3 className="text-lg flex justify-center mt-20">
                                            Arabic Translation
                                        </h3>
                                        <span className="badge badge-lg flex justify-center mt-20">NEW</span>
                                    </Paper>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
