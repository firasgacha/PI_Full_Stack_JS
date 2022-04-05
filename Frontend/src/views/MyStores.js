import React, { useEffect, useState } from "react";

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function MyStores() {
	return (
		<>
			<Navbar transparent />
			<main className="profile-page">
				<section className="relative block h-500-px">
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
				<section className="relative py-16 bg-blueGray-200">
					<div className="container mx-auto px-4">
						<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
							<div className="px-6">
								<div className="flex flex-wrap justify-center">
									<div className="w-36 h-36 relative m-4 rounded bg-white">
										<img
											alt="..."
											src="../../public/assets/img/theme/team-4-800x800.jpg"
											className="w-full h-full object-cover display-block bg-white"
										/>
										<span className="absolute -bottom-24 left-0 w-full h-1/2 bg-gray-200 text-center font-normal uppercase text-blueGray-800 transition ease-in-out duration-50 hover:-bottom-1">
											<i className="fas fa-camera"></i>
											<label for="file_up" className="cursor-pointer ml-1">
												Change
											</label>
											<input
												type="file"
												name="file"
												id="file_up"
												className="hidden"
											/>
										</span>
									</div>
								</div>

								<div className="text-center mt-12">
									<div className="my-2">
										<label className="block text-sm font-normal leading-normal text-blueGray-700 mb-2">
											Name
										</label>
										<input
											className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150 ml-2"
											type="text"
											name="name"
											id="name"
											defaultValue=""
											placeholder="Your name"
										/>
									</div>
									<div className="my-2">
										<label className="block text-sm font-normal leading-normal mb-2 text-blueGray-700 mb-2">
											E-mail
										</label>
										<input
											className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150 ml-2"
											type="email"
											name="email"
											id="email"
											defaultValue=""
											disabled
										/>
									</div>
									<div className="my-2">
										<label className="block text-sm font-normal leading-normal mb-2 text-blueGray-700 mb-2">
											Address
										</label>
										<input
											className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150 ml-2"
											type="text"
											name="address"
											id="address"
											defaultValue=""
											placeholder="Your Address"
										/>
									</div>
									<div className="my-2">
										<label className="text-sm font-normal leading-normal mb-2 text-blueGray-700 mb-2 block">
											Password
										</label>
										<input
											className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150 ml-2"
											type="password"
											name="password"
											id="password"
											value=""
											placeholder="New password"
										/>
									</div>
									<div className="my-2">
										<label className="text-sm block font-normal leading-normal mb-2 text-blueGray-700 mb-2">
											Confirm password
										</label>
										<input
											className="border-0 px-2 py-2 bg-white rounded text-sm shadow focus:outline-none focus:ring w-auto ease-linear transition-all duration-150 ml-2"
											type="password"
											name="cf_password"
											id="cf_password"
											value=""
											placeholder="Confirm password"
										/>
									</div>
									<div>
										<em style={{ color: "crimson" }}>
											* If you update your password here, you will not be able
											to login quickly using google and facebook.
										</em>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
