import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext, UserContext } from '../..';
import moviePoster from '../../images/movie_poster.png';
import phones from '../../images/phones.png';
// import { useUsers } from '../utilities/utility';

function Landing(props) {
    const languageContext = useContext(LanguageContext);
    const ln = languageContext[0]
    // const [currentUser, setCurrentUser] = useState();
    // setCurrentUser(useContext(UserContext))

    let currentUser = useContext(UserContext)

    // const onSuccess = (data) => {
    //     if (data?.data.status === 500) {
    //         setCurrentUser(null) 
    //     } else if (data?.data.status === 200) {
    //         setCurrentUser(data?.data)
    //     }
    // }

    // const onError = () => {
    //     setCurrentUser(null)
    // }
    // const { isFetching, isLoading, isFetched, data, isError  } = useUsers(onSuccess,onError);
    return (
        <div>
            <div className="w-screen max-h-[880px] relative overflow-hidden z-0">
                <img src={moviePoster} alt="landing page" className="w-100 min-h-[800px] object-cover"/>
                <div className="absolute bg-gradient-to-b from-mina-blue-dark to-mina-blue-light/80 top-0 right-0 left-0 bottom-0 grid grid-cols-12 md:px-24">

                <div className="flex flex-col items-center md:items-start justify-center p-3 sm:p-12 col-span-12 md:col-span-12 lg:col-span-8 xl:col-span-7">
                    <h1 className="text-5xl md:text-7xl text-center md:text-start text-white mb-16 md:mb-36 font-bold">
                    {ln.mainHeader}
                    </h1>

                    <p className="font-semibold text-mina-orange-light text-lg md:text-2xl my-3 text-center md:text-start">{ln.cta}</p>
                    <div className="flex space-x-4 items-center">
                    <a href="#getStarted" className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-white  text-mina-orange-light font-bold rounded-lg ">{ln.getStarted}</a>
                    {
                    
                        (currentUser) && 
                        <Link to="/dashboard" >
                            <button className="p-2 px-4 hover:bg-white rounded-lg bg-mina-orange-light hover:text-orange-500 text-mina-blue-dark font-bold">{ln.dashboard}</button>
                        </Link> 
                    
                    }
                    

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