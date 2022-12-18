import axios from 'axios';
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
    const videoLinks = [
        "1cH2cerUpMQ",
        "ars_rEC3oP8"
    ]
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

    }, [])

    function watch(video_id){
        console.log(video_id);
        navigate(`/watch/${video_id}`)
    }

    return (
        <div className='w-screen h-screen bg-gray-200 grid grid-cols-12 overflow-y-auto gap-2 justify-start content-start p-3'>
            <div className="col-span-12 h-12">
                User dashboard
            </div>

            {/* <VideoPlayer className="md:col-span-8 bg-white col-span-12 p-3 rounded-2xl overflow-hidden relative h-fit flex flex-col space-y-2"  /> */}

            <div className='col-span-12 p-3 grid grid-cols-12 gap-3'>
                {
                    videos.map((content,key)=>(
                        // <Link to="/watch/103">
                            <div onClick={()=>{watch(content.video_id)}} className='xl:col-span-2 md:col-span-3 col-span-6 p-3 bg-white rounded-2xl cursor-pointer'>
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