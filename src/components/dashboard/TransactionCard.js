import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { LanguageContext } from "../..";

function TransactionCard({amount, paid_at, approved}) {
    const languageContext = useContext(LanguageContext);
    const ln = languageContext[0]
	return (
		<div className="w-full p-3 items-center justify-between flex space-x-3 bg-slate-100 rounded-lg">
            <div className="flex">
                <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="bg-mina-blue-light/10 p-3 rounded-full"
                />
                &nbsp;
                <div className="flex flex-col items-start">
                    <p className="text-xl font-bold">{amount} {ln.etb}</p>
                    <p className="text-sm">{paid_at}</p>
                </div>
            </div>

            {
                approved == null ?  <div className="py-1 px-3 bg-yellow-100 rounded-full text-sm italic">{ln.pending}</div>
                : approved == 0 ?  <div className="py-1 px-3 bg-red-100 rounded-full text-sm italic">{ln.denied}</div>
                :  <div className="py-1 px-2 bg-green-100 rounded-full text-sm italic">{ln.approved}</div> 
            }
           
		</div>
	);
}

export default TransactionCard;
