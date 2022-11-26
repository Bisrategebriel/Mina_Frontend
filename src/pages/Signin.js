import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

function Signup() {
    return (
        <>
            <div className="w-screen h-24 p-3 md:px-24 px-6 flex justify-between items-center fixed z-50 bg-mina-blue-dark">
                <Link to="/">
                    <img src={logo} alt="mina logo" className="h-16 object-cover"/>
                </Link>
            </div>
            <div className="w-full grid grid-cols-12 px-12 md:px-24 lg:px-48 grid-rows-6">
                <div className="col-span-12 xl:col-span-8 xl:col-start-3 row-start-2 row-span-4 p-12 rounded-lg relative">
                    <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -top-12 -right-24 rounded-full"></div>
                    <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -bottom-12 -left-24 rounded-full"></div>
                    
                    <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-md bg-white/10 shadow-lg rounded-lg"></div>
                    
                    <div className="grid grid-cols-12 px-6 xl:px-24 relative z-20 gap-4">
                    
                        <div className="col-span-12 flex flex-col items-center space-y-4">
                            <img className="w-36" src={logo} alt="mina logo" srcSet="" />
                            <p className="text-lg">Welcome Back!</p>
                        </div>


                        <form className="col-span-12 grid-cols-12 grid gap-4">
                            {/* signin form */}
                            <div  className="col-span-12 grid-cols-12 grid gap-4">
                                <div className="col-span-12 flex flex-col space-y-2 justify-start">
                                    <label className="text-sm text-start" htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" placeholder="Email" className="p-3 bg-gray-200 rounded-lg" required />
                                </div>
                                <div className="col-span-12 flex flex-col space-y-2 justify-start">
                                    <label className="text-sm text-start" htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" placeholder="Password" className="p-3 bg-gray-200 rounded-lg" required />
                                </div>
                                <div className="col-span-12 flex justify-end">
                                    <input type="submit" value="Submit" className="bg-mina-blue-light py-2 px-4 text-white rounded-lg"/>
                                </div>
                            </div>

                        </form>

                        <div className="col-span-12 flex justify-center">
                            Don't have an account? <Link className="text-mina-blue-dark font-bold" to="/signup" > Register </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Signup;