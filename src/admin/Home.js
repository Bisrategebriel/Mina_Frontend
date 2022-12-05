import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import logo from "../images/logo.png";

import Table from "rc-table";
import axios from "axios";
import swal from "sweetalert2";

function Home(props) {
	const [confirmed, setConfirmed] = useState(
        {
            user_id: '',
                user: [],
                payments: []
        },

    );
	useEffect(() => {
		let val;
		if (localStorage.getItem("auth_token" == null)) {
			setConfirmed(false);
			return false;
		}
		const fetchData = async () => {
			val = await axios.get("/sanctum/csrf-cookie").then((response) => {
				axios
					.get(`api/payment/get`, {
						headers: { "X-XSRF-TOKEN": `${response.data}` },
					})
					.then((res) => {
                        // if (res.data.user == null) {
                            // 	setConfirmed(...confirmed, res.data);
                            // 	return;
                            // }
                        if (res.data.status === 200) {
                            console.log(res.data.payments)
                            setConfirmed({...confirmed, payments : res.data.payments});
							// val = res.data.user.status ? true : false;
							// return res.data.user.status ? true : false;
                            // console.log(confirmed.payments[1].paid_at)
						} else {
							val = false;
							// return false;
						}
						// setConfirmed(val);
					});
			});
		};
		fetchData();
	}, []);


    const handleAllow = (e)=>{
        let userId = e.target.getAttribute("data-id");
        let url = ""
        url = e.target.getAttribute("data-action") == "allow" ? `api/payment/verify/${userId}` : `api/payment/revoke/${userId}`
			axios.get("/sanctum/csrf-cookie").then((response) => {
				axios
					.post(url, {
						headers: { "X-XSRF-TOKEN": `${response.data}` },
					})
					.then((res) => {
                        // if (res.data.user == null) {
                            // 	setConfirmed(...confirmed, res.data);
                            // 	return;
                            // }
                            // console.log(res.data.status)
                            // swal("success", "hello", "success")
                            if (res.data.status == 200) {
                            swal.fire({
                                title: "Success",
                                text: res.data.messages,
                                icon: "success",
                                toast: true,
                                // confirmButtonText: "OK",
                            })
                            console.log(res.data.messages)
                            // setConfirmed({...confirmed, payments : res.data.payments});
							// val = res.data.user.status ? true : false;
							// return res.data.user.status ? true : false;
                            // console.log(confirmed.payments[1].paid_at)
						} else {
							// val = false;
							// return false;
						}
						// setConfirmed(val);
					})
                    
                })
            }
	return (
		<div className="w-screen h-screen grid-cols-12 grid">
			<div className="hidden col-span-12 lg:col-span-3 xl:col-span-2 h-screen flex flex-col space-y-4 bg-gray-100">
				<div className="w-full h-24 bg-mina-blue-dark items-center justify-center flex">
					<Link to="/">
						<img src={logo} alt="mina logo" className="h-16 object-cover" />
					</Link>
				</div>

				<div className="w-full h-12 items-center justify-center flex">
					<Link
						to="/admin"
						className="bg-white shadow-sm hover:shadow-lg w-full py-3 mx-2 font-bold rounded-lg"
					>
						<button>Users</button>
                        {/* {confirmed.payments[1].user_id} */}
                        
					</Link>
				</div>
			</div>
			<div className="col-span-12 lg:col-span-9 xl:col-span-10 grid grid-cols-12 p-3">
				<div className="col-span-12 bg-mina-blue-dark h-16 rounded-lg p-3"></div>
				<div className="col-span-12">
                    <table className="w-full">
                        <thead className="w-full">
                            <tr className="grid grid-cols-12">
                                <th className="col-span-2">ID</th>
                                <th className="col-span-2">User ID</th>
                                <th className="col-span-2">Gateway</th>
                                <th className="col-span-2">Paid at</th>
                                <th className="col-span-2">Transaction No.</th>
                                <th className="col-span-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {confirmed.payments.map(item => 
                                <tr className="grid grid-cols-12">
                                    <td className="col-span-2">{item.id}</td>
                                    <td className="col-span-2">{item.user_id}</td>
                                    <td className="col-span-2">{item.gateway}</td>
                                    <td className="col-span-2">{item.paid_at.split("T")[0]}</td>
                                    <td className="col-span-2">{item.transaction_number}</td>
                                    <td className="col-span-2">
                                        <button onClick={handleAllow} data-action="allow" data-id={item.user_id}>Allow</button>
                                        <button onClick={handleAllow} data-action="deny" data-id={item.user_id}>Deny</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                </div>
			</div>
		</div>
	);
}

export default Home;
