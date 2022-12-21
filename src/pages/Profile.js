import {
	faDashboard,
	faMoneyBill,
	faSignOut,
	faUser,
	faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import logo from "../images/logo.png";
import WatchedThumbnail from "../components/dashboard/WatchedThumbnail";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TransactionCard from "../components/dashboard/TransactionCard";

function Profile(props) {
	const navigate = useNavigate();
	var [balance, setBalance] = useState(0);
	var [point, setPoint] = useState(0);

	const logout = (e) => {
		e.preventDefault();

		axios.post(`api/auth/logout`).then((res) => {
			if (res.data.status === 200) {
				console.log(res.data);
				localStorage.removeItem("auth_token");
				localStorage.removeItem("auth_name");

				// swal("Success", res.data.message, "success");
				navigate("/signin");
			} else {
				console.log(res.data);
			}
		});
	};
	const [registerInputs, setRegInputs] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone_number: "",
		password: "",
		new_password: "",
		confirm_password: "",
		error_list: [{ confirm_password: "Passwords do not match" }],
	});

	const handleRegInput = (e) => {
		e.persist();
		setRegInputs({ ...registerInputs, [e.target.name]: e.target.value });
	};

	const registerSubmit = (e) => {
		e.preventDefault();

		if (registerInputs.password !== registerInputs.confirm_password) {
			console.log("password don't match");
		}

		const data = {
			first_name: registerInputs.first_name,
			last_name: registerInputs.last_name,
			email: registerInputs.email,
			phone_number: registerInputs.phone_number,
			password: registerInputs.password,
			new_password: registerInputs.new_password,
		};

		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios.post(`/api/auth/register`, data).then((res) => {
				console.log(res.data.status);
				if (res.data.status === 200) {
					swal("Success", res.data.message, "success");
					navigate("/signin");
				} else {
					setRegInputs({ ...registerInputs, error_list: res.data.errors });
				}
			});
		});
	};

	return (
		<div className="w-screen h-screen bg-slate-200 grid grid-cols-12 overflow-y-auto gap-2 justify-start content-start ">
			<div className="col-span-12 h-24 p-3 lg:px-24 px-6 flex justify-between items-center  z-50 bg-mina-blue-dark">
				{/* <Link to="/">
                    <img src={logo} alt="mina logo" className="h-16 object-cover" />
                </Link> */}
				<Link to="/">
					<img src={logo} alt="mina logo" className="h-16 object-cover" />
				</Link>

				<div className=" font-comfortaa space-x-3">
					<Link to="/dashboard" replace>
						<button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
							<FontAwesomeIcon icon={faDashboard} />
							<p className="md:inline-block hidden">&nbsp; Dashboard</p>
						</button>
					</Link>
					<button
						onClick={logout}
						className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg"
					>
						<FontAwesomeIcon icon={faSignOut} />
						<p className="md:inline-block hidden">&nbsp; Logout</p>
					</button>
				</div>
			</div>

			<div className="col-span-12 md:col-span-4 flex flex-col">
				<div className="flex flex-col bg-white m-4 p-4 rounded-xl text-start ">
					<div className="w-full flex justify-around">
						<div className="flex flex-col">
							<h1 className="text-lg">Wallet:</h1>
							<h1 className="text-3xl">{balance} ETB</h1>
						</div>
						<div className="flex flex-col">
							<h1 className="text-lg">Points:</h1>
							<h1 className="text-3xl">{point}</h1>
						</div>
					</div>

					<div className="grid grid-cols-12 my-3 gap-2 w-full">
						<input
							className="col-span-12 lg:col-span-8 p-3 bg-slate-100"
							type="number"
							name="withdraw_amount"
							id="withdrawAmount"
							placeholder="Withdraw Amount"
							min="100"
						/>
						<button className="col-span-12 lg:col-span-4 bg-mina-blue-light hover:bg-mina-blue-dark p-3 rounded-xl font-bold text-white">
							Withdraw
						</button>
					</div>
				</div>

				<div className="flex flex-col bg-white px-4 pb-4 m-4 rounded-xl relative items-stretch space-y-3 max-h-[600px] overflow-auto">
					<p className="text-xl font-bold my-3 sticky top-0 p-2 bg-gradient-to-b from-white via-white to-white/10">
						Transaction History
					</p>

					<TransactionCard/>
				</div>
			</div>

			<div className="col-span-12 md:col-span-8 m-4 grid-auto-rows auto-rows-max h-fit space-y-2">
				<div className="w-full bg-white p-4 rounded-lg text-center h-fit">
					<FontAwesomeIcon icon={faUserCircle} className="text-6xl text-mina-blue-light" />
					<h6 className="text-4xl my-4 font-bold">Abebe Bekelle</h6>

					<form
						className="col-span-12 grid-cols-12 grid gap-4 lg:px-24"
						onSubmit={registerSubmit}
					>
						{/* edit form */}
						<div id="personalInfo" className="col-span-12 grid-cols-12 grid gap-4">
							<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
								<label className="text-sm text-start" htmlFor="first_name">
									First Name
								</label>
								<input
									type="text"
									name="first_name"
									id="first_name"
									placeholder="First Name"
									className="p-3 bg-gray-200 rounded-lg"
									onChange={handleRegInput}
									value={registerInputs.first_name}
									required
								/>
								<span>{registerInputs.error_list.first_name}</span>
							</div>
							<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
								<label className="text-sm text-start" htmlFor="first_name">
									Last Name
								</label>
								<input
									type="text"
									name="last_name"
									id="last_name"
									placeholder="Last Name"
									className="p-3 bg-gray-200 rounded-lg"
									onChange={handleRegInput}
									value={registerInputs.last_name}
									required
								/>
								<span>{registerInputs.error_list.last_name}</span>
							</div>
							<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
								<label className="text-sm text-start" htmlFor="email">
									Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="Email"
									className="p-3 bg-gray-200 rounded-lg"
									onChange={handleRegInput}
									value={registerInputs.email}
									required
								/>
								<span>{registerInputs.error_list.email}</span>
							</div>
							<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
								<label className="text-sm text-start" htmlFor="phone_number">
									Phone Number
								</label>
								<input
									type="text"
									name="phone_number"
									id="phone_number"
									placeholder="Phone Number"
									className="p-3 bg-gray-200 rounded-lg"
									onChange={handleRegInput}
									value={registerInputs.phone_number}
									required
								/>
								<span>{registerInputs.error_list.phone_number}</span>
							</div>
							<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
								<label className="text-sm text-start" htmlFor="password">
									Old Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									className="p-3 bg-gray-200 rounded-lg"
									onChange={handleRegInput}
									value={registerInputs.password}
									required
								/>
								<span>{registerInputs.error_list.password}</span>
							</div>
							<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
								<label className="text-sm text-start" htmlFor="password">
									New Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="Password"
									className="p-3 bg-gray-200 rounded-lg"
									onChange={handleRegInput}
									value={registerInputs.new_password}
									required
								/>
								<span>{registerInputs.error_list.password}</span>
							</div>
							<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
								<label className="text-sm text-start" htmlFor="confirm_password">
									Confirm Password
								</label>
								<input
									type="password"
									name="confirm_password"
									id="confirm_password"
									placeholder="Confirm Password"
									className="p-3 bg-gray-200 rounded-lg"
									onChange={handleRegInput}
									value={registerInputs.confirm_password}
									required
								/>
								<span>{registerInputs.error_list.confirm_password}</span>
							</div>
							<div className="col-span-12 flex justify-end">
								<input
									type="submit"
									value="Submit"
									className="bg-mina-blue-light cursor-pointer hover:bg-mina-blue-dark py-2 px-4 text-white rounded-lg"
								/>
							</div>
						</div>
					</form>
				</div>

                <div className="col-span-12 md:col-span-8 p-2 bg-white text-start rounded-xl">
                    Watch History
                </div>
				<div className="col-span-12 md:col-span-8 bg-white p-4 rounded-xl overflow-x-scroll flex space-x-4">
					<WatchedThumbnail />
				</div>
			</div>
		</div>
	);
}

export default Profile;
