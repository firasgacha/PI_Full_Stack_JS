import React,{useState} from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    messageRow: {
      display: "flex"
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end"
    },
    messageBlue: {
      position: "relative",
      marginLeft: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#A8DDFD",
      width: "auto",
      //height: "50px",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #97C6E3",
      borderRadius: "10px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #A8DDFD",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        left: "-15px"
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #97C6E3",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        left: "-17px"
      }
    },
    messageOrange: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#f8e896",
      width: "auto",
      //height: "50px",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "1px solid #dfd087",
      borderRadius: "10px",
      "&:after": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "15px solid #f8e896",
        borderLeft: "15px solid transparent",
        borderRight: "15px solid transparent",
        top: "0",
        right: "-15px"
      },
      "&:before": {
        content: "''",
        position: "absolute",
        width: "0",
        height: "0",
        borderTop: "17px solid #dfd087",
        borderLeft: "16px solid transparent",
        borderRight: "16px solid transparent",
        top: "-1px",
        right: "-17px"
      }
    },

    messageContent: {
      padding: 0,
      margin: 0
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      fontWeight: "300",
      marginTop: "10px",
      bottom: "-3px",
      right: "5px"
    },

    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    avatarNothing: {
      color: "transparent",
      backgroundColor: "transparent",
      width: theme.spacing(4),
      height: theme.spacing(4)
    },
    displayName: {
      marginLeft: "20px"
    }
  })
);


//avatarが左にあるメッセージ（他人）
export const MessageLeft = (props) => {
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "User";
  const classes = useStyles();
   //translate
   const [options, setOptions] = useState([]);
   const [to, setTo] = useState('en');
   const axios = require('axios').default;
   const [output, setOutput] = useState("");

  //  const translate = (msg) => {
  //       const params = new URLSearchParams();
  //       params.append('q', msg);
  //       params.append('source', 'auto');
  //       params.append('target', to);
  //       params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
  
  //       axios.post('https://libretranslate.de/translate', params,
  //           {
  //               headers: {
  //                   'accept': 'application/json',
  //                   'Content-Type': 'application/x-www-form-urlencoded'
  //               },
  //           }).then(res => setOutput(res.data.translatedText));
  // };
  return (
    <>
      <div className={classes.messageRow}>
        <Avatar
          alt={displayName}
          className={classes.orange}
          src={photoURL}
        ></Avatar>
        <div>
          <div className={classes.displayName}>{displayName}</div>
          <div className={classes.messageBlue}>
            <div>
              <p className={classes.messageContent}>{message}</p>
              {/* <p>{output}</p>      */}
            </div>
            <div className={classes.messageTimeStampRight}>{timestamp.toString().substring(0, 10)}</div>
          </div>
        </div>
        {/* <select onChange={e => setTo(e.target.value)} class="select select-bordered w-full max-w-xs">
                        <option key="Origin" value="Origin">Origin Text</option>
                        <option key="en" value="en">English</option>
                        <option key="fr" value="fr">French</option>
                        <option key="ar" value="ar" onClick={translate(message)}>Arabic</option>
        </select> */}
        </div>
    </>
  );
};
//avatarが右にあるメッセージ（自分）
export const MessageRight = (props) => {
  const classes = useStyles();
  const message = props.message ? props.message : "no message";
  const timestamp = props.timestamp ? props.timestamp : "";
  const photoURL = props.photoURL ? props.photoURL : "dummy.js";
  const displayName = props.displayName ? props.displayName : "User";
  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <p className={classes.messageContent}>{message}</p>
        <div className={classes.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
};