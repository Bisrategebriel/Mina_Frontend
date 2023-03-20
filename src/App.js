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
import Terms from "./pages/Terms";

axios.defaults.baseURL = "https://api.minaplay.com";
// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = getCookie("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});
// axios.defaults.validateStatus = () => true;

// // Add a 401 response interceptor
// axios.interceptors.response.use(function (response) {
//     return response;
// }, function (error) {
//     if (401 === error?.response?.status) {
//         console.log("err")
//     } else {
//         // return Promise.reject(error);
//     }
// });


axios.get('/sanctum/csrf-cookie').then(response => {
    localStorage.auth_token = response.config.headers["X-XSRF-TOKEN"]
})  



function App() {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState();

    const onSuccess = (data) => {
        if (data?.data.status === 500) {
            unsetCookie("auth_token");
            setCurrentUser(null)
        } else if (data?.data.status === 200) {
            setCurrentUser(data?.data)
        } else {
        }
    }
    const onError = (error) => {
        // console.log("User not signed in.")
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
                    <Route path="/terms" element={
                        <Terms />
                    } />

                    {/* <Route path="/verifyRf" element={<VerifyRf />} /> */}
                </Routes>
            </UserContext.Provider>
            <NoticePopup />
        </div>
    );
}

export default App;
