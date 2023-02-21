import React, { useContext } from "react";
import playstore from "../../images/playstore.png";
import appstore from "../../images/appstore.png";
import "../../App.css";
import { LanguageContext } from "../..";

function Footer(props) {
    const languageContext = useContext(LanguageContext);
    const ln = languageContext[0]
  return (
    <div>
      <div className="w-screen p-12 bg-mina-blue-dark">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-12 flex md:flex-row flex-col justify-center space-y-4 md:space-y-0 md:space-x-4 text-white text-xl">
            <a href="#getStarted" className="transition-all">
              {ln.getStarted}
            </a>
            <a href="#howToRegister">{ln.howMinaWorks}</a>
            {/* <a href="#contact">{ln.contactUs}</a> */}
            <a href="#about">{ln.aboutUs}</a>
            {/* <a href="#">Privacy</a> */}
          </div>


        <div className="col-span-12 md:col-span-12 flex my-2 justify-center text-mina-orange-light">
            Contact us through our telegram channel: <a href="https://t.me/rakeb1234"> @rakeb1234</a>
        </div>
          {/* <div className="col-span-12 md:col-span-12 flex flex-wrap flex-row justify-center gap-4 my-8">
            <img
              src={playstore}
              alt="playstore icon"
              srcSet=""
              className="h-[50px] object-contain "
            />
            <img
              src={appstore}
              alt="playstore icon"
              srcSet=""
              className="h-[50px] object-contain"
            />
          </div> */}

          <div className="col-span-12 flex flex-wrap justify-around text-white mt-12">
            <p>Mina Plays © 2022 All rights reserved</p>
            <a
              href="https://www.kuraztech.com"
              target={"_blank"}
              rel="noreferrer"
            >
              Powered by Kuraz Technologies
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
