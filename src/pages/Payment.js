import axios from "axios";
import React from "react";

function Payment(props) {
	var myHeaders = new Headers();
	myHeaders.append("Authorization", "Bearer CHASECK_TEST-CJpNB99EZnTcfzzxJm4o2g5oPhcIFpxW");
	// myHeaders.append("Access-Control-Allow-Origin", "*");
	myHeaders.append("Content-Type", "application/json");

	var raw = JSON.stringify({
		amount: "100",
		currency: "ETB",
		email: "yeabsiragetahungy@gmail.com",
		first_name: "Bilen",
		last_name: "Gizachew",
		phone_number: "0912345678",
		tx_ref: "chewatatest-6669",
		callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
		return_url: axios.defaults.baseURL,
		"customization[title]": "Payment for my favourite merchant",
		"customization[description]": "I love online payments",
	});
console.log(myHeaders)
	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	fetch("https://api.chapa.co/v1/transaction/initialize", requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));

        axios.post(
            "https://api.chapa.co/v1/transaction/initialize",
            raw,
            {
                headers: {
                    "Authorization" :"Bearer CHAPUBK_TEST-6agmflS6cKhYilGvzNksbMsR9LdrUZsc",
                    "Access-Control-Allow-Credentials" : true,
                    "Content-Type" : "application/json"
                }
            }
        ).then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
	return <div></div>;
}

export default Payment;
