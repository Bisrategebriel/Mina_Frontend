import { faChevronCircleDown, faChevronDown, faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import logo from "../images/logo.png";
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../components/dashboard/VideoPlayer';
import { LanguageContext } from '..';
import swal from 'sweetalert2';
import VerifyCard from '../components/VerifyCard';
import LanguageSelector from '../components/LanguageSelector';
import { useDashboardVideos, useFetchThumbnail, useLogout, useVideos } from '../utilities/utility';
import Spinner from '../components/Spinner';

function UserDashboard({ isVerified }) {
    var navigate = useNavigate();
    var [videos, setVideos] = useState([]);
    let [searchQuery, setSearchQuery] = useState(""); //search query variable
    let [pages, setPages] = useState({  
        currentPage: 1,
        totalCount: 1

    });
    let [asc, setAsc] = useState(true); //table sort using asc or desc

    // Fetch available Videos
    const [videoLinks, setVideoLinks] = useState([])
    const onSuccess = (data) => {
        searchQuery.length === 0 ? setVideoLinks([...videoLinks, ...data?.data.videos.data.map(video => video.video_id)]) :
            setVideoLinks(data?.data.videos.data.map(video => video.video_id))
        setPages({
            currentPage: data?.data.videos.current_page,
            totalCount: data?.data.videos.last_page,
        })
    }
    const onError = (data) => {
    }
    const { data, isLoading } = useVideos(onSuccess, onError, {
        pages,
        axiosParams: {
            per_page: 20,
            asc: asc ? "asc" : "desc",
            search_query: searchQuery,
        }
    });

    const onThumbnailSuccess = (data) => {
        searchQuery.length === 0 ?
        setVideos(videos => [
            ...videos,
            data.data
        ]) 
        :
        setVideos([data?.data])
    }
    const onThumbnailError = (data) => {
    }
    const { data: thumbnail_data } = useFetchThumbnail(onThumbnailSuccess, onThumbnailError, {
        videoLinks
    });


    function watch(video_id) {
        navigate(`/watch/${video_id}`)
    }

    const { refetch } = useLogout();
    const logout = (e) => {
        e.preventDefault();
        refetch();
        navigate("/signin")
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // utility to optimize search function
    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 600);
        };
    };

    const optimizedSearch = useCallback(debounce(handleSearch), []);
    const languageContext = useContext(LanguageContext);
    const ln = languageContext[0]
    return (
        <div className='w-screen h-screen bg-gray-200 grid grid-cols-12 overflow-y-auto gap-2 justify-start content-start'>
            <div className="col-span-12 h-24 p-3 md:px-24 px-6 flex justify-between items-center  z-50 bg-mina-blue-dark">
                <Link to="/">
                    <img src={logo} alt="mina logo" className="h-16 object-cover" />
                </Link>

                <div className=" font-comfortaa space-x-3">
                    <Link to="/profile" replace>
                        <button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
                            <FontAwesomeIcon icon={faUserCircle} />
                            &nbsp;
                            <p className="md:inline-block hidden"> {ln.profile} </p>
                        </button>
                    </Link>
                    <button onClick={logout} className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
                        <FontAwesomeIcon icon={faSignOut} />
                        &nbsp;
                        <p className="md:inline-block hidden">{ln.logout}</p>
                    </button>
                    <LanguageSelector />
                </div>
            </div>
            {/* Check if email is verified */}
            {isVerified ?
                <React.Fragment>
                    <div className="col-span-12 w-full flex justify-center items-center space-x-2 px-3">
                        <input
                            type="text"
                            onChange={(e) => {
                                optimizedSearch(e);
                            }}
                            // value={searchQuery}
                            name="searchQuery"
                            id="searchQuery"
                            placeholder={ln.search}
                            className="p-2 border-2 border-solid border-2-mina-blue-dark rounded-md self-end min-w-48 md:w-96"
                        />
                    </div>
                    <div className='col-span-12 p-3 grid grid-cols-12 gap-3'>
                        {
                            videos.map((content, key) => (
                                // <Link to="/watch/103">
                                // if(content.status)
                                <div key={key} onClick={() => { watch(content.video_id) }} className='xl:col-span-3 md:col-span-3 sm:col-span-6 col-span-12 p-3 bg-white rounded-2xl cursor-pointer'>
                                    <div className="w-full aspect-video overflow-hidden rounded-xl ">
                                        <img src={content.thumbnail_url} alt="" srcSet="" className='object-center w-full overflow-hidden aspect-video object-cover' />
                                    </div>
                                    <h1 className='my-2 font-bold text-start'>{content.title}</h1>
                                </div>

                                // </Link>

                            )
                            )
                        }
                        {
                            isLoading && <Spinner />
                        }
                    </div>
                    {
                        pages.currentPage < pages.totalCount &&
                        // <button className="px-3 py-1 rounded-full bg-white hover:bg-slate-50 shadow-lg absolute bottom-2 right-2" onClick={()=>{
                        <div className='col-span-12'>
                            <button className="p-3 bg-black/5 hover:bg-black/10  w-full" onClick={() => {
                                setPages({
                                    ...pages,
                                    currentPage: pages.currentPage + 1
                                }
                                );
                            }}>Load More <FontAwesomeIcon icon={faChevronCircleDown} /> </button>
                        </div>

                    }

                </React.Fragment>
                :
                <VerifyCard />
            }
        </div>
    );
}

export default UserDashboard;