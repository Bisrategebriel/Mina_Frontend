import React, { useEffect, useMemo, useState } from "react";

import Table from "./table/Table";
import axios from "axios";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMinusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../../utilities/cookies.util";


function Transactions(props) {
    let columns = 
    useMemo(
        () => 
        [
            {
                Header: 'Paid For',
                accessor: 'paid_for_name',
            },
            {
                Header: 'Points',
                accessor: 'points',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Status',
                accessor: 'approved',
                Cell: ({ value }) => (
                    
                    value == 1 ?
                    <>
                            <FontAwesomeIcon icon={faCheckCircle} className='text-green-600' />
                        </>
                        :
                        value == 0 ?
                        <>
                            <FontAwesomeIcon icon={faMinusCircle} className='text-yellow-600' />
                        </> :
                        <>
                            <FontAwesomeIcon icon={faSpinner} className='text-gray-600' />
                        </>
                    //     <p className="px-3 py-1 rounded-full bg-green-200 w-fit">
                    //         Approved
                    //     </p>
                    //     :
                    // value == 0 ?
                    //     <p className="px-3 py-1 rounded-full bg-red-200 w-fit">
                    //         Denied
                    //     </p>
                    //     :
                    //     <p className="px-3 py-1 rounded-full bg-yellow-200 w-fit">
                    //         Pending
                    //     </p>
                  )
            },
            {
                Header: 'Paid At',
                accessor: 'paid_at',
            },
            {
                Header: 'Actions',
                accessor: 'action',
                Cell: ({ cell }) => (
                    <div className="">
                        {/* {console.log(cell.row.original.user_id)} */}
                        <button onClick={handleAllow} data-action="activate" data-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-green-300 rounded-full bg-green-200">Approve</button>
                        <button onClick={handleAllow} data-action="deactivate" data-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-red-300 rounded-full bg-red-200">Deny</button>
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
        // if (localStorage.getItem("auth_token" == null)) {
        // if (sessionStorage.getItem("auth_token") == null) {
        if (getCookie("auth_token") == null) {
            setConfirmed(false);
            return false;
        }
        const fetchData = async () => {
            
            val = await axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .get(`api/transaction/index?page=${tableRefreshed}`, {
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
                            // console.log(res.data)
                            // res.data.payments.paid_at = res.data.payments.paid_at.split("T")[0].split("T")[0]
                            setConfirmed({ ...confirmed, payments: res.data.transactions.data });
                            setTableData({
                                pageCount: res.data.transactions.last_page,
                                pageSize: res.data.transactions.per_page,
                                currentPage: res.data.transactions.current_page,
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
        let vidId = e.target.getAttribute("data-id");
        // console.log(vidId)
        let url = ""
        url = e.target.getAttribute("data-action") == "activate" ? `api/transaction/approve/${vidId}` : `api/transaction/disapprove/${vidId}`
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios
                .post(url, {
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
                        // console.log(res.data.message, pageStatus)

                        setPageStatus(pageStatus => !pageStatus)
                    } else {
                        swal.fire({
                            title: "Failure",
                            text: res.data.message,
                            icon: 'error',
                            toast: true
                        })
                        // setPageStatus(!pageStatus)
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

export default Transactions;