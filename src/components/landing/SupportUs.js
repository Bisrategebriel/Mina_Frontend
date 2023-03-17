import axios from 'axios';
import React, { useContext, useState } from 'react';
import swal from 'sweetalert2';
import { LanguageContext } from '../..';
import FAQ from './FAQ';

function SupportUs(props) {
	const languageContext = useContext(LanguageContext);
	const ln = languageContext[0]

	const [registerInputs, setRegInputs] = useState({
		first_name: "",
		last_name: "",
		amount: "",
		email: "",
		// phone_number: "",
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
			amount: registerInputs.amount,
			email: registerInputs.email,
			// phone_number: registerInputs.phone_number.toString(),
			currency: registerInputs.currency,
			// user_id: currentUser?.user.id,
		};

		axios.post(`/api/getTippingCheckout`, data).then((res) => {
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
							// onCloseModal();

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
	return (
		<div className='h-full my-24'>
			<div className="w-full grid grid-cols-12 px-3 md:px-12 lg:px-24 ">
				<div className="col-span-12 p-3 my-6">
					<h2 className='text-3xl md:text-5xl text-center'>{ln.supportUs}</h2>
					<p>{ln.supportUsTxt} </p>
				</div>
				<form
					className="col-span-12 grid-cols-12 grid gap-4 xl:px-96 md:px-24 px-12"
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
						{/* <div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
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
						</div> */}
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
						<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
							<label className="text-sm text-start" htmlFor="amount">
								{ln.amount}
							</label>
							<input
								type="text"
								name="amount"
								id="amount"
								placeholder="Amount to tip"
								className="p-3 bg-gray-200 rounded-lg"
								onChange={handleRegInput}
								value={registerInputs.amount}
							/>
							<span>{registerInputs.error_list?.amount}</span>
						</div>

						<div className="col-span-12 flex justify-between">
							<button type="submit" className="bg-mina-orange-light py-2 px-4 text-lg rounded-lg text-white font-bold hover:bg-mina-orange-light/80 disabled:bg-mina-orange-light/50">
								Send Tip
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SupportUs;