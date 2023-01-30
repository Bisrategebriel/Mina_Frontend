import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import logo from "../images/logo.png";
import useScrollPosition from "../hooks/useScrollPosition";
import "../App.css";
import axios from "axios";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { LanguageContext } from "..";
import LanguageSelector from "./LanguageSelector";
import { useInvalidateQuery, useLogout,  } from "../hooks/utilityHooks";
import { useQueryClient } from "react-query";
import { UserContext } from "../";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Navbar(props) {
	const languageContext = useContext(LanguageContext);
	const ln = languageContext[0];
	const scrollPosition = useScrollPosition();
	const navigate = useNavigate();
	// const logout = (e) => {
        // 	e.preventDefault();
        // 	axios.post(`api/auth/logout`).then((res) => {
	// 		if (res.data.status === 200) {
	// 			localStorage.removeItem("auth_token");
	// 			localStorage.removeItem("auth_name");
    //             // useInvalidateQuery('currentUser')
	// 			navigate("/signin");
	// 		} else {
        // 			console.log(res.data);
        // 		}
        // 	});
        // };
        // const [currentUser, setCurrentUser] = useState();
        // let userContext = useContext(UserContext)
        let currentUser = useContext(UserContext)
        // useEffect(()=>{
        //     setCurrentUser(userContext)
            // console.log(currentUser)
        // })
        // console.log(useContext(UserContext))

    // const onSuccess = (data) => {
    //     console.log(`jji`)
    //     // console
    //     if (data?.data.status === 500) {
    //         localStorage.removeItem("auth_token");
    //         setCurrentUser(null) 
    //     } else if (data?.data.status === 200) {
    //         // setIsVerified(data?.data.user.email_verified_at ? true : false);
    //         setCurrentUser(data?.data)
    //     }
    // }
    // const onError = (error) => {
    //     // console.log(error.message)
    //     setCurrentUser(null)
    // }
    // const { isFetching, isLoading, isFetched, data, isError, error  } = useUsers(onSuccess, onError);

    // const queryClient = useQueryClient();
    // const onSuccess = (data) => {
    //     if (data?.data.status === 200) {
    //         localStorage.removeItem("auth_token");
    //         localStorage.removeItem("auth_name");
    //         // useInvalidateQuery('currentUser')

    //         queryClient.removeQueries('currentUser')
    //     } else {
    //         console.log(data?.data);
    //     }
    // }
    const onLogoutSuccess = (data) => {
        if (data?.data.status === 200) {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_name");
            // useInvalidateQuery('currentUser')
    
            // navigate("/signin");
        } else {
            console.log(data?.data);
        }
    };
    const { refetch } = useLogout(onLogoutSuccess); 
    const logout = (e) => {
        e.preventDefault();
        refetch()	
        navigate("/signin");
	};

	return (
		<nav
			className={classNames(
				scrollPosition > 100 ? "bg-mina" : "bg-transparent",
				"transition-all w-screen h-24 p-3 md:px-24 px-6 flex justify-between items-center fixed z-50"
			)}
		>
			<Link to="/">
				<img src={logo} alt="mina logo" className="h-16 object-cover" />
			</Link>

			<div className=" font-comfortaa space-x-3">
				{currentUser ? (
					<>
						<Link to="/dashboard" replace>
							<button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
								<FontAwesomeIcon icon={faDashboard} />
								<p className="md:inline-block hidden">&nbsp; {ln.dashboard}</p>
							</button>
						</Link>
						<button
							onClick={logout}
							className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg"
						>
							<FontAwesomeIcon icon={faSignOut} />
							<p className="md:inline-block hidden">&nbsp; {ln.logout} </p>
						</button>
                        <LanguageSelector/>
					</>
				) : (
					<>
						<Link to="/signin" replace>
							<button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
								{ln.login}
							</button>
						</Link>
						<Link to="/signup" replace>
							<button className="p-2 px-4 bg-white rounded-lg hover:bg-mina-orange-light hover:text-white text-mina-blue-dark font-bold">
								{ln.register}
							</button>
						</Link>
						<LanguageSelector/>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
