import React, { useEffect } from 'react';
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import $ from "jquery";

function Table(props) {
    const srcSet = props.srcSet;
    // const index = props.index;

    useEffect(() => {
        // if (!$.fn.DataTable.isDataTable("#myTable")) {
            // $(document).ready(function () {
                // setTimeout(function () {
                    const table = $("#table").DataTable({
                        serverSide: true,
                        ajax: {
                            url: 'https://api.minaplay.com/api/payment/get',
                            type: 'GET',
                            headers: {
                                // 'Authorization' : 'Bearer '+localStorage.getItem("auth_token"),
                                'Authorization' : 'Bearer '+sessionStorage.getItem("auth_token"),
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }
                        },
                        pagingType: "full_numbers",
                        pageLength: 20,
                        processing: true,
                        destroy: true,
                        dom: "Bfrtip",
                        select: {
                            style: "single",
                        },
                        "columns": [
                            { "data": "postId" },
                            { "data": "id" },
                            { "data": "name" },
                            { "data": "email" },
                            { "data": "body" }
                            ],
                        buttons: [
                            {
                                extend: "pageLength",
                                className: "btn btn-secondary bg-secondary",
                            },
                            {
                                extend: "copy",
                                className: "btn btn-secondary bg-secondary",
                            },
                            {
                                extend: "csv",
                                className: "btn btn-secondary bg-secondary",
                            },
                            {
                                extend: "print",
                                customize: function (win) {
                                    $(win.document.body).css("font-size", "10pt");
                                    $(win.document.body)
                                        .find("table")
                                        .addClass("compact")
                                        .css("font-size", "inherit");
                                },
                                className: "btn btn-secondary bg-secondary",
                            },
                        ],

                        fnRowCallback: function (
                            nRow,
                            aData,
                            iDisplayIndex,
                            iDisplayIndexFull
                        ) {
                            var index = iDisplayIndexFull + 1;
                            $("td:first", nRow).html(index);
                            return nRow;
                        },

                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                render: function (data, type, row, meta) {
                                    return type === "export" ? meta.row + 1 : data;
                                },
                            },
                        ],
                    });
                // }, 1000);
            // });
        // }

        return function() {
            table.destroy();
        }
    })


    return (
        <table id="table" className="table align-items-center justify-content-center mb-0">
                <thead>
                    <tr>
                        <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">S/N</th>
                        <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Title</th>
                        <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Name</th>
                        <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Age</th>
                        <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Hobby</th>
                        <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Occupation</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        srcSet.map((item,index)=>(
                            // <Table names={name} index={index} />
                            <tr>
                                <td className="text-xs font-weight-bold">{item.id}</td>
                                <td className="text-xs font-weight-bold">{item.user_id}</td>
                                <td className="text-xs font-weight-bold">{item.paid_by}</td>
                                <td className="text-xs font-weight-bold">{item.paid_at}</td>
                                <td className="text-xs font-weight-bold">{item.transaction_number}</td>
                                <td className="text-xs font-weight-bold">{item.occupation}</td>
                                <td></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    );
}

export default Table;