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
import { getCookie, unsetCookie } from "./utilities/cookies.util";
import ThankYou from "./pages/ThankYou";
import Swal from "sweetalert2";

axios.defaults.baseURL = "https://api.minaplay.com";
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    // const token = localStorage.getItem("auth_token");
    // const token = sessionStorage.getItem("auth_token");
    const token = getCookie("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});
axios.defaults.validateStatus = () => true;

// Add a 401 response interceptor
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        console.log("err")
    } else {
        return Promise.reject(error);
    }
});

// axios.interceptors.response.use(
//     (response) => {
//       // Return the response if successful
//       return response;
//     },
//     (error) => {
//       // Handle errors here
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log('Error', error.message);
//       }

//       // Return a rejected promise with the error object
//       return Promise.reject(error);
//     }
//   );

axios.get('/sanctum/csrf-cookie').then(response => {
    localStorage.auth_token = response.config.headers["X-XSRF-TOKEN"]
    // console.log(response.config.headers["X-XSRF-TOKEN"])
})  



function App() {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState();

    const onSuccess = (data) => {
        // console.log(data)
        if (data?.data.status === 500) {
            // localStorage.removeItem("auth_token");
            //sessionStorage.removeItem("auth_token");
            unsetCookie("auth_token");
            setCurrentUser(null)
        } else if (data?.data.status === 200) {
            // setIsVerified(data?.data.user.email_verified_at ? true : false);
            setCurrentUser(data?.data)
        } else {
            // console.log(data?.status)
            // Swal.fire({
			// 	text: 'Something went wrong. Refresh your browser and try Again',
			// 	icon: "error"
			// })
        }
    }
    const onError = (error) => {
        // console.log(error)
        // if (error.response.status === 500) {
        //     console.log(error)
        // }
        
        setCurrentUser(null)

    }
    const { isFetching, isLoading, isFetched, data, isError, error } = useUsers(onSuccess, onError);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="App relative font-comfortaa ">
            <UserContext.Provider value={currentUser}>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/dashboard" element={currentUser ? (<ProtectedWrapper />) : (<Signin />)}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    {/* <Route path="/payment" element={ currentUser?.user.status ? <Payment /> : <Signin />}></Route> */}
                    <Route
                        path="/watch/:id"
                        element={currentUser?.user.status ? <VideoPlayer /> : (<Navigate to="/dashboard" replace state={{ location }} />)}
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
                            currentUser?.user.role === "admin" ? (<AdminHome />) :
                                (<Navigate to="/" replace state={{ location }} />)
                        }
                    >
                    </Route>

                    <Route path="/forgotPassword" element={<ResetPassword />} />
                    <Route path="/thankyou" element={<ThankYou />} />
                    <Route path="/resetPassword/:token" element={<ResetSuccessfull />} />
                    <Route path="/verify/:url" element={
                        currentUser?.user.email_verified_at == null ? <VerifyEmail />
                            :
                            (<Navigate to="/" replace state={{ location }} />)
                    } />

                    {/* <Route path="/verifyRf" element={<VerifyRf />} /> */}
                </Routes>
            </UserContext.Provider>
            <NoticePopup />
        </div>
    );
}

export default App;
