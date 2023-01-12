import React, { useEffect, useState } from "react";
import cbe from "../images/cbe.png";
import awash from "../images/awash.png";
import dashen from "../images/dashen.png";
import abyssinia from "../images/abyssinia.png";
import axios from "axios";

function PaymentInfo(props) {
    const handleConfirm = (e)=>{
        e.preventDefault();
        props.setConfirmPayment(true);
        props.setPaymentInfo(false);
    }
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
    useEffect(() => {
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.get(`/api/settings`).then((res) => {
                if (res.data.status === 200) {
                    setSettingsInput({
                        ...settingsInput,
                        is_signup_active: res.data.settings.is_signup_active,
                        point_value: res.data.settings.point_value,
                        bank1: res.data.settings.bank1,
                        bank2: res.data.settings.bank2,
                        bank3: res.data.settings.bank3,
                        bank4: res.data.settings.bank4,
                        registration_fee: res.data.settings.registration_fee,
                    })
                } else {

                }
            });
        });
    }, [])
	return (
		<form className="col-span-12 grid-cols-12 grid gap-4">
			{/* Payment Information */}
			<div className="col-span-12 grid-cols-12 grid gap-4">
				<div className="col-span-12 flex justify-between p-8 bg-mina-blue-light text-white rounded-lg">
					<div className="flex flex-col justify-around h-full items-start">
						<h1 className="text-xl">Registration Fee</h1>
						<h1 className="text-3xl font-bold">{settingsInput.registration_fee} ETB</h1>
					</div>
				</div>

				<div className="col-span-12 2xl:col-span-6 p-3 border border-1 border-mina-blue-light rounded-lg flex items-center space-x-2 space-between">
					<div className="w-12 h-12 bg-white">
						<img src={cbe} alt="" srcSet="" />
					</div>
					<div className="flex flex-col items-start">
						<p className="text-start text-sm">Commercial Bank of Ethiopia</p>
						<p className="text-start">
							{" "}
							<span className="text-sm font-bold"> Account Name: </span>
							Mina Entertainment
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
							Mina Entertainment
						</p>
						<p className="text-start">
							<span className="text-sm font-bold">Account Number: </span>
							{settingsInput.bank2}
						</p>
					</div>
				</div>

				<div className="col-span-12 2xl:col-span-6 p-3 border border-1 border-mina-blue-light rounded-lg flex items-center space-x-2 space-between">
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
				</div>

				
                <div className="col-span-12 flex justify-end">
                    <button onClick={handleConfirm} className="bg-mina-orange-light py-2 px-4 text-lg rounded-lg text-white font-bold">
                        Confirm Payment
                    </button>
                </div>
			</div>
		</form>
	);
}

export default PaymentInfo;
