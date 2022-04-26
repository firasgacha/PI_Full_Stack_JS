import React, { useEffect, useRef, useState } from "react";
import "./index.module.css";
import io from "socket.io-client";
import axios from "axios";
import Message from "./message";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const socket = io("http://localhost:5000");

// messages =  document.getElementById("messages");

export default function Chat() {
	const { id } = useParams();
	const { user, isAdmin } = useSelector((state) => state.auth);
	const [messagesList, setMessagesList] = useState([]);
	const msgText = useRef(null);
	const messages = useRef(null);

	socket.on("message", (message) => {
		setMessagesList((messagesList) => [...messagesList, message]);
		messages.current.scrollTop = messages.current.scrollHeight;
		messages.appendChild(messages);
	});

	useEffect((id) => {
		const fetchData = async () => {
			await axios.get(`/api/chat/messages/${id}`).then((res) => {
				setMessagesList(res.data);
			});

			messages.current.value = messagesList.map((message) => Message(message));
			messages.current.scrollTop = messages.current.scrollHeight;
		};
		fetchData();
	}, []);

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
			<div class="chat-container">
				<header class="chat-header">
					<h1>
						<i class="fas fa-smile"></i> ChatCord
					</h1>
				</header>
				<main class="chat-main">
					<div class="chat-sidebar">
						<h3>
							<i class="fas fa-comments"></i> Room Name:
						</h3>
						<h2 id="room-name"></h2>
						<h3>
							<i class="fas fa-users"></i> Users
						</h3>
						<ul id="users"></ul>
					</div>
					<div ref={messages} class="chat-messages"></div>
				</main>
				<div class="chat-form-container">
					<form id="chat-form">
						<input
							id="msg"
							type="text"
							placeholder="Enter Message"
							required
							autocomplete="off"
							ref={msgText}
						/>
						<button onClick={sendMsg} class="btn">
							<i class="fas fa-paper-plane"></i> Send
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
