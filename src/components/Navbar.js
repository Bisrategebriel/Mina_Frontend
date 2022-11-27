import { Link, useNavigate } from "react-router-dom";
import React from "react";
import logo from "../images/logo.png";
import useScrollPosition from "../hooks/useScrollPosition";
import "../App.css";
import axios from "axios";
import swal from "sweetalert";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar(props) {
  const scrollPosition = useScrollPosition();
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();

    axios.post(`api/auth/logout`).then(res=>{
        if(res.data.status === 200){
            console.log(res.data);
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_name");

            // swal("Success", res.data.message, "success");
            navigate("/signin");
        }
        else {
            console.log(res.data)
        }
    });
  }
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
        {
            localStorage.getItem("auth_token") ? 
                <>
                    <button onClick={logout} className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
                        Logout
                    </button>
                    {/* {localStorage.getItem("auth_name")} */}
                </>
            : 
                <>
                    <Link to="/signin" replace>
                        <button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
                            Login
                        </button>
                    </Link>
                    <Link to="/signup" replace>
                        <button className="p-2 px-4 bg-white rounded-lg hover:bg-mina-orange-light hover:text-white text-mina-blue-dark font-bold">
                            Register
                        </button>
                    </Link>
                </>
        }
        
      </div>
    </nav>
  );
}

export default Navbar;
