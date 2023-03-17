import React, { useContext } from "react";
import { LanguageContext } from "..";

function LanguageSelector() {
	const languageContext = useContext(LanguageContext);
	return (
		<select
			className="bg-transparent p-1 border-1 border-mina-orange-light text-mina-orange-light text-xs"
			value={localStorage.getItem("lang")?localStorage.getItem("lang"): "en"}
			onChange={(val) => {
				languageContext[1](val.target.value);
				localStorage.setItem("lang", val.target.value);
			}}
		>
			<option value="en">En</option>
			<option value="am">አማ</option>
		</select>
	);
}

export default LanguageSelector;
