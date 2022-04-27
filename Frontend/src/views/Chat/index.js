import React, { useEffect, useRef, useState } from "react";
import chatStyle from "./index.module.css";
import io from "socket.io-client";
import axios from "axios";
import Message from "./message";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// messages =  document.getElementById("messages");

export default function Chat() {
	const socket = io.connect("ws://localhost:5000");

	const { id } = useParams();
	const { user, isAdmin } = useSelector((state) => state.auth);
	const [chatInfo, setChatInfo] = useState({});
	const [messageList, setMessageList] = useState([]);
	const [other, setOther] = useState({});
	const msgText = useRef(null);
	const messages = useRef(null);

	socket.on("message", (message) => {
		setMessageList((messageList) => [...messageList, message]);
		messages.current.scrollTop = messages.current.scrollHeight;
		const msg = new Message(message);
		messages.appendChild(msg);
	});

	useEffect(() => {
		const fetchData = async (id) => {
			await axios.get(`/chat/${id}`).then((res) => {
				const { data } = res;
				setMessageList(data.data.messages);
				setOther(() => {
					if (data.data.user_1 === user._id) {
						return {
							_id: data.data.user_2,
							name: data.data.user2Info.name,
							avatar: data.data.user2Info.avatar,
						};
					} else {
						return {
							_id: data.data.user_1,
							name: data.data.user1Info.name,
							avatar: data.data.user1Info.avatar,
						};
					}
				});
			});
			messages.current.value = messageList.map((message) => Message(message));
			messages.current.scrollTop = messages.current.scrollHeight;
		};
		fetchData(id);
		return () => {
			socket.emit("disconnect");
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		const joinRoom = (user, id) => {
			socket.emit("joinRoom", { userId: user._id, room: id });
		};
		if (user) {
			joinRoom(user, id);
		}
	}, [user]);

	const sendMsg = (e) => {
		e.preventDefault();

		const msg = msgText.current.value;

		socket.emit("message", {
			username: user.id,
			text: msg,
			room: id,
		});
		console.log("Message Sent");

		msgText.current.value = "";
		msgText.current.focus();
	};

	return (
		<>
			<div className={chatStyle.chatContainer}>
				<header className={chatStyle.chatHeader}>
					<h1>
						<i className="fas fa-smile"></i> {user.name}
					</h1>
				</header>
				<main className={chatStyle.chatMain}>
					<div className={chatStyle.chatSidebar}>
						<h3>
							<i className="fas fa-comments"></i> Room Name:
							<Link to={"/user-stores/" + other._id}>{other.name}</Link>
						</h3>
						<h2 id="room-name"></h2>
						<h3>
							<i className="fas fa-users"></i> Users
						</h3>
						<ul id="users"></ul>
					</div>
					<div ref={messages} className={chatStyle.chatMessages}></div>
				</main>
				<div className={chatStyle.chatFormContainer}>
					<form id="chatForm">
						<input
							id="msg"
							type="text"
							placeholder="Enter Message"
							required
							autoComplete="off"
							ref={msgText}
						/>
						<button onClick={sendMsg} className={chatStyle.btn}>
							<i className="fas fa-paper-plane"></i> Send
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
