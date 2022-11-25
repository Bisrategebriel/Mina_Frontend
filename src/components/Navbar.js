import React from 'react';
import logo from '../images/logo.png';

function Navbar(props) {
    return (
        <div className="w-screen h-24 p-3 md:px-24 px-6 flex justify-between items-center fixed z-50">
            <img src={logo} alt="mina logo" className="h-16 object-cover"/>
            
            <div className=" font-comfortaa space-x-3">
            <button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">Login</button>
            <button className="p-2 px-4 bg-white rounded-lg hover:bg-mina-orange-light hover:text-white text-mina-blue-dark font-bold">Register</button>
            </div>
        </div>
    );
}

export default Navbar;