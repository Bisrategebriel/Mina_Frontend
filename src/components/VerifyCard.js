import axios from "axios";
import React from "react";
import swal from "sweetalert2";

const submitResendVerification = (e) => {
    axios.get(`api/auth/sendVerification`).then(res => {
        if (res.data.status === 200) {
            swal.fire('Success', res.data.message, "success")
            // swal("Success", res.data.message, "success");
        }
        else {
            console.log(res.data.message)
            console.log("Couldn't send Verification")
        }
    });
}

function VerifyCard(props) {
	return (
		<div className="col-span-12 justify-center flex items-center height-full">
			<div className="w-3/4 lg:w-1/2 p-4 rounded-lg shadow-lg">
				<p>
					You registered an account on https://minaplay.com, before being able to use
					your account you need to verify that this is your email address by clicking
					verify.
				</p>
				<button
					onClick={submitResendVerification}
					type="button"
					className="w-fit inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md 
                                    hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
                                    active:shadow-lg transition duration-150 ease-in-out"
				>
					Resend Verification
				</button>
			</div>
		</div>
	);
}

export default VerifyCard;
