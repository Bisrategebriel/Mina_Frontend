import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "../App.css";

import PaymentInfo from "../components/PaymentInfo";
import ConfirmPayment from "../components/ConfirmPayment";
import axios from "axios";
import { getCookie, unsetCookie } from "../utilities/cookies.util";
import Swal from "sweetalert2";
import { useLogout } from "../hooks/utilityHooks";

function Confirm() {
    const navigate = useNavigate();
    
    const onLogoutSuccess = (data) => {
        if (data?.data.status === 200) {
            unsetCookie("auth_token");
        } else {
        }
    };
	const onLogoutError = (data) => {
	}
    const { refetch } = useLogout(onLogoutSuccess, onLogoutError); 
    const logout = (e) => {
        e.preventDefault();
        refetch();
        navigate("/signin");
	};
    const [paymentInfo, setPaymentInfo] = useState(true);
    const [confirmPayment, setConfirmPayment] = useState(false);
    return (
        <>
            <div className="w-screen h-24 p-3 md:px-24 px-6 flex justify-between items-center fixed z-50 bg-mina-blue-dark">
                <Link to="/">
                    <img src={logo} alt="mina logo" className="h-16 object-cover" />
                </Link>

                <div className=" font-comfortaa space-x-3">
                    {
                        getCookie("auth_token") ? 
                            <>
                                <button onClick={logout} className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
                                    Logout
                                </button>
                            </>
                        : 
                            <>
                                <Link to="/signin" replace>
                                    <button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
                                        Login
                                    </button>
                                </Link>
                                <Link to="/signup" replace>
                                    <button className="p-2 px-4 bg-white rounded-lg hover:bg-mina-orange-light hover:text-white text-mina-blue-dark font-bold">
                                        Register
                                    </button>
                                </Link>
                            </>
                    }
                    
                </div>
            </div>
            <div className="w-full grid grid-cols-12 px-6 md:px-24 lg:px-48 grid-rows-6">
                <div className="col-span-12 xl:col-span-8 xl:col-start-3 row-start-2 row-span-4 p-3  rounded-lg relative">
                    <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -top-12 -right-24 rounded-full"></div>
                    <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -bottom-12 -left-24 rounded-full"></div>

                    <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-md bg-white/10 shadow-lg rounded-lg"></div>

                    <div className="grid grid-cols-12 px-6 xl:px-24 relative z-20 gap-4">
                        <div className="col-span-12 flex flex-col items-center space-y-4">
                            <img className="w-36" src={logo} alt="mina logo" srcSet="" />
                            <p className="text-lg">Please confirm your payment to activate your account.</p>
                        </div>

                        <div className="col-span-12 flex w-full items-center">
                            <div className="rounded-full min-h-[48px] min-w-[48px] bg-mina-orange-light flex items-center justify-center">
                                <h1 className="text-white text-lg font-bold">1</h1>
                            </div>

                            {
                                confirmPayment ?
                                    <>
                                        <div className="grow h-3 w-full bg-mina-orange-light"></div>
                                        <div className="rounded-full min-h-[48px] min-w-[48px] bg-mina-orange-light flex items-center justify-center">
                                            <h1 className="text-white text-lg font-bold">2</h1>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="grow h-3 w-full bg-mina-blue-light"></div>
                                        <div className="rounded-full min-h-[48px] min-w-[48px] bg-mina-blue-dark flex items-center justify-center">
                                            <h1 className="text-white text-lg font-bold">2</h1>
                                        </div>
                                    </>
                            }
                        </div>

                        {/* Payment Infomation */}
                        {paymentInfo && <PaymentInfo  confirmPayment={confirmPayment} setConfirmPayment={setConfirmPayment} 
                        paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo} />}

                        {/* Confirm Payment */}
                        {confirmPayment && <ConfirmPayment setPaymentInfo={setPaymentInfo} setConfirmPayment={setConfirmPayment} />}
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Confirm;
