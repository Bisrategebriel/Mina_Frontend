import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import logo from "../images/logo.png";
import useScrollPosition from "../hooks/useScrollPosition";
import "../App.css";
import axios from "axios";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { LanguageContext } from "..";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Navbar(props) {
	const languageContext = useContext(LanguageContext);
	const ln = languageContext[0];
	const scrollPosition = useScrollPosition();
	const navigate = useNavigate();
	const logout = (e) => {
		e.preventDefault();

		axios.post(`api/auth/logout`).then((res) => {
			if (res.data.status === 200) {
				console.log(res.data);
				localStorage.removeItem("auth_token");
				localStorage.removeItem("auth_name");

				// swal("Success", res.data.message, "success");
				navigate("/signin");
			} else {
				console.log(res.data);
			}
		});
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
				{localStorage.getItem("auth_token") ? (
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
						<select
							className="bg-transparent p-1 border-1 border-mina-orange-light text-mina-orange-light"
							value={localStorage.getItem("lang")}
							onChange={(val) => {
								languageContext[1](val.target.value);
								localStorage.setItem("lang", val.target.value);
							}}
						>
							<option value="en">En</option>
							<option value="am">አማ</option>
						</select>
						{/* {localStorage.getItem("auth_name")} */}
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
						{/* <button onClick={languageContext[1]("am")}> lang </button> */}
						<select
							className="bg-transparent p-1 border-1 border-mina-orange-light text-mina-orange-light"
							onChange={(val) => {
								languageContext[1](val.target.value);
								localStorage.setItem("lang", val.target.value);
							}}
						>
							<option value="en">En</option>
							<option value="am">አማ</option>
						</select>
					</>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
