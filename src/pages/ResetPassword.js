import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import swal from 'sweetalert2';

function ResetPassword() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [loginInputs, setLoginInputs] = useState({
        email : '',
        error_list : [],
    });

    const handleLogininput = (e)=>{
        e.persist();

        setLoginInputs({
            ...loginInputs,
            [e.target.name] : e.target.value
        })
    }

    const resetSubmit = (e)=>{
        e.preventDefault();
        setErrorMessage("")
        e.target.disabled = true;
        const data = {
            email : loginInputs.email,
            _token : "{{ csrf_token() }}"
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/forgotPassword`, data).then( res=>{
                if(res.data.status === 200){
                    // navigate("/");
                    swal.fire("Success", res.data.message, "success");
                    // res.data.user.status ? navigate("/") : navigate("/confirmPayment")
                } else if(res.data.status === 403){
                    setLoginInputs({ ...loginInputs, error_list: res.data.errors});
                } else {
                    setErrorMessage(res.data.message);
                }
            });
        });
    }

    return (
        <>
            <div className="w-screen h-24 p-3 md:px-24 px-6 flex justify-between items-center fixed z-50 bg-mina-blue-dark">
                <Link to="/">
                    <img src={logo} alt="mina logo" className="h-16 object-cover"/>
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
                            <p className="text-lg">Reset Password!</p>
                        </div>


                        <form className="col-span-12 grid-cols-12 grid gap-4" onSubmit={resetSubmit}>
                            {/* signin form */}
                            <div  className="col-span-12 grid-cols-12 grid gap-4">
                                <div className="col-span-12 flex flex-col space-y-2 justify-start">
                                    <label className="text-sm text-start" htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" placeholder="Email" className="p-3 bg-gray-200 rounded-lg" onChange={handleLogininput} value={loginInputs.email} required />
                                    <span>{loginInputs.error_list.email}</span>
                                </div>
                                <div className="col-span-12 flex justify-end">
                                    <input type="submit" value="Reset Password" className="cursor-pointer hover:bg-mina-blue-dark bg-mina-blue-light py-2 px-4 text-white rounded-lg"/>
                                    <span>{loginInputs.error_list.password}</span>
                                </div>
                                <span className="col-span-12 text-sm text-red-500">{errorMessage}</span>
                            </div>

                        </form>

                        <div className="col-span-12 flex justify-center">
                            Go to &nbsp;<Link className="text-mina-blue-light italic font-bold" to="/signin" > Signin </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ResetPassword;