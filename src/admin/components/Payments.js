import React, { useCallback, useEffect, useMemo, useState } from "react";

import Table from "./table/Table";
import axios from "axios";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMinusCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../../utilities/cookies.util";


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
                Cell: ({ value, cell }) =>
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
                },
                {
                    Header: 'Actions',
                    accessor: 'action',
                    Cell: ({ cell }) => (
                        cell.row.original.status == 0 ?
                        <button onClick={handleAllow} data-action="allow" data-id={cell.row.original.user_id} data-payment-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-green-300 rounded-full bg-green-200">Allow</button>
                            :
                        <button onClick={handleAllow} data-action="deny" data-id={cell.row.original.user_id} data-payment-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-red-300 rounded-full bg-red-200">Deny</button>
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
    let [searchQuery, setSearchQuery] = useState('')
    let [sortBy, setSortBy] = useState('id')
    let [asc, setAsc] = useState(true)
    let [pageStatus, setPageStatus] = useState(true)
    let [isLoading, setIsLoading] = useState(true)
    let url;
    useEffect(() => {
        let val;
        // if (localStorage.getItem("auth_token" == null)) {
        // if (sessionStorage.getItem("auth_token") == null) {
        if (getCookie("auth_token") == null) {
            setConfirmed(false);
            return false;
        }
        const fetchData = async () => {
            url = searchQuery.length === 0 ? `api/payment/get?page=${tableRefreshed}` : `api/payment/search?page=${tableRefreshed}`
            val = await axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .get(url, {
                        headers: { "X-XSRF-TOKEN": `${response.data}` },
                        params: {
                            per_page: tableData.pageSize,
                            sort_by: sortBy,
                            asc: asc?'asc':'desc',
                            search_query: searchQuery
                        }
                    })
                    .then((res) => {
                        if (res.data.status === 200) {
                            // setAsc(!asc)
                            // console.log(res.data)
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
                            console.log('Fetching not complete')
                            val = false;
                        }
                    });
            });
        };
        fetchData();
    }, [tableRefreshed,asc,tableData.pageSize,pageStatus, searchQuery]);


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
                        // console.log(res.data.message)
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

    const handleSearch = (e) => {
        // e.persist();
        // console.log(e.target)
        setSearchQuery(e.target.value)
    }

    // utility to optimize search function
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 300);
        };
    };


    const optimizedSearch = useCallback(debounce(handleSearch), []);
    return (
        <div className="h-full w-full flex flex-col gap-2 max-w-screen overflow-x-auto">
            <div className="w-full flex justify-end items-center space-x-2">
                    {/* <button onClick={onOpenModal} className="text-white gap-3 bg-mina-blue-light hover:bg-mina-blue-light/80 py-2   p-3 rounded-lg">
                        <FontAwesomeIcon icon={faUserPlus} /> &nbsp;

                        Add User</button> */}
                <input type="text"
                    onChange={(e) => {
                        optimizedSearch(e)
                    }}
                    // value={searchQuery}
                    name="searchQuery"
                    id="searchQuery"
                    placeholder="Search"
                    className="p-2 border-2 border-solid border-2-mina-blue-dark rounded-md self-end"
                />

            </div>
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