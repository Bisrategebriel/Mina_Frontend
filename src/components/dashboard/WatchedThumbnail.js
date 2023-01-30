import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFetchSingleThumbnail, useFetchThumbnail } from "../../hooks/utilityHooks";
function    WatchedThumbnail({video_id}) {
    const [video, setVideo] = useState({
        src: "",
        title: ""
    });

    const onThumbnailSuccess = (data) => {
		setVideo(
            {
                src: data.data.thumbnail_url,
                title: data.data.title
            }
        );
	};
	const onThumbnailError = (data) => {};
	const { data: thumbnail_data } = useFetchSingleThumbnail(
		onThumbnailSuccess,
		onThumbnailError,
		{
			videoLink: video_id,
		}
	);
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
