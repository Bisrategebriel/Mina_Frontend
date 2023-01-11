import React, { useContext } from 'react';
import { LanguageContext } from '..';
import FAQ from './FAQ';

function About(props) {
    const languageContext = useContext(LanguageContext);
    const ln = languageContext[0]

    return (
        <div className='h-full'>
            <div id="about" className="w-full grid grid-cols-12 px-3 md:px-24 lg:px-48 ">
                <div className="col-span-12 xl:col-span-8 xl:col-start-3  p-3 md:p-12 rounded-lg relative overflow-hidden md:overflow-visible">
                    <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -top-12 -right-24 rounded-full"></div>
                    <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -bottom-12 -left-24 rounded-full"></div>

                    <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-md bg-white/10 shadow-lg rounded-lg"></div>

                    <div className="grid grid-cols-12 px-3 md:px-6 xl:px-18 relative z-20 gap-4">
                        <div className="col-span-12 flex flex-col items-center space-y-4">
                            <p className="text-3xl md:text-5xl">{ln.aboutUs}</p>
                        </div>
                        
                        <div className="col-span-12 flex flex-col items-center space-y-4">
                            <p className="text-md md:text-lg text-justify">

                            {ln.aboutOne}
                            <br></br>
                            {ln.aboutTwo}
                            <br></br>
                            {ln.aboutThree}
                            <br></br>
                            {ln.aboutFour}
                            </p>
                        </div>
                        
                
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;