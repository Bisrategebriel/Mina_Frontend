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
import { unsetCookie } from "../utilities/cookies.util";
import Swal from "sweetalert2";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Navbar(props) {
	const languageContext = useContext(LanguageContext);
	const ln = languageContext[0];
	const scrollPosition = useScrollPosition();
	const navigate = useNavigate();
    let currentUser = useContext(UserContext)
    const onLogoutSuccess = (data) => {
		// console.log(data)
        if (data?.data.status === 200) {
            // localStorage.removeItem("auth_token");
            //sessionStorage.removeItem("auth_token");
            unsetCookie("auth_token");
            // localStorage.removeItem("auth_name");
            // useInvalidateQuery('currentUser')
    
            // navigate("/signin");
        } else {
            // Swal.fire({
			// 	text: 'Something went wrong. Refresh your browser and try Again',
			// 	icon: "error"
			// })
			// navigate("/signin")
        }
    };
	const onLogoutError = (data) => {
	}
    const { refetch } = useLogout(onLogoutSuccess, onLogoutError); 
    const logout = (e) => {
        e.preventDefault();
        refetch();
        navigate("/signin");
	};

	return (
		<nav
			className={classNames(
				scrollPosition > 100 ? "bg-mina" : "bg-transparent",
				"transition-all w-full h-24 p-3 md:px-24 px-6 flex justify-between items-center fixed z-50"
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
