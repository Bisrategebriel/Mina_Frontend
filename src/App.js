import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Confirm from "./pages/Confirm";
import Home from "./pages/Home";
import AdminHome from "./admin/Home";
import axios from "axios";
import ProtectedWrapper from "./components/ProtectedWrapper";
import { useEffect, useState } from "react";
import Watch from "./pages/Watch";
import VideoPlayer from "./components/dashboard/VideoPlayer";

axios.defaults.baseURL = "https://api.minaplay.com";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config){
    const token = localStorage.getItem("auth_token");
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

function App() {
    const location = useLocation();
	return (
		<div className="App relative font-comfortaa ">
			<Routes>
	  		    <Route path="/" element={<Home/>}></Route>  
	  		    <Route path="/dashboard" element={<ProtectedWrapper/>}></Route>  
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
