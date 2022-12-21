import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.png";
import Payments from "./components/Payments";
import Transactions from "./components/Transactions";
import Users from "./components/Users";
import Videos from "./components/Videos";

function Home(props) {

    const [page, setPage] = useState('users');

    const switchPage = () => {
        switch (page) {
            case 'users':
                return <Users />
                break;
            case 'payments':
                return <Payments />
                break;
            case 'transactions':
                return <Transactions />
                break;
            case 'videos':
                return <Videos />
                break;

            default:

                break;
        }
    }
    return (
        <div className="w-screen h-screen grid-cols-12 grid justify-start items-start auto-rows-min gap-3">
            <div className="col-span-12 lg:col-span-3 xl:col-span-2 h-fit lg:h-screen flex flex-col space-y-4 bg-gray-100">
                <div className="w-full h-24 bg-mina-blue-dark items-center justify-center flex">
                    <Link to="/">
                        <img src={logo} alt="mina logo" className="h-16 object-cover" />
                    </Link>
                </div>

                <div 
                    onClick={() => { setPage('users') }}
                    className="w-full h-12 items-center justify-center flex">
                    <div
                        className="bg-white shadow-sm hover:bg-slate-200 cursor-pointer w-full py-3 mx-2 font-bold rounded-lg"
                    >
                        Users
                    </div>

                </div>
                <div 
                    onClick={() => { setPage('payments') }}
                    className="w-full h-12 items-center justify-center flex">
                    <div
                        className="bg-white shadow-sm hover:bg-slate-200 cursor-pointer w-full py-3 mx-2 font-bold rounded-lg"
                    >
                        Payments
                    </div>

                </div>
                <div 
                    onClick={() => { setPage('videos') }}
                    className="w-full h-12 items-center justify-center flex">
                    <div
                        className="bg-white shadow-sm hover:bg-slate-200 cursor-pointer w-full py-3 mx-2 font-bold rounded-lg"
                    >
                        Videos
                    </div>

                </div>
                <div 
                    onClick={() => { setPage('transactions') }}
                    className="w-full h-12 items-center justify-center flex">
                    <div
                        className="bg-white shadow-sm hover:bg-slate-200 cursor-pointer w-full py-3 mx-2 font-bold rounded-lg"
                    >
                        Transactions
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-9 xl:col-span-10 grid grid-cols-12 p-3">
                {/* <div className="col-span-12 bg-mina-blue-dark h-16 rounded-lg p-3"></div> */}

                <div className="col-span-12 overflow-x-auto">
                    {/* <Payments/> */}
                    {/* <Videos/> */}
                    {/* <Transactions/> */}
                    {/* <Users /> */}

                    {
                        switchPage()
                    }
                </div>
            </div>
            {/* <Table srcSet={names}/> */}
        </div>
    );
}

export default Home;
