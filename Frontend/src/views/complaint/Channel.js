import React, { useEffect, useState, useRef } from 'react';
import * as api from '../../api/Api';
import {MessageLeft} from '../../components/Message/Message';

export default function Channel(props) {
  const complId = props.complId;
  const userName = props.userName;
  const image = ""

  const sendMsg = async () => {
    await api.sendMessage(complId,
      {
        from: "test",
        content: "test"
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
    <div className="flex flex-col h-full">
      <div className="overflow-auto h-full">
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="border-b dark:border-gray-600 border-gray-200 py-8 mb-4">
            <div className="font-bold text-3xl text-center">
              <p className="mb-1">Welcome to</p>
              <p className="mb-3">React FireChat</p>
            </div>
            <p className="text-gray-400 text-center">
              This is the beginning of this chat.
            </p>
          </div>
          <ul>
            {props.msgs.map((msg) =>
              <div key={msg.id}>
                <MessageLeft displayName={userName} message={msg.content} from={msg.from} image={image}/>
              </div>
            )}


          </ul>
          <div />
        </div>
      </div>
      <div className="mb-6 mx-4">
        {complId}
        {userName}
        <button onClick={sendMsg}>Send</button>
        {/* <form
         
          className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
        >
          <input
           
            placeholder="Type your message here..."
            className="flex-1 bg-transparent outline-none"
          />
          <button
            type="submit"
            
            className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Send
          </button>
        </form> */}
      </div>
    </div>
  );
};


