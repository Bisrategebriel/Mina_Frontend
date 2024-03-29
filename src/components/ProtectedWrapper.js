import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Confirm from '../pages/Confirm';
import Home from '../pages/Home';
import Signin from '../pages/Signin';

import "../App.css";
import UserDashboard from '../pages/UserDashboard';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '..';
import { useUsers } from '../hooks/utilityHooks';

function ProtectedWrapper(props) {
    let currentUser = useContext(UserContext)
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