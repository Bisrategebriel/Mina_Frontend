import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Confirm from '../pages/Confirm';
import Home from '../pages/Home';
import Signin from '../pages/Signin';

import "../App.css";

function ProtectedWrapper(props) {
    const [confirmed, setConfirmed] = useState();
    useEffect(()=>{
        let val;
        const fetchData = async ()=>{
            val = await 
                axios.get(`api/auth/currentUser`).then( res=>{
                    console.log(res.data.user);
                    console.log(localStorage.getItem("auth_token"))
                    if(res.data.status === 200){
                        val = res.data.user.status ? true : false;
                        // return res.data.user.status ? true : false;

                    } else {
                        val = false;
                        // return false;
                    }
                    // console.log(val)
                    setConfirmed(val);
                });
        }
        fetchData()

    },[])
    console.log(confirmed)
    return (
        <>
            {
            (confirmed == undefined) ? 
            <>
                <div className="w-screen h-screen flex justify-center items-center">
                    <div class="blob"></div>
                </div>
            
            </>
            
            : //loading screen
            (localStorage.getItem("auth_token") !=null & confirmed) ? <Home/> : //if the user is authorized and confirmed
            (localStorage.getItem("auth_token") !=null & !confirmed) ? <Confirm/> : //if the user is authorized and not confirmed
            <Signin/> //if the user is not authorized
        }
        </>
    )
}

export default ProtectedWrapper;