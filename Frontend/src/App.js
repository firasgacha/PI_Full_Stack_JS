import React, { useEffect } from "react";
import {
	BrowserRouter,
	BrowserRouter as Router,
	Switch,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	dispatchLogin,
	fetchUser,
	dispatchGetUser,
} from "./redux/actions/authAction";

import axios from "axios";
import { Redirect, Route } from "react-router";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";
import ActivationEmail from "./views/auth/ActiviationEmail";
import Landing from "./views/Landing";
import Profile from "./views/Profile";
import Index from "./views/Index.js";
import ResetPassword from "./views/auth/ResetPassword";
import EditUser from "./views/EditUser";
import Store from "./views/Store";
import MyStores from "./views/MyStores";

function App() {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.token);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		const firstLogin = localStorage.getItem("firstLogin");
		if (firstLogin) {
			const getToken = async () => {
				const res = await axios.post("/user/refresh_token", null);
				dispatch({ type: "GET_TOKEN", payload: res.data.access_token });
			};
			getToken();
		}
	}, [auth.isLogged, dispatch]);

	useEffect(() => {
		if (token) {
			const getUser = () => {
				dispatch(dispatchLogin());

				return fetchUser(token).then((res) => {
					dispatch(dispatchGetUser(res));
				});
			};
			getUser();
		}
	}, [token, dispatch]);

	const { isLogged } = auth;

	return (
		<Router>
			<BrowserRouter>
				<Switch>
					{/* add routes with layouts */}
					<Route path="/admin" component={Admin} />
					<Route path="/auth" component={isLogged ? Index : Auth} />
					{/* add routes without layouts */}
					<Route path="/edit_user/:id" component={EditUser} exact />
					<Route path="/user/reset/:token" exact component={ResetPassword} />
					<Route
						path="/user/activate/:activation_token"
						exact
						component={ActivationEmail}
					/>
					<Route path="/landing" exact component={Landing} />
					<Route path="/store/:id" exact component={Store} />
					<Route path="/user-stores/:id" exact component={MyStores} />
					<Route path="/profile" exact component={isLogged ? Profile : Auth} />
					<Route path="/" exact component={Index} />
					{/* add redirect for first page */}
					<Redirect from="*" to="/" />
				</Switch>
			</BrowserRouter>
		</Router>
	);
}

export default App;
