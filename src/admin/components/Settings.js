import React, { useCallback, useEffect, useMemo, useState } from "react";

import Table from "./table/Table";
import axios from "axios";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClose, faMinusCircle, faTimesCircle, faUserPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Settings(props) {
    let [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setIsLoading(false)
    },[])
    return (
        <div className="h-full w-full flex flex-col gap-2 max-w-screen overflow-x-auto">
            
            {isLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="blob"></div>
                </div>
            ) : (
                <div className="w-full h-full grid grid-cols-12 grid-flow-row auto-rows-max">
                    <div className="col-span-12 flex justify-center h-fit">
                        <p className="text-3xl">Settings</p> 
                    </div>
                    <div className="col-span-8 text-start bg-blue-50 h-fit">
                        <input type="text" name="" id="" placeholder="hidden" className="p-2 border-2 border-solid border-2-mina-blue-dark rounded-md self-end" />
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default Settings;
