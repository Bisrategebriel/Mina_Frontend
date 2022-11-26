import { Routes, Route } from "react-router-dom";
import "./App.css";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";

function App() {
	return (
		<div className="App relative font-comfortaa">
			<Routes>
	  		<Route exact path="/" element={<Home />}></Route>
				<Route exact path="/signup" element={<Signup />}></Route>
			  <Route exact path="/signin" element={<Signin />}></Route>
			</Routes>
       
		</div>
	);
}

export default App;
