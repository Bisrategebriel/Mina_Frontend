import React, { useCallback, useEffect, useMemo, useState } from "react";

import Table from "./table/Table";
import axios from "axios";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClose, faMinusCircle, faTimesCircle, faUserPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Videos(props) {
    // Table Column Headers
    let columns = useMemo(
        () => [
            {
                Header: "Video ID",
                accessor: "video_id",
            },
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value, cell }) =>
                    value == 1 ?
                        <>
                            <FontAwesomeIcon icon={faCheckCircle} className='text-green-600' />
                        </>
                        :
                        <>
                            <FontAwesomeIcon icon={faMinusCircle} className='text-yellow-600' />
                        </>
            },
            {
                Header: "Points",
                accessor: "points",
                Cell: ({ value }) => value && parseFloat(value).toFixed(2),
            },
            {
                Header: "Views",
                accessor: "viewers",
            },
            {
                Header: "Actions",
                accessor: "action",
                Cell: ({ value, cell }) =>
                    cell.row.original.status == 1 ?
                        <>
                            <button
                                onClick={handleAllow}
                                data-action="deactivate"
                                data-id={cell.row.original.id}
                                className="px-2 py-1 m-1 hover:bg-red-300 rounded-full bg-red-200"
                            >
                                Deactivate
                            </button>

                        </>
                        :
                        <>
                            <button
                                onClick={handleAllow}
                                data-action="activate"
                                data-id={cell.row.original.id}
                                className="px-2 py-1 m-1 hover:bg-green-300 rounded-full bg-green-200"
                            >
                                Activate
                            </button>

                        </>
            },
        ],
        []
    );

    // Store the confirmed user info
    const [confirmed, setConfirmed] = useState({
        user_id: "",
        user: [],
        payments: [],
    });

    // set table data and options
    const [tableData, setTableData] = useState({
        pageCount: 0,
        pageSize: 10,
        currentPage: 1,
        sortBy: "created_at",
    });

    let [tableRefreshed, setTableRefreshed] = useState(0); //update table on change
    let [searchQuery, setSearchQuery] = useState(""); //search query variable
    let [sortBy, setSortBy] = useState("id"); //table sort by column name
    let [asc, setAsc] = useState(true); //table sort using asc or desc
    let [pageStatus, setPageStatus] = useState(true);
    let [isLoading, setIsLoading] = useState(true);

    // Modal
    const [open, setOpen] = useState(false);

    const onOpenModal = () => {
        document.body.style.overflow = "hidden";
        setOpen(true)
    };
    const onCloseModal = () => {
        document.body.style.overflow = "auto";
        setRegInputs({
        
            video_id: "",
            title: "",
            
            error_list: [{ video_id: "" }],
        })
        setOpen(false);
    }

    const navigate = useNavigate();
    const [registerInputs, setRegInputs] = useState({
        
        video_id: "",
        title: "",
        
        error_list: [{ video_id: "Video ID not valid" }],
    });


    const handleRegInput = (e) => {
        e.persist();
        console.log(e.target.name)
        setRegInputs({ ...registerInputs, [e.target.name]: e.target.value });
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            video_id: registerInputs.video_id,
            title: registerInputs.title,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post(`api/video/create`, data).then((res) => {
                if (res.data.status === 200) {
                    // swal("Success", res.data.message, "success");
                    swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: "success",
                        toast: true,
                    })
                    onCloseModal()
                    setPageStatus((pageStatus) => !pageStatus);
                    // navigate("/signin");
                } else {
                    swal.fire({
                        title: "Failure",
                        text: res.data.message,
                        icon: "error",
                        toast: true,
                    })
                    setRegInputs({ ...registerInputs, error_list: res.data.errors });
                }
            });
        });
    };

    useEffect(() => {
        let val;
        let url;
        // if (localStorage.getItem("auth_token" == null)) {
        if (sessionStorage.getItem("auth_token" == null)) {
            setConfirmed(false);
            return false;
        }
        const fetchData = async () => {
            url =
                searchQuery.length === 0
                    ? `api/video/index?page=${tableRefreshed}`
                    : `api/video/search?page=${tableRefreshed}`;
            val = await axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .get(url, {
                        headers: { "X-XSRF-TOKEN": `${response.data}` },
                        params: {
                            per_page: tableData.pageSize,
                            sort_by: `videos.${sortBy}`,
                            asc: asc ? "asc" : "desc",
                            search_query: searchQuery,
                        },
                    })
                    .then((res) => {
                        if (res.data.status === 200) {
                            // setAsc(!asc)
                            console.log(res.data);
                            // res.data.payments.paid_at = res.data.payments.paid_at.split("T")[0].split("T")[0]

                            setConfirmed({ ...confirmed, payments: res.data.videos.data });
                            setTableData({
                                pageCount: res.data.videos.last_page,
                                pageSize: res.data.videos.per_page,
                                currentPage: res.data.videos.current_page,
                            });
                            console.log(tableData);
                            setIsLoading(false);
                        } else {
                            val = false;
                        }
                    });
            });
        };
        fetchData();
    }, [tableRefreshed, asc, tableData.pageSize, pageStatus, searchQuery]);

    const handleAllow = (e) => {
        let vidId = e.target.getAttribute("data-id");
        console.log(vidId);
        let url = "";
        url =
            e.target.getAttribute("data-action") == "activate"
                ? `api/video/activate/${vidId}`
                : `api/video/deactivate/${vidId}`;
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
                        });
                        console.log(res.data.message, pageStatus);

                        setPageStatus((pageStatus) => !pageStatus);
                    } else {
                        swal.fire({
                            title: "Failure",
                            text: res.data.message,
                            icon: "error",
                            toast: true,
                        });
                        // setPageStatus(!pageStatus)
                        // val = false;
                        // return false;
                    }
                });
        });
    };

    const handleSearch = (e) => {
        // e.persist();
        console.log(e.target);
        setSearchQuery(e.target.value);
    };

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
            <div className="w-full flex justify-end items-center space-x-2 p-3">
                <button onClick={onOpenModal} className="text-white gap-3 bg-mina-blue-light hover:bg-mina-blue-light/80 py-2   p-3 rounded-lg">
                    <FontAwesomeIcon icon={faVideo} /> &nbsp;

                    Add Video</button>
                <input
                    type="text"
                    onChange={(e) => {
                        optimizedSearch(e);
                    }}
                    // value={searchQuery}
                    name="searchQuery"
                    id="searchQuery"
                    placeholder="Search"
                    className="p-2 border-2 border-solid border-2-mina-blue-dark rounded-md self-end"
                />
            </div>
            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="blob"></div>
                </div>
            ) : (
                <Table
                    columns={columns}
                    data={confirmed.payments}
                    tableData={tableData}
                    setTableData={setTableData}
                    tableRefreshed={tableRefreshed}
                    setTableRefreshed={setTableRefreshed}
                    setSortBy={setSortBy}
                    asc={asc}
                    setAsc={setAsc}
                />
            )}
            <div id="modal" className={open ?"fixed top-0 left-0 w-screen h-screen bg-white grid grid-cols-12 items-start overflow-hidden p-3" : "hidden"} >
                <div className="col-span-12 flex justify-end">
                    <button onClick={onCloseModal} className="rounded-full px-2 py-1 shadow-lg text-mina-blue-light hover:bg-slate-50">
                        <FontAwesomeIcon icon={faTimesCircle} /> &nbsp;
                        Close</button>
                </div>
                <form className="col-span-12 grid-cols-12 grid gap-4" onSubmit={registerSubmit}>
                    {/* video add form */}
                    <div
                        id="personalInfo"
                        className="md:col-span-6 col-span-8 col-start-3 md:col-start-4 grid-cols-12 grid gap-4"
                    >
                        <div className="col-span-12 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="video_id">
                                Video ID
                            </label>
                            <input
                                type="text"
                                name="video_id"
                                id="video_id"
                                placeholder="Video ID"
                                className="p-3 bg-gray-200 rounded-lg"
                                onChange={handleRegInput}
                                value={registerInputs.video_id}
                                required
                            />
                            <span>{registerInputs.error_list.video_id}</span>
                        </div>
                        <div className="col-span-12 flex flex-col space-y-2 justify-start">
                            <label className="text-sm text-start" htmlFor="video_id">
                                Video Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="tilte"
                                placeholder="Video Title"
                                className="p-3 bg-gray-200 rounded-lg"
                                onChange={handleRegInput}
                                value={registerInputs.video_title}
                                required
                            />
                            <span>{registerInputs.error_list.video_title}</span>
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
            </div>
        </div>
    );
}

export default Videos;
