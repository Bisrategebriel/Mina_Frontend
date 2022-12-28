import { faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import logo from "../images/logo.png";
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../components/dashboard/VideoPlayer';

function UserDashboard(props) {
    var navigate = useNavigate();
    var [videos, setVideos] = useState([
        {
            // title:''
        }
    ]);
    // Fetch available Videos
    const [videoLinks, setVideoLinks] = useState([])
    useEffect(()=>{
        
            const YOUTUBE_API_KEY = "AIzaSyCQhPy1H5xcfYiI6igvyBCgv7M22ls5RmQ";
            var url;
            const uninterceptedAxiosInstance = axios.create();
            setVideos([])
            // url = `https://www.googleapis.com/youtube/v3/videos?id=${videoLinks[0]}&key=${YOUTUBE_API_KEY}&part=snippet`
            videoLinks.forEach((videoLink)=>{
                url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoLink}`
                uninterceptedAxiosInstance.get(url, {
                    withCredentials: false
                }).then(res =>{
                    console.log(res.data)
                    res.data["video_id"] = videoLink
                    // setVideos(...videos,res.data)
                    setVideos(videos => [
                        ...videos,
                        res.data
                      ]);
                })
        
            })

    }, [videoLinks])

    useEffect(()=>{
        // Fetch Video Links
        axios.get("/sanctum/csrf-cookie").then((response) => {
            // setIsLoading(true)
            axios.get(`/api/video/index`, { 
                params:{
                    asc: 'desc',
                    per_page: 50
                }
            }).then((res) => {
                // setIsLoading(false)
                if (res.data.status === 200) {
                    console.log(res.data.videos.data.map(video => video.video_id))
                    setVideoLinks(res.data.videos.data.map(video => video.video_id))
                } else {

                }
            });
        });
    },[])

    function watch(video_id){
        console.log(video_id);
        navigate(`/watch/${video_id}`)
    }

    const logout = (e) => {
        e.preventDefault();

        axios.post(`api/auth/logout`).then(res=>{
            if(res.data.status === 200){
                console.log(res.data);
                localStorage.removeItem("auth_token");
                localStorage.removeItem("auth_name");

                // swal("Success", res.data.message, "success");
                navigate("/signin");
            }
            else {
                console.log(res.data)
            }
        });
    }
    return (
        <div className='w-screen h-screen bg-gray-200 grid grid-cols-12 overflow-y-auto gap-2 justify-start content-start'>
            <div className="col-span-12 h-24 p-3 md:px-24 px-6 flex justify-between items-center  z-50 bg-mina-blue-dark">
                {/* <Link to="/">
                    <img src={logo} alt="mina logo" className="h-16 object-cover" />
                </Link> */}
                <Link to="/">
                    <img src={logo} alt="mina logo" className="h-16 object-cover" />
                </Link>

                <div className=" font-comfortaa space-x-3">
                    <Link to="/profile" replace>
                        <button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
                            <FontAwesomeIcon icon={faUserCircle}/>
                            &nbsp;
                            <p className="md:inline-block hidden"> Profile </p> 
                        </button>
                    </Link>
                    <button onClick={logout} className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
                        <FontAwesomeIcon icon={faSignOut}/>
                        &nbsp;
                        <p className="md:inline-block hidden">Logout</p>
                    </button>
                    
                </div>
            </div>

            {/* <VideoPlayer className="md:col-span-8 bg-white col-span-12 p-3 rounded-2xl overflow-hidden relative h-fit flex flex-col space-y-2"  /> */}

            <div className='col-span-12 p-3 grid grid-cols-12 gap-3'>
                {
                    videos.map((content,key)=>(
                        // <Link to="/watch/103">
                            <div key={key} onClick={()=>{watch(content.video_id)}} className='xl:col-span-3 md:col-span-3 sm:col-span-6 col-span-12 p-3 bg-white rounded-2xl cursor-pointer'>
                                <div className="w-full aspect-video overflow-hidden rounded-xl ">
                                    <img src={content.thumbnail_url} alt="" srcSet="" className='object-center w-full overflow-hidden aspect-video object-cover' />
                                </div>
                                <h1 className='my-2 font-bold text-start'>{content.title}</h1>
                            </div>
                        
                        // </Link>

                    )
                    )
                }
            </div>
        </div>
    );
}

export default UserDashboard;