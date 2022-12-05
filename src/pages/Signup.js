import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "../App.css";

import axios from "axios";
import swal from "sweetalert";

function Signup() {
    const navigate = useNavigate();
    const [registerInputs, setRegInputs] = useState({
        first_name : '',
        last_name : '',
        email : '',
        phone_number : '',
        password : '',
        confirm_password : '',
        error_list: [
            {confirm_password : 'Passwords do not match'}
        ],
    });

    const handleRegInput = (e)=>{
        e.persist();
        setRegInputs({...registerInputs, [e.target.name]: e.target.value})
    }   

    const registerSubmit = (e) =>{
        e.preventDefault();

        if(registerInputs.password !== registerInputs.confirm_password){
            console.log("password don't match");
        }

        const data = {
            first_name: registerInputs.first_name,
            last_name: registerInputs.last_name,
            email: registerInputs.email,
            phone_number: registerInputs.phone_number,
            password: registerInputs.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/auth/register`, data).then(res => {
                console.log(res.data.status)
                if(res.data.status === 200){
                    swal("Success", res.data.message, "success");
                    navigate("/signin");
                } else {
                    setRegInputs({ ...registerInputs, error_list: res.data.errors});
                }
            });
        });
    }
    return (
        <>
            <div className="w-screen h-24 p-3 md:px-24 px-6 flex justify-between items-center fixed z-50 bg-mina-blue-dark">
                <Link to="/">
                    <img src={logo} alt="mina logo" className="h-16 object-cover" />
                </Link>
            </div>
            <div className="w-full grid grid-cols-12 px-6 md:px-24 lg:px-48 grid-rows-6 overflow-x-hidden md:overflow-x-auto">
                <div className="col-span-12 xl:col-span-8 xl:col-start-3 row-start-2 row-span-4 p-12 rounded-lg relative">
                    <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -top-12 -right-24 rounded-full"></div>
                    <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -bottom-12 -left-24 rounded-full"></div>

                    <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-md bg-white/10 shadow-lg rounded-lg"></div>

                    <div className="grid grid-cols-12 px-1 md:px-6 xl:px-24 relative z-20 gap-4">
                        <div className="col-span-12 flex flex-col items-center space-y-4">
                            <img className="w-36" src={logo} alt="mina logo" srcSet="" />
                            <p className="text-lg">Sign up and start earning</p>
                        </div>
                                <form className="col-span-12 grid-cols-12 grid gap-4" onSubmit={registerSubmit}>
                                    {/* signup form */}
                                    <div
                                        id="personalInfo"
                                        className="col-span-12 grid-cols-12 grid gap-4"
                                    >
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
                                                Password
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
                                            <label
                                                className="text-sm text-start"
                                                htmlFor="confirm_password"
                                            >
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

                
                        <div className="col-span-12 flex justify-center">
                            Already have an account?{" "}
                            <Link className="text-mina-blue-dark font-bold" to="/signin">
                                {" "}
                                Login{" "}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default Signup;
