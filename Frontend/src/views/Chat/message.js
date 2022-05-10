import React from "react";
import chatStyle from "./index.module.css";

function Message(props) {
	return props.other && props.other._id ? (
		<div
			className={chatStyle.message}
			style={{ color: props.other._id === props.message.sender ? "red" : "" }}
		>
			<div className={chatStyle.messageUsername}>
				{props.message.sender === props.user._id ? "Me" : props.other.name}
			</div>
			<div className={chatStyle.messageText}>{props.message.content}</div>
			<img src={props.message.image} />
		</div>
	) : (
		""
	);
}

export default Message;
