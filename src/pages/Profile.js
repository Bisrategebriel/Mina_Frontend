import {
	faDashboard,
	faMoneyBill,
	faSignOut,
	faUser,
	faUserCircle,
	faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useState } from "react";
import logo from "../images/logo.png";
import WatchedThumbnail from "../components/dashboard/WatchedThumbnail";
import { Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import TransactionCard from "../components/dashboard/TransactionCard";
import { useEffect } from "react";
import { LanguageContext } from "..";
import LanguageSelector from "../components/LanguageSelector";
import {
	useLogout,
	useSettings,
	useTransactionHistory,
	useUsers,
	useWatchHistory,
} from "../hooks/utilityHooks";
import { unsetCookie } from "../utilities/cookies.util";

function Profile(props) {
	const navigate = useNavigate();

	const [withdrawAmount, setWithdrawAmount] = useState(100);
	const [transactions, setTransactions] = useState([]);
	const [watchHistory, setWatchHistory] = useState([]);
	// const [isLoading, setIsLoading] = useState(true);
	const [pointMultiplier, setPointMultiplier] = useState(0);
	const [settingsInput, setSettingsInput] = useState({
		is_signup_active: "",
		point_value: "",
		bank1: "",
		bank2: "",
		bank3: "",
		bank4: "",
		registration_fee: "",
		ad1: "",
		ad2: "",
		error_list: [{ confirm_password: "Passwords do not match" }],
	});
	// const pointMultiplier = 15;

	// Logout
	const onLogoutSuccess = (data) => {
		if (data?.data.status === 200) {
			// localStorage.removeItem("auth_token");
			//sessionStorage.removeItem("auth_token");
            unsetCookie("auth_token");
			// localStorage.removeItem("auth_name");
			// useInvalidateQuery('currentUser')

			// navigate("/signin");
		} else {
			// console.log(data?.data); 
		}
	};
	const { refetch } = useLogout(onLogoutSuccess);
	const logout = (e) => {
		e.preventDefault();
		refetch();
		navigate("/signin");
	};
	const [registerInputs, setRegInputs] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone_number: "",
		password: "",
		new_password: "",
		confirm_password: "",
		points: 0,
		error_list: [{ confirm_password: "Passwords do not match" }],
	});

	const handleRegInput = (e) => {
		e.persist();
		setRegInputs({ ...registerInputs, [e.target.name]: e.target.value });
	};

	const handleEdit = (e) => {
		e.preventDefault();
		setRegInputs({
			...registerInputs,
			error_list: [{ confirm_password: "" }],
		});
		if (registerInputs.new_password !== registerInputs.confirm_password) {
			// console.log("password don't match");
			setRegInputs({
				...registerInputs,
				error_list: { confirm_password: "Passwords do not match" },
			});
			return;
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
			axios.post(`/api/user/update`, data).then((res) => {
				// console.log(res.data.message);
				if (res.data.status === 200) {
					swal.fire("Success", res.data.message, "success");
					// navigate("/signin");
				} else {
					setRegInputs({ ...registerInputs, error_list: res.data.errors });
				}
			});
		});
	};

	const handleWithdraw = () => {
		if (
			registerInputs.points * pointMultiplier < withdrawAmount ||
			withdrawAmount < 100
		) {
			swal.fire({
				title: "Error",
				text: `Your withdraw amount can't be larger than ${
					registerInputs.points * pointMultiplier
				} & less than 100 ETB`,
				icon: "error",
			});
			return;
		}
		// Submit withdrawal
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios
				.post(`/api/transaction/create`, {
					amount: withdrawAmount,
					points: (withdrawAmount / pointMultiplier).toFixed(2),
				})
				.then((res) => {
					if (res.data.status === 200) {
						setTransactions([...transactions, res.data.transaction]);
						// console.log(res.data.transaction);
					} else {
						swal.fire({
							title: "Error",
							text: res.data.message,
							icon: "error",
						});
					}
				});
		});
	};
    // Fetch User Info
	const onUserSuccess = (data) => {
		if (data?.data.status === 200) {
			setRegInputs({
				...registerInputs,
				first_name: data?.data.user.first_name,
				last_name: data?.data.user.last_name,
				email: data?.data.user.email,
				phone_number: data?.data.user.phone_number,
				points: data?.data.user.points,
				password: "",
				new_password: "",
				confirm_password: "",
			});
		} else {
			setRegInputs({ ...registerInputs, error_list: data?.data.errors });
		}
	};
	const onUserError = (error) => {};
	const { data: userData } = useUsers(onUserSuccess, onUserError);

	//Fetch Transaction History
	const onTransactionHistorySuccess = (data) => {
		setTransactions(data?.data.transactions);
	};
	const onTransactionHistoryError = () => {};
	const { data: transactionHistoryData, isLoading: isTransactionsLoading } =
		useTransactionHistory(onTransactionHistorySuccess, onTransactionHistoryError);

	//Fetch Watch History
	const onWatchHistorySuccess = (data) => {
		setWatchHistory(data?.data.watch_history);
	};
	const onWatchHistoryError = () => {};
	const { data: watchHistoryData, isLoading: isWatchHistoryLoading } =
		useWatchHistory(onWatchHistorySuccess, onWatchHistoryError);

	//Fetch Settings
	const onSettingsSuccess = (data) => {
		setPointMultiplier(data?.data.settings.point_value);
		
	};
	const onSettingsError = () => {};
	const { data: settingsData, isLoading: isSettingsLoading } = useSettings(
		onSettingsSuccess,
		onSettingsError
	);

	const languageContext = useContext(LanguageContext);
	const ln = languageContext[0];
	return (
		<div className="w-screen h-screen bg-slate-200 grid grid-cols-12 overflow-y-auto gap-2 justify-start content-start ">
			<div className="col-span-12 h-24 p-3 lg:px-24 px-6 flex justify-between items-center  z-50 bg-mina-blue-dark">
				<Link to="/">
					<img src={logo} alt="mina logo" className="h-16 object-cover" />
				</Link>

				<div className=" font-comfortaa space-x-3">
					<Link to="/dashboard" replace>
						<button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
							<FontAwesomeIcon icon={faVideo} />
							<p className="md:inline-block hidden">&nbsp; {ln.videos}</p>
						</button>
					</Link>
					<button
						onClick={logout}
						className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg"
					>
						<FontAwesomeIcon icon={faSignOut} />
						<p className="md:inline-block hidden">&nbsp; {ln.logout}</p>
					</button>
					<LanguageSelector />
				</div>
			</div>

				<React.Fragment>
					<div className="col-span-12 md:col-span-4 flex flex-col">
						<div className="flex flex-col bg-white m-4 p-4 rounded-xl text-start ">
							<div className="w-full flex justify-around">
								<div className="flex flex-col">
									<h1 className="text-lg">{ln.wallet}:</h1>
									<h1 className="text-3xl">
										{(registerInputs.points * pointMultiplier).toFixed(2)} {ln.etb}
									</h1>
								</div>
								<div className="flex flex-col">
									<h1 className="text-lg">{ln.points}:</h1>
									<h1 className="text-3xl">{registerInputs.points.toFixed(2)}</h1>
								</div>
							</div>

							{/* <div className="grid grid-cols-12 my-3 gap-2 w-full">
								<input
									className="col-span-12 lg:col-span-8 p-3 bg-slate-100"
									type="number"
									name="withdraw_amount"
									id="withdrawAmount"
									placeholder="Withdraw Amount"
									min="100"
									value={withdrawAmount}
									onChange={(e) => {
										setWithdrawAmount(e.target.value);
									}}
								/>
								<button
									onClick={handleWithdraw}
									className="col-span-12 lg:col-span-4 bg-mina-blue-light hover:bg-mina-blue-dark p-3 rounded-xl font-bold text-white"
								>
									{ln.withdraw}
								</button>
							</div> */}
						</div>

                        <div className="flex flex-col bg-white px-4 py-4 pb-4 m-4 rounded-xl relative items-stretch space-y-3 overflow-auto">
                            <h5 className="font-bold text-lg">{ln.pointAllocation}</h5>
                            <p className="text-start">
                                {ln.pap1}
                            </p>

                            <table className="w-full text-start">
                                <thead>
                                    <tr>
                                        <th className="text-start">{ln.duration}</th>
                                        <th className="text-start">{ln.points}</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    <tr className="odd:bg-slate-200 even:bg-white">
                                        <td className="p-2">30 {ln.minutes}</td>
                                        <td className="p-2">20 {ln.birr}</td>
                                    </tr>
                                    <tr className="odd:bg-slate-200 even:bg-white">
                                        <td className="p-2">30 {ln.minutes} - 1 {ln.hour}</td>
                                        <td className="p-2">15 {ln.birr}</td>
                                    </tr>
                                    <tr className="odd:bg-slate-200 even:bg-white">
                                        <td className="p-2">1 {ln.hour} - 1 {ln.day}</td>
                                        <td className="p-2">10 {ln.birr}</td>
                                    </tr>
                                    <tr className="odd:bg-slate-200 even:bg-white">
                                        <td className="p-2">1 {ln.day} - 1 {ln.week}</td>
                                        <td className="p-2">5 {ln.birr}</td>
                                    </tr>
                                    <tr className="odd:bg-slate-200 even:bg-white">
                                        <td className="p-2">1 {ln.week} - 1 {ln.month}</td>
                                        <td className="p-2">1 {ln.birr}</td>
                                    </tr>
                                    <tr className="odd:bg-slate-200 even:bg-white">
                                        <td className="p-2">&gt;1 {ln.month}</td>
                                        <td className="p-2">0.5 {ln.birr}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <p className="text-justify">
                            {ln.pap2}
                            <br />
                            {ln.pap3}
                            <br />
                            {ln.pap4}
                            </p>
                        </div>

						<div className="flex flex-col bg-white px-4 pb-4 m-4 rounded-xl relative items-stretch space-y-3 max-h-[600px] overflow-auto">
							<p className="text-xl font-bold my-3 sticky top-0 p-2 bg-gradient-to-b from-white via-white to-white/10">
								{ln.transactionHistory}
							</p>

							{
                            isTransactionsLoading ? (
                                <div className="col-span-12 h-full flex justify-center items-center">
                                    <div className="blob"></div>
                                </div>
                            ) : transactions?.map((transaction, key) => (
								<TransactionCard
									amount={transaction.amount}
									paid_at={transaction.paid_at}
									approved={transaction.approved}
									key={key}
								/>
							))}
						</div>

					</div>

					<div className="col-span-12 md:col-span-8 m-4 grid-auto-rows auto-rows-max h-fit space-y-2">
						<div className="w-full bg-white p-4 rounded-lg text-center h-fit">
							<FontAwesomeIcon
								icon={faUserCircle}
								className="text-6xl text-mina-blue-light"
							/>
							<h6 className="text-4xl my-4 font-bold">
								{registerInputs.first_name + " " + registerInputs.last_name}
							</h6>

							<form
								className="col-span-12 grid-cols-12 grid gap-4 lg:px-24"
								onSubmit={handleEdit}
							>
								{/* edit form */}
								<div id="personalInfo" className="col-span-12 grid-cols-12 grid gap-4">
									<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
										<label className="text-sm text-start" htmlFor="first_name">
											{ln.firstName}
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
											{ln.lastName}
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
											{ln.email}
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
                                            disabled
										/>
										<span>{registerInputs.error_list.email}</span>
									</div>
									<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
										<label className="text-sm text-start" htmlFor="phone_number">
											{ln.phoneNumber}
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
											{ln.oldPassword}
										</label>
										<input
											type="password"
											name="password"
											id="password"
											placeholder="Password"
											className="p-3 bg-gray-200 rounded-lg"
											onChange={handleRegInput}
											value={registerInputs.password}
											// required
										/>
										<span>{registerInputs.error_list.password}</span>
									</div>
									<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
										<label className="text-sm text-start" htmlFor="new_password">
											{ln.newPassword}
										</label>
										<input
											type="password"
											name="new_password"
											id="new_password"
											placeholder="Password"
											className="p-3 bg-gray-200 rounded-lg"
											onChange={handleRegInput}
											value={registerInputs.new_password}
											// required
										/>
										<span>{registerInputs.error_list.new_password}</span>
									</div>
									<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
										<label className="text-sm text-start" htmlFor="confirm_password">
											{ln.confirmPassword}
										</label>
										<input
											type="password"
											name="confirm_password"
											id="confirm_password"
											placeholder="Confirm Password"
											className="p-3 bg-gray-200 rounded-lg"
											onChange={handleRegInput}
											value={registerInputs.confirm_password}
											// required
										/>
										<span>{registerInputs.error_list.confirm_password}</span>
									</div>
									<div className="col-span-12 flex justify-end">
										<input
											type="submit"
											value={ln.submit}
											className="bg-mina-blue-light cursor-pointer hover:bg-mina-blue-dark py-2 px-4 text-white rounded-lg"
										/>
									</div>
								</div>
							</form>
						</div>

						<div className="col-span-12 md:col-span-8 p-2 bg-white text-start rounded-xl">
							{ln.watchHistory}
						</div>
						<div className="col-span-12 md:col-span-8 bg-white p-4 rounded-xl overflow-x-scroll flex space-x-4">
							{
                            isTransactionsLoading ? 
                            <div className="col-span-12 h-full flex justify-center items-center">
			                    <div className="blob"></div>
				            </div> :
                            watchHistory?.map((video_id) => (
								<WatchedThumbnail video_id={video_id} />
							))}
						</div>
					</div>
				</React.Fragment>
			
		</div>
	);
}

export default Profile;
