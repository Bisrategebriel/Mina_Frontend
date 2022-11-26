import React from 'react';
import playstore from '../images/playstore.png';
import appstore from '../images/appstore.png';

function Footer(props) {
    return (
        <div>
            <div className="w-screen p-12 bg-mina-blue-dark">
                <div className="grid grid-cols-12">

                <div className="col-span-6 md:col-span-12 flex md:flex-row flex-col items-start md:justify-center space-y-4 md:space-y-0 md:space-x-4 text-white text-xl">
                    <a href="#">Get Started</a>
                    <a href="#">How to Register</a>
                    <a href="#">Contact</a>
                    <a href="#">Terms</a>
                    <a href="#">Privacy</a>
                </div>

                <div className="col-span-6 md:col-span-12 flex flex-col md:flex-row justify-center gap-4 my-8">
                    <img src={playstore} alt="playstore icon" srcSet="" className="h-[50px] object-contain "/>
                    <img src={appstore} alt="playstore icon" srcSet="" className="h-[50px] object-contain"/>
                </div>

                <div className="col-span-12 flex justify-around text-white mt-12">
                    <p>Mina Plays © 2022 All rights reserved</p>
                    <a href="https://www.kuraztech.com">Powered by Kuraz Technologies</a>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;