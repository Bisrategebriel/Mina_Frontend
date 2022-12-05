import React from 'react';
import FAQ from './FAQ';

function About(props) {
    

    return (
        <div className='h-full'>
            <div id="about" className="w-full grid grid-cols-12 px-3 md:px-24 lg:px-48 ">
                <div className="col-span-12 xl:col-span-8 xl:col-start-3  p-3 md:p-12 rounded-lg relative overflow-hidden md:overflow-visible">
                    <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -top-12 -right-24 rounded-full"></div>
                    <div className="w-[200px] h-[200px] bg-mina-orange-light absolute -bottom-12 -left-24 rounded-full"></div>

                    <div className="absolute top-0 right-0 left-0 bottom-0 z-10 backdrop-blur-md bg-white/10 shadow-lg rounded-lg"></div>

                    <div className="grid grid-cols-12 px-3 md:px-6 xl:px-18 relative z-20 gap-4">
                        <div className="col-span-12 flex flex-col items-center space-y-4">
                            <p className="text-3xl md:text-5xl">About Us</p>
                        </div>
                        
                        <div className="col-span-12 flex flex-col items-center space-y-4">
                            <p className="text-md md:text-lg text-justify">

                            Mina play is the first Ethiopian website and application where you can make money by watching YouTube videos. Once you join mina play, you can earn money using links which you can find on the website and simply, copy the links from the website and past on YouTube.
                            <br></br>
                            A variety of videos are included to satisfy your needs, such as educational content , entertainment, news, books, different programs and shows. 
                            Points and Rewards Mina play will give you points for watching videos and by completing some simple tasks. 
                            <br></br>
                            All the tasks have different points related to their importance and value. Such tasks are like giving feedback, liking videos, answering questions, engaging in open discussions and more. 
                            Mina play members collect points and coins which we call them Dembulo (ድምቡሎ). 100 points is equivalent to one Dembulo; One Dumbulo is equivalent to 15 birr. <br></br> At the end of each month, members get paid or collect their Dembulos. The minimum withdrawal rate on mina play starts at 100 Birr.
                            </p>
                        </div>
                        
                
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;