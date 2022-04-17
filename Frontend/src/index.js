import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import DataProvider from "./redux/store";

import App from "./App";

ReactDOM.render(
	<DataProvider>
		<App />
	</DataProvider>,
	document.getElementById("root")
);
