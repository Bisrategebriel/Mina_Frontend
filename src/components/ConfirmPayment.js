import React, { useState } from "react";
import cbe from "../images/cbe.png";
import awash from "../images/awash.png";
import dashen from "../images/dashen.png";
import abyssinia from "../images/abyssinia.png";
import axios from "axios";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ConfirmPayment(props) {
    const navigate = useNavigate();
    const [confirmDisabled, setConfirmDisabled] = useState(false)
    const [paymentInputs, setPaymentInputs] = useState({
        bank : 'cbe',
        paid_by : '',
        transaction_number : '',
        paid_at : Date.UTC,
        error_list : []

    });
    const handleBack = (e)=>{
        e.preventDefault();

        props.setConfirmPayment(false);
        props.setPaymentInfo(true);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {
            gateway : paymentInputs.bank,
            paid_by : paymentInputs.paid_by,
            transaction_number : paymentInputs.transaction_number,
            paid_at : paymentInputs.paid_at 
        }
        // console.log(data)
		swal2.fire({
			icon :"info", 
			title : "Confirm",
			text : "ገንዘቡን በምታስገቡበት ጊዜ የሚመጣላችሁን የትራንዛክሽን ቁጥር በትክክል ማስገባትዎን ያረጋግጡ።",
			showCancelButton : true,
			cancelButtonText : "Cancel",
			confirmButtonText : "Confirm"
			
		}).then((response) => {
			if(response.isConfirmed){
				axios.get('/sanctum/csrf-cookie').then(response => {
					axios.post(`/api/payment/create`, data).then(res => {
						// console.log(res.data.status)
						if(res.data.status === 200){
							// console.log(res.data);
		
							swal("Success", "Confirmation Sent. Your account will be activted after it is reviewed.", "success");
							navigate("/signin");
						} else {
							setPaymentInputs({ ...paymentInputs, error_list: res.data.errors});
						}
					});
				});
			}
		})
    }

    const handleTerms = (e)=>{
        setConfirmDisabled(e.target.checked)
    }
    const handleConfirmInput = (e)=>{
        e.persist();
        setPaymentInputs({...paymentInputs, [e.target.name]: e.target.value})
    }   
	return (
		<form className="col-span-12 grid-cols-12 grid gap-4" onSubmit={handleSubmit}>
			{/* Confirm Payment */}
			<div className="col-span-12 grid gap-4 grid-cols-12">
				<div className="col-span-12 md:col-span-4 flex flex-row overflow-x-auto justify-start md:flex-col items-center md:justify-center space-x-2 space-y-0 md:space-x-0 md:space-y-4">
					<p> Select Bank:</p>
                    <div className="">
						<input onChange={handleConfirmInput}  type="radio" name="bank" id="cbe" value="cbe" className="hidden peer" checked />
						<label
							className="bg-white p-2 peer-checked:bg-mina-blue-light peer-checked:rounded-md w-12 md:w-20 h-12 md:h-20 flex"
							htmlFor="cbe"
						>
							<img src={cbe} alt="" srcSet="" className="w-24 auto" />
						</label>
					</div>
					
                    <div>
						<input onChange={handleConfirmInput}  type="radio" name="bank" id="abyssinia" value="abyssinia" className="hidden peer" />
						<label
							className="bg-white p-2 peer-checked:bg-mina-blue-light peer-checked:rounded-md w-12 md:w-20 h-12 md:h-20 flex"
							htmlFor="abyssinia"
						>
							<img src={abyssinia} alt="" srcSet="" />
						</label>
					</div>

					{/* <div>
						<input onChange={handleConfirmInput}  type="radio" name="bank" id="awash" value="awash" className="hidden peer" />
						<label
							className="bg-white p-2 peer-checked:bg-mina-blue-light peer-checked:rounded-md w-12 md:w-20 h-12 md:h-20 flex"
							htmlFor="awash"
						>
							<img src={awash} alt="" srcSet="" />
						</label>
					</div> */}

					{/* <div>
						<input onChange={handleConfirmInput}  type="radio" name="bank" id="dashen" value="dashen" className="hidden peer" />
						<label
							className="bg-white p-2 peer-checked:bg-mina-blue-light peer-checked:rounded-md w-12 md:w-20 h-12 md:h-20 flex"
							htmlFor="dashen"
						>
							<img src={dashen} alt="" srcSet="" />
						</label>
					</div> */}
				</div>

				<div className="col-span-12 md:col-span-8 grid-cols-12 space-y-4">
					<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
						<label className="text-sm text-start" htmlFor="paid_by">
							Deposited By
						</label>
						<input
							type="text"
							name="paid_by"
							id="paid_by"
							placeholder="Full Name"
							className="p-3 bg-gray-200 rounded-lg"
                            value={paymentInputs.paid_by}
                            onChange={handleConfirmInput} 
							required
						/>
                        <span>{paymentInputs.error_list.paid_by}</span>
					</div>
					<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
						<label className="text-sm text-start" htmlFor="transaction_number">
							Transaction Number
						</label>
						<input
							type="text"
							name="transaction_number"
							id="transaction_number"
							placeholder="Transaction Reference Number"
							className="p-3 bg-gray-200 rounded-lg"
                            value={paymentInputs.transaction_number}
                            onChange={handleConfirmInput} 
							required
						/>
                        <span>{paymentInputs.error_list.transaction_number}</span>
					</div>
					<div className="col-span-12 md:col-span-6 flex flex-col space-y-2 justify-start">
						<label className="text-sm text-start" htmlFor="payment_date">
							Deposited At
						</label>
						<input
							type="date"
							name="paid_at"
							id="paid_at"
							placeholder="Payment Date"
							className="p-3 bg-gray-200 rounded-lg"
                            value={paymentInputs.paid_at}
                            onChange={handleConfirmInput} 
							required
						/>
                        <span>{paymentInputs.error_list.paid_at}</span>
					</div>

					<div className="col-span-12 flex justify-start space-x-2">
						<input type="checkbox" name="terms_agreement" id="terms_agreement" onChange={handleTerms} checked={confirmDisabled} />
						<label htmlFor="terms_agreement">
							<p className="text-start text-xs">
								By Signing up, you agree to our 
								<a href="/terms"> Terms and Privacy Policy</a>
							</p>
						</label>
					</div>
					{/* <div className="col-span-12">
                        <button className="bg-mina-orange-light py-2 px-4 text-lg rounded-lg text-white font-bold w-full">
                            Confirm Payment
                        </button>
				    </div> */}
                    <div className="col-span-12 flex justify-between">
                        <button onClick={handleBack} className="border-2 border-mina-blue-light py-2 px-4 text-lg rounded-lg text-mina-blue-dark hover:bg-mina-blue-light/20 font-bold">
                            back
                        </button>
                        <button type="submit" className="bg-mina-orange-light py-2 px-4 text-lg rounded-lg text-white font-bold hover:bg-mina-orange-light/80 disabled:bg-mina-orange-light/50" disabled={!confirmDisabled}>
                            Confirm Payment
                        </button>
                    </div>
				</div>
			</div>
		</form>
	);
}

export default ConfirmPayment;
