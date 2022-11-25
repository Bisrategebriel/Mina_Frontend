import React from 'react';
import moviePoster from '../images/movie_poster.png';
import phones from '../images/phones.png';

function Landing(props) {
    return (
        <div>
            <div className="w-screen max-h-[880px] relative overflow-hidden z-0">
                <img src={moviePoster} alt="landing page" className="w-100 min-h-[800px] object-cover"/>
                <div className="absolute bg-gradient-to-b from-mina-blue-dark to-mina-blue-light/80 top-0 right-0 left-0 bottom-0 grid grid-cols-12 md:px-24">

                <div className="flex flex-col items-center md:items-start justify-center p-12 col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-7">
                    <h1 className="text-5xl md:text-7xl text-center md:text-start text-white mb-16 md:mb-36 font-bold">
                    WATCH VIDEOS AND EARN MONEY
                    </h1>

                    <p className="font-semibold text-mina-orange-light text-xl md:text-2xl my-3 text-center md:text-start">Discover fun at your fingertips. Ready to watch?</p>
                    <div className="flex space-x-4">
                    <button className="p-2 px-4 hover:bg-white rounded-lg bg-mina-orange-light hover:text-orange-500 text-mina-blue-dark font-bold">Get Started</button>
                    <button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-white  text-mina-orange-light font-bold rounded-lg">Download the App</button>

                    </div>

                </div>
                <div className="hidden lg:flex items-center justify-start col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-5 p-6">
                    <img src={phones} alt="" className="max-w-full max-h-full object-cover"/>

                </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;