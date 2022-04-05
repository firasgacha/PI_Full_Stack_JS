import React, { useEffect, useState } from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import { render } from "react-dom";

const StoreInfoInit = {
	fullName: "Joe Store",
	profileImage: "defaultStorePic.png",
	coverImage: "defaultCoverPic.png",
	description: "No description",
	address: "No address",
	phone: "No phone",
	email: "No email",
	contact: {
		website: "No website",
		facebook: "No facebook",
		instagram: "No instagram",
		twitter: "No twitter",
	},
	followers: 0,
	createdAt: "",
};

export default function Store() {
	const { id } = useParams();

	const [StoreInfo, setStoreInfo] = useState(StoreInfoInit);

	useEffect(() => {
		axios.get(`/store/${id}`).then((res) => {
			if (res.data == null) {
				console.log("No store found");
				return;
			}
			res.data.createdAt = res.data.createdAt.slice(0, 10);
			setStoreInfo(res.data);
		});
	}, [id]);

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
											src={"../../src/assets/img/" + StoreInfo.coverImage}
											className="w-full h-full object-cover display-block bg-white"
										/>
									</div>
								</div>

								<div className="w-100 mb-12 flex flex-row justify-between">
									<div className="px-5 text-xl">
										<h1>{StoreInfo.fullName}</h1>
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
										</ul>
									</div>
								</div>
							</div>
							<h1 className="text-center text-lg mb-5">
								{" "}
								{StoreInfo.fullName}'s Products :
							</h1>
							<div className="flex flex-row justify-evenly">
								<div className="md:w-4/12 px-4 ">
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
												Top Notch Services
											</h4>
											<p className="text-md font-light mt-2 text-white">
												The Arctic Ocean freezes every winter and much of the
												sea-ice then thaws every summer, and that process will
												continue whatever happens.
											</p>
										</blockquote>
									</div>
								</div>
								<div className="md:w-4/12 px-4">
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
												Top Notch Services
											</h4>
											<p className="text-md font-light mt-2 text-white">
												The Arctic Ocean freezes every winter and much of the
												sea-ice then thaws every summer, and that process will
												continue whatever happens.
											</p>
										</blockquote>
									</div>
								</div>
								<div className="md:w-4/12 px-4">
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
												Top Notch Services
											</h4>
											<p className="text-md font-light mt-2 text-white">
												The Arctic Ocean freezes every winter and much of the
												sea-ice then thaws every summer, and that process will
												continue whatever happens.
											</p>
										</blockquote>
									</div>
								</div>
								<div className="md:w-4/12 px-4">
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
												Top Notch Services
											</h4>
											<p className="text-md font-light mt-2 text-white">
												The Arctic Ocean freezes every winter and much of the
												sea-ice then thaws every summer, and that process will
												continue whatever happens.
											</p>
										</blockquote>
									</div>
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
