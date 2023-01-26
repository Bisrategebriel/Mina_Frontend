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
import { useUsers } from "./utilities/utility";

// axios.defaults.baseURL = "https://api.minaplay.com";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("auth_token");
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
    // useEffect(()=>{

    // }, [currentUser])
    const onSuccess = (data) => {
        // console
        // console.log('object');

        if (data?.data.status === 500) {
            localStorage.removeItem("auth_token");
            setCurrentUser(null) 
        } else if (data?.data.status === 200) {
            // setIsVerified(data?.data.user.email_verified_at ? true : false);
            setCurrentUser(data?.data)
        }
    }
    const onError = (error) => {
        // console.log(error.message)
        setCurrentUser(null)
    } 


    const { isFetching, isLoading, isFetched, data, isError, error  } = useUsers(onSuccess, onError);
    // useUsers()
    // console.log(data?.data)

    // Set User context

    return (
        <div className="App relative font-comfortaa ">
            <UserContext.Provider value={
                currentUser
                // userCont
                // {
                //     user: {created_at: "2022-12-22T13:26:28.000000Z",
                //             deleted: 0,
                //             email: "yeabsiragetahungy@gmail.com",
                //             email_verified_at: "2023-01-19T17:11:12.000000Z",
                //             first_name: "Yeabsiraaa",
                //             id: 2,
                //             last_name: "Getahun",
                //             phone_number: "0946723520",
                //             points: 27.28,
                //             status: 1,
                //             updated_at: "2023-01-19T17:11:12.000000Z"
                //         }
                // }
                }
                >
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/dashboard" element={<ProtectedWrapper />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route
                        path="/watch/:id"
                        element={<VideoPlayer />}
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

                    <Route path="/admin" element={<AdminHome />}>
                        {/* <Route path="/*" element={<Home/>}></Route>   */}
                    </Route>
                </Routes>
            </UserContext.Provider>

        </div>
    );
}

export default App;
