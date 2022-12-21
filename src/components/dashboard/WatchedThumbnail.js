import axios from "axios";
import React, { useEffect, useState } from "react";
function WatchedThumbnail({video_id}) {
    const [video, setVideo] = useState({
        src: "",
        title: ""
    });

    useEffect(()=>{
        console.log(video_id)
        var url;
            const uninterceptedAxiosInstance = axios.create();
            setVideo([])   
            url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${video_id}`
            uninterceptedAxiosInstance.get(url, {
                withCredentials: false
            }).then(res =>{
                console.log(res.data)
                setVideo({
                    src: res.data.thumbnail_url,
                    title: res.data.title
                })
            })
        
    },[])
	return (
		<div
			// onClick={() => {
			// 	watch(content.video_id);
			// }}
			className="min-w-[150px] max-w-[150px] p-1  bg-slate-100   rounded-2xl cursor-pointer"
		>
			<div className="w-full aspect-video overflow-hidden bg-white rounded-xl ">
				<img
					src={video.src}
					alt=""
					srcSet=""
					className="object-center min-w-56 overflow-hidden aspect-video object-cover"
				/>
			</div>
			<h1 className="my-2 font-bold text-start text-sm">{video.title}</h1>
		</div>
	);
}

export default WatchedThumbnail;
