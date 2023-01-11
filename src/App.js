import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Confirm from "./pages/Confirm";
import Home from "./pages/Home";
import AdminHome from "./admin/Home";
import axios from "axios";
import ProtectedWrapper from "./components/ProtectedWrapper";
import { useContext, useEffect, useState } from "react";
import Watch from "./pages/Watch";
import VideoPlayer from "./components/dashboard/VideoPlayer";
import Profile from "./pages/Profile";
import swal from "sweetalert2";
import { LanguageContext } from ".";

// axios.defaults.baseURL = "https://api.minaplay.com";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

// axios.get('/sanctum/csrf-cookie').then(response => {
//     localStorage.auth_token = response.config.headers["X-XSRF-TOKEN"]
//     // console.log(response.config.headers["X-XSRF-TOKEN"])
// })


function App() {
    const location = useLocation();
    const [signedIn, setSignedIn] = useState();
    //get signed in user
    useEffect(()=>{
        let val;
        if(localStorage.getItem("auth_token" == null)){
            setSignedIn(false);
            return false;
        }
        const fetchData = async ()=>{
            val = await 
            axios.get('/sanctum/csrf-cookie').then(response => {
                // console.log(response.config.headers.X-XSRF-TOKEN")   
                axios.get(`api/auth/currentUser`, {headers: {"X-XSRF-TOKEN": `${response.data}`}}).then( res=>{
                    console.log(res.data.status);
                    console.log(localStorage.getItem("auth_token"))
                    if(res.data.status === 500){
                        setSignedIn(false);
                        localStorage.removeItem("auth_token")
                        return
                    }
                    else if(res.data.status === 200){
                        val = res.data.user.status ? true : false;
                        // return res.data.user.status ? true : false;

                    } else {
                        val = false;
                        // return false;
                    }
                    // console.log(val)
                    setSignedIn(val);
                }).catch(error => {
                    console.log(error.response)
                    if(error.response.status === 401){
                        localStorage.clear();
                    }
                    setSignedIn(false);
                 });
            });
        }
        fetchData()

    },[])

	return (
		<div className="App relative font-comfortaa ">
			<Routes>
	  		    <Route path="/" element={<Home/>}></Route>  
	  		    <Route path="/dashboard" element={<ProtectedWrapper/>}></Route>
	  		    <Route path="/profile" element={<Profile/>}></Route>  
	  		    <Route path="/watch/:id" element={<VideoPlayer/>}  replace key="1" state={{location}}></Route>  
                
			    <Route path="/signin" element={localStorage.getItem("auth_token") ? <Navigate to="/" replace state={{location}} />:<Signin />}>
                </Route>
				<Route path="/signup" element={localStorage.getItem("auth_token") ? <Navigate to="/" replace state={{location}} />: <Signup />}>
                </Route>
        
				<Route path="/admin" element={<AdminHome/>}>
	  		    {/* <Route path="/*" element={<Home/>}></Route>   */}
                </Route>
			</Routes>
       
		</div>
	);
}

export default App;
