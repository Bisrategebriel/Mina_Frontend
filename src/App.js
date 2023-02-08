import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "./App.css";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import AdminHome from "./admin/Home";
import axios from "axios";
import ProtectedWrapper from "./components/ProtectedWrapper";
import { createContext, useContext, useEffect, useState } from "react";
import VideoPlayer from "./components/dashboard/VideoPlayer";
import Profile from "./pages/Profile";
import { LanguageContext, UserContext } from ".";
import { ReactQueryDevtools } from "react-query/devtools";
import Spinner from "./components/Spinner";
import { useUsers } from "./hooks/utilityHooks";
import ResetPassword from "./pages/ResetPassword";
import ResetSuccessfull from "./pages/ResetSuccessfull";
import VerifyEmail from "./pages/VerifyEmail";
import NoticePopup from "./components/NoticePopup";
import Payment from "./pages/Payment";

// axios.defaults.baseURL = "https://api.minaplay.com";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {  
    // const token = localStorage.getItem("auth_token");
    const token = sessionStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

// axios.get('/sanctum/csrf-cookie').then(response => {
//     localStorage.auth_token = response.config.headers["X-XSRF-TOKEN"]
//     // console.log(response.config.headers["X-XSRF-TOKEN"])
// })



function App() {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState();

    const onSuccess = (data) => {

        if (data?.data.status === 500) {
            // localStorage.removeItem("auth_token");
            sessionStorage.removeItem("auth_token");
            setCurrentUser(null)
        } else if (data?.data.status === 200) {
            // setIsVerified(data?.data.user.email_verified_at ? true : false);
            setCurrentUser(data?.data)
        }
    }
    const onError = (error) => {
        setCurrentUser(null)
    }


    const { isFetching, isLoading, isFetched, data, isError, error } = useUsers(onSuccess, onError);

    if(isLoading){
        return <Spinner />
    }

    return (
        <div className="App relative font-comfortaa ">
            <UserContext.Provider value={currentUser}>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/dashboard" element={<ProtectedWrapper />}></Route>
                    <Route path="/profile" element={ currentUser?.user.status ? <Profile /> : <Signin />}></Route>
                    <Route path="/payment" element={ currentUser?.user.status ? <Payment /> : <Signin />}></Route>
                    <Route
                        path="/watch/:id"
                        element={currentUser?.user.status ? <VideoPlayer /> : <Signin />}
                        replace
                        key="1"
                        state={{ location }}
                    ></Route>

                    <Route
                        path="/signin"
                        element={
                            isLoading ? <Spinner /> :
                                currentUser ? (
                                    <Navigate to="/" replace state={{ location }} />
                                ) : (
                                    <Signin />
                                )
                        }
                    ></Route>
                    <Route
                        path="/signup"
                        element={
                            isLoading ? <Spinner /> :
                                currentUser ? (
                                    <Navigate to="/" replace state={{ location }} />
                                ) : (
                                    <Signup />
                                )
                        }
                    ></Route>

                    <Route 
                        path="/admin"
                        element={
                                currentUser?.user.role === "admin" ? (<AdminHome/>) : 
                                (<Navigate to="/" replace state={{ location }} />)
                        }
                        >
                    </Route>

                    <Route path="/forgotPassword" element={<ResetPassword />} />
                    <Route path="/resetPassword/:token" element={<ResetSuccessfull />} />
                    <Route path="/verify/:url" element={
                        currentUser?.user.email_verified_at == null ? <VerifyEmail/>
                        :
                        (<Navigate to="/" replace state={{ location }}/>)
                    } />
                </Routes>
            </UserContext.Provider>
            {/* <NoticePopup/> */}
        </div>
    );
}

export default App;
