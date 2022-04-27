import React, { useEffect, useRef, useState } from "react";
import chatStyle from "./index.module.css";
import axios from "axios";
import Message from "./message";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OlderMessages from "./OlderMessages";
import { socket } from "../../socket";
// messages =  document.getElementById("messages");

const otherInit = {
	_id: "",
	name: "",
	avatar: "",
};

export default function Chat() {
	const { id } = useParams();
	const { user, isAdmin } = useSelector((state) => state.auth);
	const [chatInfo, setChatInfo] = useState({});
	const [messageList, setMessageList] = useState([]);
	const [other, setOther] = useState(otherInit);
	const msgText = useRef(null);
	const messages = useRef(null);

	socket.on("message", (message) => {
		setMessageList((messageList) => [...messageList, message]);
		messages.current.scrollTop = messages.current.scrollHeight;
	});

	useEffect(() => {
		const fetchData = async (id) => {
			await axios.get(`/chat/${id}`).then((res) => {
				const { data } = res;
				setChatInfo(data.data);
				setMessageList(data.data.messages);
			});

			messages.current.value = messageList.map((message) => Message(message));
			messages.current.scrollTop = messages.current.scrollHeight;
		};
		const leavenRoom = () => {
			socket.emit("leaveRoom");
		};
		fetchData(id);
		return () => {
			leavenRoom();
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

	useEffect(() => {
		if (chatInfo.user1Info) {
			setOther(() => {
				if (chatInfo.user_1 === user._id) {
					return {
						_id: chatInfo.user_2,
						name: chatInfo.user2Info.name,
						avatar: chatInfo.user2Info.avatar,
					};
				} else {
					return {
						_id: chatInfo.user_1,
						name: chatInfo.user1Info.name,
						avatar: chatInfo.user1Info.avatar,
					};
				}
			});
		}
	}, [chatInfo, user]);

	const sendMsg = (e) => {
		e.preventDefault();

		const msg = { content: msgText.current.value, image: "" };

		socket.emit("chatMessage", msg);
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
						<h2 id="room-name">
							<img src={other.avatar} alt="" />
							<Link to={"/user-stores/" + other._id}> {other.name}</Link>
						</h2>
						<h3>
							<i className="fas fa-users"></i> Older Messages:
						</h3>
						<OlderMessages userId={user?._id} roomdId={id} />
					</div>
					<div ref={messages} className={chatStyle.chatMessages}>
						{messageList.map((message, index) => (
							<Message
								key={index}
								message={message}
								user={user}
								other={other}
							/>
						))}
					</div>
				</main>
				<div className={chatStyle.chatFormContainer}>
					<form id="chatForm" onSubmit={sendMsg}>
						<input
							id="msg"
							type="text"
							placeholder="Enter Message"
							required
							autoComplete="off"
							ref={msgText}
						/>
						<button type="submit" className={chatStyle.btn}>
							<i className="fas fa-paper-plane"></i> Send
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
