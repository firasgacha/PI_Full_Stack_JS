// how to use alert component : 
// <Alert message="Complaint Sended Successfully" backgroundColor="green" show="no"/>


import React from "react";

const Alert = (props) => {
  const [showAlert, setShowAlert] = React.useState("yes");
  return (
    <>
      {showAlert === props.show ? (
        <div
          className={props.backgroundColor === "green" ? "text-white px-6 py-4 border-0 rounded relative mb-4 bg-emerald-500" : "text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500" }
        >
          <span className="text-xl inline-block mr-5 align-middle">
            {/* <i className="fas fa-bell" /> */}
          </span>
          <span className="inline-block align-middle mr-8">
            {props.message}
          </span>
          <button
            className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
            onClick={() => setShowAlert(false)}
          >
            <span>×</span>
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Alert;