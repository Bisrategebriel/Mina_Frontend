import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function TransactionCard(props) {
	return (
		<div className="w-full p-3 items-center flex space-x-3 bg-slate-100 rounded-lg">
			<FontAwesomeIcon
				icon={faMoneyBill}
				className="bg-mina-blue-light/10 p-3 rounded-full"
			/>
			&nbsp;
			<div className="flex flex-col items-start">
				<p className="text-xl font-bold">100.00 ETB</p>
				<p className="text-sm">00/00/2000</p>
			</div>
		</div>
	);
}

export default TransactionCard;
