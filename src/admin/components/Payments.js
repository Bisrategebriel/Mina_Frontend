import React, { useEffect, useMemo, useState } from "react";

import Table from "./table/Table";
import axios from "axios";
import swal from "sweetalert2";


function Payments(props) {
    let columns = 
    useMemo(
        () => 
        [
            {
                Header: 'Paid By',
                accessor: 'paid_by',
            },
            {
                Header: 'Gateway',
                accessor: 'gateway',
            },
            {
                Header: 'Transaction',
                accessor: 'transaction_number',
            },
            {
                Header: 'Paid At',
                accessor: 'paid_at',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Actions',
                accessor: 'action',
                Cell: ({ cell }) => (
                    <div className="">
                        {/* {console.log(cell.row.original.id)} */}
                        <button onClick={handleAllow} data-action="allow" data-id={cell.row.original.user_id} data-payment-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-green-300 rounded-full bg-green-200">Allow</button>
                        <button onClick={handleAllow} data-action="deny" data-id={cell.row.original.user_id} data-payment-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-red-300 rounded-full bg-red-200">Deny</button>
                    </div>
                  )
            },
            
        ]
        ,    
        []
    );

    const [confirmed, setConfirmed] = useState(
        {
            user_id: '',
            user: [],
            payments: []
        },

    );

    const [tableData, setTableData] = useState(
        {
            pageCount:0,
            pageSize:10,
            currentPage:1,
            sortBy:'created_at'
        }
    )
    let [tableRefreshed, setTableRefreshed] = useState(0)
    let [sortBy, setSortBy] = useState('id')
    let [asc, setAsc] = useState(true)
    let [pageStatus, setPageStatus] = useState(true)
    let [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        let val;
        if (localStorage.getItem("auth_token" == null)) {
            setConfirmed(false);
            return false;
        }
        const fetchData = async () => {
            
            val = await axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .get(`api/payment/get?page=${tableRefreshed}`, {
                        headers: { "X-XSRF-TOKEN": `${response.data}` },
                        params: {
                            per_page: tableData.pageSize,
                            sort_by: sortBy,
                            asc: asc?'asc':'desc'
                        }
                    })
                    .then((res) => {
                        if (res.data.status === 200) {
                            // setAsc(!asc)
                            console.log(res.data)
                            // res.data.payments.paid_at = res.data.payments.paid_at.split("T")[0].split("T")[0]
                            setConfirmed({ ...confirmed, payments: res.data.payments.data });
                            setTableData({
                                pageCount: res.data.payments.last_page,
                                pageSize: res.data.payments.per_page,
                                currentPage: res.data.payments.current_page,
                            })
                            setIsLoading(false)
                            // console.log(tableData)
                        } else {
                            
                            val = false;
                        }
                    });
            });
        };
        fetchData();
    }, [tableRefreshed,asc,tableData.pageSize,pageStatus]);


    const handleAllow = (e) => {
        let userId = e.target.getAttribute("data-id");
        let paymentId = e.target.getAttribute("data-payment-id");
        let url = ""
        url = e.target.getAttribute("data-action") == "allow" ? `api/payment/verify/${userId}` : `api/payment/revoke/${userId}`
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post(url, 
                    {
                        payment_id: paymentId
                    },
                    {
                        headers: { "X-XSRF-TOKEN": `${response.data}` },
                })
                .then((res) => {
                    if (res.data.status == 200) {
                        swal.fire({
                            title: "Success",
                            text: res.data.message,
                            icon: "success",
                            toast: true,
                        })
                        setPageStatus(pageStatus => !pageStatus)
                        console.log(res.data.message)
                    } else {
                        swal.fire({
                            title: "Failure",
                            text: res.data.message,
                            icon: 'error',
                            toast: true
                        })
                        // val = false;
                        // return false;
                    }
                })

        })
    }
    return (
        <div>
            {
                isLoading ?
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="blob"></div>
                    </div>
                :
                <Table columns={columns} data={confirmed.payments} 
                                tableData={tableData} 
                                setTableData={setTableData} 
                                tableRefreshed={tableRefreshed} 
                                setTableRefreshed={setTableRefreshed} 
                                setSortBy={setSortBy}
                                asc={asc}
                                setAsc={setAsc}
                        />

            }
        </div>
    );
}

export default Payments;