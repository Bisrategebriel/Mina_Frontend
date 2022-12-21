import React from "react";
import logo from "../../images/logo.png";
function WatchedThumbnail(props) {
	return (
		<div
			// onClick={() => {
			// 	watch(content.video_id);
			// }}
			className="min-w-[150px] max-w-[150px] p-1  bg-slate-100   rounded-2xl cursor-pointer"
		>
			<div className="w-full aspect-video overflow-hidden bg-white rounded-xl ">
				<img
					src={logo}
					alt=""
					srcSet=""
					className="object-center min-w-56 overflow-hidden aspect-video object-cover"
				/>
			</div>
			<h1 className="my-2 font-bold text-start text-sm">title</h1>
		</div>
	);
}

export default WatchedThumbnail;
