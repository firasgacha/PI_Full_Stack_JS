import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import DataProvider from "./redux/store";

import App from "./App";
import Chat from "./components/chatbot/chat";



ReactDOM.render(
	<DataProvider>
		<Chat />
		<App />
	</DataProvider>,
	document.getElementById("root")
);
