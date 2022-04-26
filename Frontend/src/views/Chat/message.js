// create a message react component

import React from "react";

function Message({ message }) {
	return (
		<div className="message">
			<div className="message-username">{message.username}</div>
			<div className="message-text">{message.text}</div>
		</div>
	);
}

export default Message;
