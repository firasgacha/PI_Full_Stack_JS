/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import UserDropdown from "../Dropdowns/UserDropdown";
import {useSelector} from "react-redux";
import logo1 from '../../assets/img/baazar_logo.jpg';

export default function Navbar(props) {
	const [navbarOpen, setNavbarOpen] = React.useState(false);
	const auth = useSelector(state => state.auth)
	const {user , isLogged} = auth
	const [logo, setLogo] = React.useState(logo1);
	const userLink = () => {
		return(
			<UserDropdown/>)
	}

	return (
		<>
			<nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blueGray-800 shadow">
				<div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
					<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
						<Link
							to="/"
							className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
						>
							<div class="avatar">
									<img src={logo} style={{ width: "50px", height: "50px" }} />
									{/* <p className="text-xl text-white">Baazar</p> */}
							</div>
						</Link>
						<button
							className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
							type="button"
							onClick={() => setNavbarOpen(!navbarOpen)}
						>
							<i className="fas fa-bars"></i>
						</button>
					</div>
					<div
						className={
							"lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
							(navbarOpen ? " block" : " hidden")
						}
						id="example-navbar-warning"
					>
						<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
							{
								isLogged
									? userLink()
									:<li className="flex items-center">
										<Link
											className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
											to="/auth/login"
										>
											<i className="far fa-user"></i>
										</Link>
									</li>

							}

							<li className="flex items-center">
								<Link to="/Contact">
									<a
										className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
									>
										<i className="fas fa-arrow-alt-circle-down"></i> Contact Us
									</a>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}
