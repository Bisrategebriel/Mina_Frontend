import React from "react";

function Spinner(props) {
	return (
		<div className="w-screen h-screen flex justify-center items-center absolute">
			<div className="blob"></div>
		</div>
	);
}

export default Spinner;
