import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OlderMessages(props) {
	// const [userId, setUserId] = useState(props.userId);
	// const [roomId, setRoomId] = useState(props.roomId);
	console.log(props);
	const [olderMessages, setOlderMessages] = useState([]);
	useEffect(() => {
		const fetchData = async (props) => {
			await axios
				.get(`/chat/user/${props.userId}`)
				.then((res) => {
					console.log(res.data.data);
					setOlderMessages(res.data.data ? res.data.data : []);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		fetchData(props);
	}, [props]);
	return (
		<ul id="users">
			{olderMessages.map((message) => {
				return (
					<li key={message._id}>
						<Link to={`/chat/${message._id}`}>
							<div className="name">{message.other}</div>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
