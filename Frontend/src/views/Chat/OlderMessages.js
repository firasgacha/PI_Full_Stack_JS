import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OlderMessages(props) {
	// const [userId, setUserId] = useState(props.userId);
	// const [roomId, setRoomId] = useState(props.roomId);
	const [olderMessages, setOlderMessages] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(`/chat/user/${props.userId}`)
				.then((res) => {
					setOlderMessages(res.data.chats ? res.data.chats : []);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchData();
	}, []);
	return (
		<ul id="users">
			{olderMessages.map((message) => {
				if (message._id !== props.roomId) {
					return (
						<li key={message._id}>
							<Link to={`/chats/${message._id}`}>
								<div className="name">{message.other}</div>
							</Link>
						</li>
					);
				} else return "";
			})}
		</ul>
	);
}
