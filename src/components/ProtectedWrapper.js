import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Confirm from '../pages/Confirm';
import Home from '../pages/Home';
import Signin from '../pages/Signin';

import "../App.css";
import UserDashboard from '../pages/UserDashboard';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedWrapper(props) {
    const [confirmed, setConfirmed] = useState();
    useEffect(()=>{
        let val;
        if(localStorage.getItem("auth_token" == null)){
            setConfirmed(false);
            return false;
        }
        const fetchData = async ()=>{
            val = await 
            axios.get('/sanctum/csrf-cookie').then(response => {
                // console.log(response.config.headers.X-XSRF-TOKEN")
                axios.get(`api/auth/currentUser`, {headers: {"X-XSRF-TOKEN": `${response.data}`}}).then( res=>{
                    console.log(res.data.user);
                    console.log(localStorage.getItem("auth_token"))
                    if(res.data.user == null){
                        setConfirmed(false);
                        return
                    }
                    if(res.data.status === 200){
                        val = res.data.user.status ? true : false;
                        // return res.data.user.status ? true : false;

                    } else {
                        val = false;
                        // return false;
                    }
                    // console.log(val)
                    setConfirmed(val);
                }).catch(error => {
                    // console.log(error.response.data.error)
                    setConfirmed(false);
                 });
            });
        }
        fetchData()

    },[])
    // console.log(confirmed)
    const location = useLocation();
    return (
        <>
            {
            (confirmed == undefined) ? 
            <>
                <div className="w-screen h-screen flex justify-center items-center">
                    <div className="blob"></div>
                </div>
            
            </>
            
            : //loading screen
            (localStorage.getItem("auth_token") !=null & confirmed) ? <UserDashboard/> : //if the user is authorized and confirmed
            (localStorage.getItem("auth_token") !=null & !confirmed) ? <Confirm/> : //if the user is authorized and not confirmed
            <Navigate to="/signin" replace state={{location}} /> //if the user is not authorized
        }
        </>
    )
}

export default ProtectedWrapper;