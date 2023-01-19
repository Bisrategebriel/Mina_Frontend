import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {languages} from "./languages.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Setup language context
export const LanguageContext = createContext();
const LanguageContextProvider = ({ children }) => {
    const [activeLanguage, setActiveLanguage] = useState(localStorage.getItem("lang") === "am" ? languages.am : languages.en)

    const setCurrentLanguage = (lang)=>{
        lang === "am" ? setActiveLanguage(languages.am) : setActiveLanguage(languages.en)
    }
    return (
        <LanguageContext.Provider value={[activeLanguage,setCurrentLanguage]}>
            {children}
        </LanguageContext.Provider>
    )
}
root.render(
	<React.StrictMode>
        <LanguageContextProvider>
            <Router>
                {/* <Routes> */}
                {/* <Route path="/" element={ <App />}></Route> */}
                <App />

                {/* </Routes> */}
            </Router>
        </LanguageContextProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
