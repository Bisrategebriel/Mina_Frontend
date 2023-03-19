import React, { useCallback, useEffect, useMemo, useState } from "react";

import Table from "./table/Table";
import axios from "axios";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getCookie } from "../../utilities/cookies.util";


function Users(props) {
    // Modal
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    let columns =
        useMemo(
            () =>
                [
                    {
                        Header: 'ID',
                        accessor: 'id',
                    },
                    {
                        Header: 'First Name',
                        accessor: 'first_name',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'last_name',
                    },
                    {
                        Header: 'Email',
                        accessor: 'email',
                    },
                    {
                        Header: 'Phone Number',
                        accessor: 'phone_number',
                    },
                    {
                        Header: 'Points',
                        accessor: 'points',
                        Cell: ({ value }) => value && parseFloat(value).toFixed(2)
                    },
                    {
                        Header: 'Confirmed',
                        accessor: 'status',
                        Cell: ({ value, cell }) =>
                            value == 1 ?
                                <button onClick={handleAllow} data-action="deactivate" data-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-orange-300 rounded-full bg-orange-200">Revoke</button>
                                :
                                <button onClick={handleAllow} data-action="activate" data-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-green-300 rounded-full bg-green-200">Approve</button>
                    },
                    {
                        Header: 'Actions',
                        accessor: 'action',
                        Cell: ({ value, cell }) =>
                            value == 1 ?
                                <button onClick={handleAllow} data-action="deactivate" data-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-orange-300 rounded-full bg-orange-200">Revoke</button>
                                :
                                <button onClick={handleAllow} data-action="activate" data-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-green-300 rounded-full bg-green-200">Approve</button>
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
            pageCount: 0,
            pageSize: 10,
            currentPage: 1,
            sortBy: 'created_at'
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
        // let val;
        // if (localStorage.getItem("auth_token" == null)) {
        // if (sessionStorage.getItem("auth_token" == null)) {
            if (getCookie("auth_token") == null) {
            setConfirmed(false);
            return false;
        }
        const fetchData = async () => {
            url = searchQuery.length === 0 ? `api/user/index?page=${tableRefreshed}` : `api/user/search?page=${tableRefreshed}`
            await axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .get(url, {
                        headers: { "X-XSRF-TOKEN": `${response.data}` },
                        params: {
                            per_page: tableData.pageSize,
                            sort_by: sortBy,
                            asc: asc ? 'asc' : 'desc',
                            search_query: searchQuery
                        }
                    })
                    .then((res) => {
                        if (res.data.status === 200) {
                            // setAsc(!asc)
                            // console.log(res.data)
                            // res.data.payments.paid_at = res.data.payments.paid_at.split("T")[0].split("T")[0]
                            setConfirmed({ ...confirmed, payments: res.data.users.data });
                            setTableData({
                                pageCount: res.data.users.last_page,
                                pageSize: res.data.users.per_page,
                                currentPage: res.data.users.current_page,
                            })
                            setIsLoading(false)
                            // console.log(tableData)
                        } else {
                            // val = false;
                            // console.log(res.data)
                        }
                    });
            });
        };
        fetchData();
    }, [tableRefreshed, asc, tableData.pageSize, pageStatus, searchQuery]);


    const handleAllow = (e) => {
        let userId = e.target.getAttribute("data-id");
        // console.log(vidId)
        let url = ""
        url = e.target.getAttribute("data-action") == "activate" ? `api/user/verify/${userId}` : `api/user/revoke/${userId}`
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

    const handleEdit = (e) => {
        url = `api/user/edit?page=${tableRefreshed}`
        axios
            .post(url, {
            })
            .then((res) => {
                if (res.data.status === 200) {
                    // setAsc(!asc)
                    // console.log(res.data)
                    // res.data.payments.paid_at = res.data.payments.paid_at.split("T")[0].split("T")[0]
                    setConfirmed(confirmed.filter(function (value, index, confirmed) {
                        return value > 5;
                    }));
                    setTableData({
                        pageCount: res.data.users.last_page,
                        pageSize: res.data.users.per_page,
                        currentPage: res.data.users.current_page,
                    })
                    setIsLoading(false)
                    // console.log(tableData)
                } else {
                    swal.fire({
                        title: "Failure",
                        text: res.data.message,
                        icon: 'error',
                        toast: true
                    })
                    // val = false;
                    // console.log(res.data)
                }
            });
    }
    const handleDelete = (e) => {
        // console.log(confirmed)
        url = `api/user/destroy/${e.target.getAttribute("data-id")}`
        axios
            .post(url, {
            })
            .then((res) => {
                if (res.data.status === 200) {
                    // let val = confirmed.payments.filter(function(value){ 
                    //     return value.id != e.target.getAttribute("data-id");
                    // })
                    // console.log(e.target)
                    // setConfirmed({...confirmed, payments: val });
                    swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: "success",
                        toast: true,
                    })
                    e.target.parentElement.parentElement.parentElement.style.display = "none"
                    // setAsc(!asc)
                    // console.log(res.data)
                    // res.data.payments.paid_at = res.data.payments.paid_at.split("T")[0].split("T")[0]
                    // setConfirmed(confirmed.filter(function(value, index, confirmed){ 
                    //     return value.id == e.target.getAttribute("data-action");
                    // }));
                    // setIsLoading(false)
                } else {
                    // val = false;
                    // console.log(res.data)
                }
            });
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
            }, 600);
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

export default Users;