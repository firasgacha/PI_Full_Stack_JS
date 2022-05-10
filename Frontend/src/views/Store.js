import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";

const StoreInfoInit = {
	fullName: "Joe Store",
	description: "No description",
	address: "No address",
	phone: "No phone",
	email: "No email",
	verified: false,
	contact: {
		website: "No website",
		facebook: "No facebook",
		instagram: "No instagram",
		twitter: "No twitter",
	},
	followers: 0,
	createdAt: "",
};

const products = [];
let editInput = {};

export default function Store() {
	const { id } = useParams();
	const navigate = useHistory();
	const [StoreInfo, setStoreInfo] = useState(StoreInfoInit);
	const [edit, setEdit] = useState(false);
	const [image, setImage] = useState(
		"https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
	);
	const { user, isAdmin } = useSelector((state) => state.auth);

	const editInfo = () => {
		editInput = {
			fullName: StoreInfo.fullName,
			description: StoreInfo.description,
			address: StoreInfo.address,
			phone: StoreInfo.phone,
			email: StoreInfo.email,
			website: StoreInfo.contact.website,
			facebook: StoreInfo.contact.facebook,
			instagram: StoreInfo.contact.instagram,
			twitter: StoreInfo.contact.twitter,
		};

		console.log(StoreInfo, editInput);
		setEdit(true);
	};

	const submitInfo = async () => {
		const payload = {
			fullName: editInput.fullName,
			profileImage: image,
			description: editInput.description,
			address: editInput.address,
			phone: editInput.phone,
			email: editInput.email,
			website: editInput.website,
			facebook: editInput.facebook,
			instagram: editInput.instagram,
			twitter: editInput.twitter,
		};

		await axios.patch(`/store/api/${id}`, payload).then((res) => {
			console.log(res.data);
		});

		setEdit(false);

		setStoreInfo((StoreInfo) => {
			return {
				...StoreInfo,
				fullName: editInput.fullName,
				description: editInput.description,
				address: editInput.address,
				phone: editInput.phone,
				email: editInput.email,
				contact: {
					website: editInput.website,
					facebook: editInput.facebook,
					instagram: editInput.instagram,
					twitter: editInput.twitter,
				},
			};
		});
	};

	const changeAvatar = async (e) => {
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", "qysdlxzm");

		axios
			.post("https://api.cloudinary.com/v1_1/du8mkgw6r/image/upload", formData)
			.then((response) => {
				console.log(response);
				const result = response.data;
				setImage(result.secure_url);
			});
	};

	useEffect(() => {
		axios.get(`/store/api/${id}`).then((res) => {
			if (res.data == null) {
				console.log("No store found");
				return;
			}
			res.data.createdAt = res.data.createdAt.slice(0, 10);
			setStoreInfo(res.data);
			if (res.data.profileImage) {
				setImage(res.data.profileImage);
			}
		});
		// get all products here
	}, [id]);

	const startChat = () => {
		const owner = StoreInfo.owner;
		const idUser = user._id;
		axios
			.post("http://localhost:5000/chat", { owner, idUser })
			.then((res) => {
				console.log(res);
				navigate.push(`/chats/${res.data.newChat._id}`);
			})
			.catch((err) => {
				console.log(err);
				navigate.push(`/chats/${err.response.data.id}`);
			});
	};

	const storeExists = () => {
		return (
			<>
				<section className="relative py-16 bg-blueGray-200">
					<div className="container mx-auto px-4">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
							<div className="px-6">
								<div className="flex flex-wrap justify-center">
									<div className="w-36 h-36 relative m-4 rounded bg-white">
										<img
											alt="..."
											src={image}
											className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-12 lg:-ml-20 max-w-150-px min-w-140-px"
										/>
									</div>
								</div>

								{edit ? (
									<div className="container mx-auto px-4">
										<div
											style={
												({ display: "flex" },
												{ flexDirection: "column" },
												{ alignContent: "center" },
												{ justifyContent: "center" })
											}
										>
											<div>
												<input
													type="text"
													defaultValue={editInput.fullName}
													onInput={(e) => {
														editInput.fullName = e.target.value;
													}}
												/>
											</div>
											<div>
												<input
													type="text"
													placeholder="Description"
													defaultValue={editInput.description}
													onChange={(e) => {
														editInput.description = e.target.value;
													}}
												/>
											</div>
											<div>
												<label
													htmlFor="file_up"
													className="cursor-pointer ml-1"
												>
													Change Profile Picture
												</label>
												<input
													type="file"
													name="file"
													id="file_up"
													className="hidden"
													onChange={changeAvatar}
												/>
											</div>
											<div>
												<input
													type="text"
													placeholder="Address"
													defaultValue={editInput.address}
													onChange={(e) => {
														editInput.address = e.target.value;
													}}
												/>
											</div>
											<div>
												<input
													type="text"
													placeholder="Phone"
													defaultValue={editInput.phone}
													onChange={(e) => {
														editInput.phone = e.target.value;
													}}
												/>
											</div>
											<div>
												<input
													type="text"
													placeholder="Email"
													defaultValue={editInput.email}
													onChange={(e) => {
														editInput.email = e.target.value;
													}}
												/>
											</div>
											<div>
												<input
													type="text"
													placeholder="Website"
													defaultValue={editInput.website}
													onChange={(e) => {
														editInput.website = e.target.value;
													}}
												/>
											</div>
											<div>
												<input
													type="text"
													placeholder="Facebook"
													defaultValue={editInput.facebook}
													onChange={(e) => {
														editInput.facebook = e.target.value;
													}}
												/>
											</div>
											<div>
												<input
													type="text"
													placeholder="Instagram"
													defaultValue={editInput.instagram}
													onChange={(e) => {
														editInput.instagram = e.target.value;
													}}
												/>
											</div>
											<div>
												<input
													type="text"
													placeholder="Twitter"
													defaultValue={editInput.twitter}
													onChange={(e) => {
														editInput.twitter = e.target.value;
													}}
												/>
											</div>
											{StoreInfo.verified ? (
												""
											) : (
												<div>
													<Link to={`/identityVerif/${id}`}>
														Verify your account
													</Link>
												</div>
											)}

											<button onClick={submitInfo}>Submit</button>
										</div>
									</div>
								) : (
									<div className="w-100 mb-12 flex flex-row justify-between">
										<div className="px-5 text-xl">
											<h1>
												{StoreInfo.fullName}
												{StoreInfo.verified ? (
													<i
														className="fa fa-check"
														style={{ color: "#54C6F9", margin: "0px 5px" }}
													></i>
												) : (
													""
												)}
											</h1>
											<h2>{StoreInfo.description}</h2>
											<h3>Since {StoreInfo.createdAt}</h3>
										</div>
										<div className="">
											<h2 className="mx-auto text-xl">Info :</h2>
											<ul>
												<li>
													<b>Website: </b>
													{StoreInfo.contact.website}
												</li>
												<li>
													<b>email: </b>
													{StoreInfo.email}
												</li>
												<li>
													<b>facebook: </b>

													{StoreInfo.contact.facebook}
												</li>
												<li>
													<b>instagram: </b>

													{StoreInfo.contact.instagram}
												</li>
												<li>
													{user._id === StoreInfo.owner ? (
														<button
															onClick={editInfo}
															className="bg-white text-lightBlue-400 shadow-lg font-normal h-20 w-20 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
														>
															Edit
														</button>
													) : (
														<button
															onClick={startChat}
															className="bg-white text-lightBlue-400 shadow-lg font-normal h-20 w-20 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
														>
															Start Chat
														</button>
													)}
													{/* <button
													onClick={startChat}
												>
													Chat With
												</button> */}
												</li>
											</ul>
										</div>
									</div>
								)}
							</div>
							<h1 className="text-center text-lg mb-5">
								{" "}
								{/* {StoreInfo.fullName}'s Products : */}
							</h1>
							<div className="flex flex-row justify-evenly">
								{products.map((product) => (
									<p key={product._id} className="text-center text-lg mb-5">
										{product.name}
									</p>
								))}
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
				{StoreInfo ? (
					storeExists()
				) : (
					<>
						<section className="relative py-16 bg-blueGray-200">
							<div className="container mx-auto px-4">
								<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
									<h1 className="mx-auto text-xl py-3">Store Not Found</h1>
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
