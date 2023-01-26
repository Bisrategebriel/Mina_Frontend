import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Confirm from '../pages/Confirm';
import Home from '../pages/Home';
import Signin from '../pages/Signin';

import "../App.css";
import UserDashboard from '../pages/UserDashboard';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '..';
import { useUsers } from '../utilities/utility';

function ProtectedWrapper(props) {
    // const [confirmed, setConfirmed] = useState();
    // const [isVerified, setIsVerified] = useState(false);
    
    // useUsers();//Update User
    let currentUser = useContext(UserContext)
    // console.log((!! currentUser?.user.email_verified_at) & (!currentUser?.user.status))
    // useEffect(()=>{
    //     let val;
    //     if(localStorage.getItem("auth_token" == null)){
    //         setConfirmed(false);
    //         return false;
    //     }
    //     const fetchData = async ()=>{
    //         val = await 
    //         axios.get('/sanctum/csrf-cookie').then(response => {
    //             // console.log(response.config.headers.X-XSRF-TOKEN")
    //             axios.get(`api/auth/currentUser`, {headers: {"X-XSRF-TOKEN": `${response.data}`}}).then( res=>{
    //                 // console.log(res.data.user);
    //                 // console.log(localStorage.getItem("auth_token"))
    //                 if(res.data.user == null){
    //                     setConfirmed(false);
    //                     return
    //                 }
    //                 if(res.data.status === 200){
    //                     val = res.data.user.status ? true : false;
    //                     setIsVerified(res.data.user.email_verified_at ? true : false);
    //                     // return res.data.user.status ? true : false;

    //                 } else {
    //                     val = false;
    //                     // return false;
    //                 }
    //                 // console.log(val)
    //                 setConfirmed(val);
    //             }).catch(error => {
    //                 // console.log(error.response.data.error)
    //                 setConfirmed(false);
    //              });
    //         });
    //     }
    //     fetchData()

    // },[])
    // console.log(confirmed)
    const location = useLocation();
    return (
        <>
            {
            (currentUser?.user.status == undefined) ? //loading screen
            <>
                <div className="w-screen h-screen flex justify-center items-center">
                    <div className="blob"></div>
                </div>
            
            </>
            
            : 
            (currentUser?.user.status) ? <UserDashboard isVerified={!!currentUser?.user.email_verified_at}/> : //if the user is authorized and confirmed
            ((!!currentUser?.user.email_verified_at) & (!currentUser?.user.status)) ? <Confirm/> : //if the user is authorized and not confirmed
            ((!currentUser?.user.email_verified_at) & (!currentUser?.user.status)) ? <UserDashboard isVerified={currentUser?.user.email_verified_at}/> : //if the user is authorized and not verified, confirmed
            <Navigate to="/signin" replace state={{location}} /> //if the user is not authorized
        }
        </>
    )
}

export default ProtectedWrapper;