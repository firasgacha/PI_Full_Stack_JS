import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Store() {
	const { user, isAdmin } = useSelector((state) => state.auth);
	const { id } = useParams();
	const [StoreInfo, setStoreInfo] = useState([]);

	useEffect(() => {
		axios.get(`/store/api/owner/${id}`).then((res) => {
			if (res.data) {
				res.data.map((el) => (el.createdAt = el.createdAt.slice(0, 10)));
				setStoreInfo(res.data);
			}
		});
	}, []);

	const storeExists = () => {
		return (
			<>
				<section className="relative py-16 bg-blueGray-200">
					<div className="container mx-auto px-4">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
							<div className="px-6">
								<div className="flex flex-wrap justify-center">
									<div className="w-36 h-36 relative m-4 rounded bg-white">
										{user?._id ? (
											user._id === id ? (
												<h1 className="text-xl">Your Stores:</h1>
											) : (
												<h1 className="text-xl">{user.name} Stores:</h1>
											)
										) : (
											<h1 className="text-xl">Stores:</h1>
										)}
									</div>
								</div>
								<div className="flex flex-row justify-evenly">
									{StoreInfo.map((el) => {
										console.log(el);
										return (
											<div className="md:w-4/12 px-4">
												<Link to={`/store/${el._id}`}>
													<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
														<img
															alt="..."
															src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
															className="w-full align-middle rounded-t-lg"
														/>
														<blockquote className="relative p-8 mb-4">
															<svg
																preserveAspectRatio="none"
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 583 95"
																className="absolute left-0 w-full block h-95-px -top-94-px"
															>
																<polygon
																	points="-30,95 583,95 583,65"
																	className="text-lightBlue-500 fill-current"
																></polygon>
															</svg>
															<h4 className="text-xl font-bold text-white">
																{el["fullName"]}
															</h4>
															<p className="text-md font-light mt-2 text-white">
																{el["description"]}
															</p>
														</blockquote>
													</div>
												</Link>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		);
	};

	return (
		<>
			<Navbar transparent />
			<main className="profile-page">
				<section className="relative block h-500-px">
					<div className="w-50 justify-items-center"></div>
					<div
						className="absolute top-0 w-full h-full bg-center bg-cover"
						style={{
							backgroundImage:
								"url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
						}}
					>
						<span
							id="blackOverlay"
							className="w-full h-full absolute opacity-50 bg-black"
						></span>
					</div>
					<div
						className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
						style={{ transform: "translateZ(0)" }}
					>
						<svg
							className="absolute bottom-0 overflow-hidden"
							xmlns="http://www.w3.org/2000/svg"
							preserveAspectRatio="none"
							version="1.1"
							viewBox="0 0 2560 100"
							x="0"
							y="0"
						>
							<polygon
								className="text-blueGray-200 fill-current"
								points="2560 0 2560 100 0 100"
							></polygon>
						</svg>
					</div>
				</section>
				{StoreInfo.length > 0 ? (
					(console.log(StoreInfo), storeExists())
				) : (
					<>
						<section className="relative py-16 bg-blueGray-200">
							<div className="container mx-auto px-4">
								<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
									<h1 className="mx-auto text-xl py-3">
										You Don't Have Any Stores yet. Create One?
									</h1>
								</div>
							</div>
						</section>
					</>
				)}
			</main>
			<Footer />
		</>
	);
}
