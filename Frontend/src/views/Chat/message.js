import React from "react";
import chatStyle from "./index.module.css";

function Message(props) {
	return (
		<div
			className={chatStyle.message}
			style={{ color: props.user._id === props.message.sender ? "red" : "" }}
		>
			<div className={chatStyle.messageUsername}>
				{props.message.sender === props.user._id ? "Me" : props.other.name}
			</div>
			<div className={chatStyle.messageText}>{props.message.content}</div>
		</div>
	);
}

export default Message;
