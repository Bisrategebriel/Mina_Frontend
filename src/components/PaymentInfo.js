import React, { useContext, useEffect, useState } from "react";
import cbe from "../images/cbe.png";
import awash from "../images/awash.png";
import dashen from "../images/dashen.png";
import abyssinia from "../images/abyssinia.png";
import axios from "axios";
import { useSettings, useUsers } from "../hooks/utilityHooks";
import swal from "sweetalert2";
import { LanguageContext } from "..";
import { setCookie, unsetCookie, getCookie } from "../utilities/cookies.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function PaymentInfo(props) {
	const handleConfirm = (e) => {
		e.preventDefault();
		props.setConfirmPayment(true);
		props.setPaymentInfo(false);
	};
	const [settingsInput, setSettingsInput] = useState({
		is_signup_active: "",
		point_value: "",
		bank1: "",
		bank2: "",
		bank3: "",
		bank4: "",
		registration_fee: "",
		error_list: [{ confirm_password: "Passwords do not match" }],
	});
    const [currentUser, setCurrentUser] = useState(null);
    // Fetch Current User
    const onSuccess = (data) => {

        if (data?.data.status === 500) {
            // localStorage.removeItem("auth_token");
            //sessionStorage.removeItem("auth_token");
            unsetCookie("auth_token");
            unsetCookie("auth_token");
            setCurrentUser(null)
        } else if (data?.data.status === 200) {
            // setIsVerified(data?.data.user.email_verified_at ? true : false);
            setCurrentUser(data?.data)
        }
    }
    const onError = (error) => {
        setCurrentUser(null)
    }
    const { isFetching, isLoading, isFetched, data, isError, error } = useUsers(onSuccess, onError);

	//Fetch Settings
	const onSettingsSuccess = (data) => {
		setSettingsInput({
			...settingsInput,
			is_signup_active: data?.data.settings.is_signup_active,
			point_value: data?.data.settings.point_value,
			bank1: data?.data.settings.bank1,
			bank2: data?.data.settings.bank2,
			bank3: data?.data.settings.bank3,
			bank4: data?.data.settings.bank4,
			registration_fee: data?.data.settings.registration_fee,
			registration_fee_usd: data?.data.settings.registration_fee_usd,
		});
	};
	const onSettingsError = () => {};
	const { data: settingsData, isLoading: isSettingsLoading } = useSettings(
		onSettingsSuccess,
		onSettingsError
	);

	const [registerInputs, setRegInputs] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone_number: "",
		currency: "ETB",
		error_list: [{}],
	});

	const handleRegInput = (e) => {
		e.persist();
		setRegInputs({ ...registerInputs, [e.target.name]: e.target.value });
	};

	const handleEdit = (e) => {
		e.preventDefault();
		setRegInputs({
			...registerInputs,
			error_list: [{}],
		});

		const data = {
			first_name: registerInputs.first_name,
			last_name: registerInputs.last_name,
			email: registerInputs.email,
			phone_number: registerInputs.phone_number.toString(),
			currency: registerInputs.currency,
            user_id: currentUser?.user.id,
		};

		axios.post(`/api/getChapaCheckout`, data).then((res) => {
			// console.log(res.data);
			// console.log(data)
			if (res.data.status == 200 && res.data.res.status == "success") {
				swal
					.fire(
						"Success",
						`Click 'OK' or visit: ${res.data.res.data.checkout_url} to finish the payment.`,
						"success",
                        
					)
					.then((res2) => {
						if (res2.isConfirmed) {
						// navigate("/signin");
                        onCloseModal();

						// console.log(res);
						window.location.replace(res.data.res.data.checkout_url);
						}
					});
				// navigate("/signin");
			} else if (res.data.status === 200 && res.data.res.status === "failed") {
                console.log(res.data)
				swal.fire(
					"Error",
					"Make sure you filled the required fields correctly",
					"error"
				);
				// navigate("/signin");
			} else {
				setRegInputs({ ...registerInputs, error_list: res.data.errors });
			}
		});
	};

	// Modal
	const [open, setOpen] = useState(false);

	const onOpenModal = (e) => {
		e.preventDefault();
		document.body.style.overflow = "hidden";
		setOpen(true);
	};
	const onCloseModal = () => {
		document.body.style.overflow = "auto";
		setRegInputs({
			first_name: "",
			last_name: "",
			email: "",
			phone_number: "",
			currency: "ETB",
			error_list: [{}],
		});
		setOpen(false);
	};
	const languageContext = useContext(LanguageContext);
	const ln = languageContext[0];
	return (
		<React.Fragment>
			<form className={open ? "hidden" : "col-span-12 grid-cols-12 grid gap-4"}>
				{/* Payment Information */}
				<div className="col-span-12 grid-cols-12 grid gap-4 ">
					<div className="col-span-12 flex justify-between p-2 md:p-8 bg-mina-blue-light text-white rounded-lg">
						<div className="flex flex-col justify-around h-full items-start">
							<h1 className="text-xl">Registration Fee</h1>
							<h1 className="text-3xl font-bold">
								{settingsInput.registration_fee} ETB
							</h1>
							<h1 className="text-3xl font-bold">
								${settingsInput.registration_fee_usd}
							</h1>
						</div>
					</div>
					<div className="col-span-12 flex justify-between p-2	 bg-mina-blue-light text-white rounded-lg">
						{/* <p>{ln.waitPatiently} </p> */}
						በባንክ ቁጥሮቻችን አስገብታችሁ የትራንዛክሽን ቁጥር የላካችሁ ሰዎች ክፍያውን አረጋግጠን እስከምናሳልፋችሁ በትዕግስት ይጠብቁን።
					</div>

					{/* <div className="col-span-12 2xl:col-span-6 p-3 border border-1 border-mina-blue-light rounded-lg flex items-center space-x-2 space-between">
						<div className="w-12 h-12 bg-white">
							<img src={cbe} alt="" srcSet="" />
						</div>
						<div className="flex flex-col items-start">
							<p className="text-start text-sm">Commercial Bank of Ethiopia</p>
							<p className="text-start">
								{" "}
								<span className="text-sm font-bold"> Account Name: </span>
								Hana Sahile
							</p>
							<p className="text-start">
								<span className="text-sm font-bold">Account Number: </span>
								{settingsInput.bank1}
							</p>
						</div>
					</div>

					<div className="col-span-12 2xl:col-span-6 p-3 border border-1 border-mina-blue-light rounded-lg flex items-center space-x-2 space-between">
						<div className="w-12 h-12 bg-white">
							<img src={abyssinia} alt="" srcSet="" />
						</div>
						<div className="flex flex-col items-start">
							<p className="text-start text-sm">Abyssinia Bank</p>
							<p className="text-start">
								{" "}
								<span className="text-sm font-bold"> Account Name: </span>
								Rakeb Alemayehu
							</p>
							<p className="text-start">
								<span className="text-sm font-bold">Account Number: </span>
								{settingsInput.bank2}
							</p>
						</div>
					</div> */}

					{/* <div className="col-span-12 2xl:col-span-6 p-3 border border-1 border-mina-blue-light rounded-lg flex items-center space-x-2 space-between">
						<div className="w-12 h-12 bg-white">
							<img src={awash} alt="" srcSet="" />
						</div>
						<div className="flex flex-col items-start">
							<p className="text-start text-sm">Awash International Bank</p>
							<p className="text-start">
								{" "}
								<span className="text-sm font-bold"> Account Name: </span>
								Mina Entertainment
							</p>
							<p className="text-start">
								<span className="text-sm font-bold">Account Number: </span>
								{settingsInput.bank3}
							</p>
						</div>
					</div>

					<div className="col-span-12 2xl:col-span-6 p-3 border border-1 border-mina-blue-light rounded-lg flex items-center space-x-2 space-between">
						<div className="w-12 h-12 bg-white">
							<img src={dashen} alt="" srcSet="" />
						</div>
						<div className="flex flex-col items-start">
							<p className="text-start text-sm">Dashen Bank</p>
							<p className="text-start">
								{" "}
								<span className="text-sm font-bold"> Account Name: </span>
								Mina Entertainment
							</p>
							<p className="text-start">
								<span className="text-sm font-bold">Account Number: </span>
								{settingsInput.bank4}
							</p>
						</div>
					</div> */}

					<div className="col-span-12 flex justify-end space-y-4 space-x-0 md:space-y-0 md:space-x-4 flex-col md:flex-row md:items-start">
						<p>በቴሌብር፣ ሲቢኢ ብር እና ሌሎች የክፍያ አማራጮች ለመክፈል ይሄን ይጠቀሙ:</p>
						<div className="flex flex-col gap-4">
							<button
								onClick={onOpenModal}
								className="bg-mina-blue-light py-2 px-4 text-lg rounded-lg text-white font-bold"
							>
								Pay with Chapa
							</button>
							{/* <button
								onClick={handleConfirm}
								className="bg-transparent py-2 px-4 text-sm rounded-lg text-mina-blue-light font-bold"
							>
								Confirm Direct Deposit
							</button> */}
						</div>
					</div>
				</div>
			</form>
			{/* Popup payment window */}
			<div
				id="modal"
				className={
					open
						? "fixed top-8 left-0 w-screen h-screen bg-white grid grid-cols-12 items-center p-3"
						: "hidden"
				}
			>
				<form
					className="col-span-12 grid-cols-12 grid gap-4 xl:px-96 md:px-24 px-12 overflow-y-auto"
					onSubmit={handleEdit}
				>
					{/* user form */}
					<div id="payerInfo" className="col-span-12 grid-cols-12 grid gap-4">
						<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
							<label className="text-sm text-start" htmlFor="first_name">
								{ln.firstName} *
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
							<span>{registerInputs.error_list?.first_name}</span>
						</div>
						<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
							<label className="text-sm text-start" htmlFor="first_name">
								{ln.lastName} *
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
							<span>{registerInputs.error_list?.last_name}</span>
						</div>
						<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
							<label className="text-sm text-start" htmlFor="email">
								{ln.email} *
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
							<span>{registerInputs.error_list?.email}</span>
						</div>
						<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
							<label className="text-sm text-start" htmlFor="phone_number">
								{ln.phoneNumber}(07,09...)
							</label>
							<input
								type="text"
								name="phone_number"
								id="phone_number"
								placeholder="10 digit Phone # eg. 0900000000 or 07.."
								className="p-3 bg-gray-200 rounded-lg"
								onChange={handleRegInput}
								value={registerInputs.phone_number}
							/>
							<span>{registerInputs.error_list?.phone_number}</span>
						</div>
                        <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
							<label className="text-sm text-start" htmlFor="currency">
								{ln.currency}*
							</label>
                            <select id="currency" name="currency" value={registerInputs.currency} className="p-3 bg-gray-200 rounded-lg" onChange={handleRegInput}>
                                <option value="ETB">ETB</option>
                                <option value="USD">USD</option>
                            </select>
							<span>{registerInputs.error_list?.currency}</span>
						</div>
						<div className="col-span-12 flex justify-end space-y-4 space-x-0 md:space-y-0 md:space-x-4 flex-col md:flex-row md:items-center">
							<div className="col-span-12 flex justify-end">
								<button
									onClick={onCloseModal}
									className="rounded-lg cursor-pointer bg-mina-orange-light px-4 py-2 text-white hover:bg-orange-500 w-full"
								>
									{ln.close}
								</button>
							</div>
							<input
								type="submit"
								value={ln.submit}
								className="bg-mina-blue-light cursor-pointer hover:bg-mina-blue-dark py-2 px-4 text-white rounded-lg"
							/>
						</div>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
}

export default PaymentInfo;
