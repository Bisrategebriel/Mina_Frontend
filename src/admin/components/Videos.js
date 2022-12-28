import React, { useCallback, useEffect, useMemo, useState } from "react";

import Table from "./table/Table";
import axios from "axios";
import swal from "sweetalert2";


function Videos(props) {
    let columns = 
    useMemo(
        () => 
        [
            {
                Header: 'Video ID',
                accessor: 'video_id',
            },
            {
                Header: 'Status',
                accessor: 'status',
            },
            {
                Header: 'Points',
                accessor: 'points',
                Cell: ({value}) => value && parseFloat(value).toFixed(2)
            },
            {
                Header: 'Views',
                accessor: 'viewers',
            },
            {
                Header: 'Actions',
                accessor: 'action',
                Cell: ({ cell }) => (
                    <div className="">
                        {/* {console.log(cell.row.original.user_id)} */}
                        <button onClick={handleAllow} data-action="activate" data-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-green-300 rounded-full bg-green-200">Active</button>
                        <button onClick={handleAllow} data-action="deactivate" data-id={cell.row.original.id} className="px-2 py-1 m-1 hover:bg-red-300 rounded-full bg-red-200">Inactive</button>
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
    let [searchQuery, setSearchQuery] = useState('')
    let [sortBy, setSortBy] = useState('id')
    let [asc, setAsc] = useState(true)
    let [pageStatus, setPageStatus] = useState(true)
    let [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        let val;
        let url;
        if (localStorage.getItem("auth_token" == null)) {
            setConfirmed(false);
            return false;
        }
        const fetchData = async () => {
            url = searchQuery.length === 0 ?  `api/video/index?page=${tableRefreshed}` : `api/video/search?page=${tableRefreshed}` 
            val = await axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .get(url, {
                        headers: { "X-XSRF-TOKEN": `${response.data}` },
                        params: {
                            per_page: tableData.pageSize,
                            sort_by: `videos.${sortBy}`,
                            asc: asc?'asc':'desc',
                            search_query: searchQuery
                        }
                    })
                    .then((res) => {
                        if (res.data.status === 200) {
                            // setAsc(!asc)
                            console.log(res.data)
                            // res.data.payments.paid_at = res.data.payments.paid_at.split("T")[0].split("T")[0]
                            setConfirmed({ ...confirmed, payments: res.data.videos.data });
                            setTableData({
                                pageCount: res.data.videos.last_page,
                                pageSize: res.data.videos.per_page,
                                currentPage: res.data.videos.current_page,
                            })
                            console.log(tableData)
                            setIsLoading(false)
                        } else {
                            val = false;
                        }
                    });
            });
        };
        fetchData();
    }, [tableRefreshed,asc,tableData.pageSize,pageStatus,searchQuery]);


    const handleAllow = (e) => {
        let vidId = e.target.getAttribute("data-id");
        console.log(vidId)
        let url = ""
        url = e.target.getAttribute("data-action") == "activate" ? `api/video/activate/${vidId}` : `api/video/deactivate/${vidId}`
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
                        console.log(res.data.message, pageStatus)

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

    const handleSearch = (e) => {
        // e.persist();
        console.log(e.target)    
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
        <div className="h-full w-full flex flex-col gap-2">
            <input type="text" 
                onChange={(e)=>{
                    optimizedSearch(e)
                }}
                // value={searchQuery}
                name="searchQuery"
                id="searchQuery"
                placeholder="Search"
                className="p-2 border-2 border-solid border-2-mina-blue-dark rounded-md self-end"
            />
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

export default Videos;