import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

function VideoPlayer(props) {
	const playerRef = useRef(null);
	var [currentPoint, setCurrentPoint] = useState(0);
	var classNames = props.className;
	var player;
	var YT;
	// var video = '1cH2cerUpMQ'
	// var video = 'ars_rEC3oP8'
	const { id } = useParams();
	var video = id;

	useEffect(() => {
		if (window.YT) {
			onYouTubeIframeAPIReady();
		} else{
            init();
        }
	}, [id]);


    function onYouTubeIframeAPIReady() {
        YT = window["YT"];
        console.log("youtube ready");
        playerRef.current = new window["YT"].Player("player", {
            videoId: id,
            events: {
                onStateChange: onPlayerStateChange,
                onError: onPlayerError,
                onReady: onReady,
            },
            playerVars: {
                controls: 0,
                enablejsapi: 1,
                modestbranding: 1,
                disablekb: 1,
                start: 0,
            },
        });
    };


	useEffect(() => {
		setCurrentPoint(0);
		//Update points every 5 second
		const interval = setInterval(() => {
			updatePoint();
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	function onPlayerStateChange(event) {
		// console.log(event)

		switch (event.data) {
			case window["YT"].PlayerState.PLAYING:
				if (cleanTime() == 0) {
					console.log("started " + cleanTime());
				} else {
					console.log("playing " + cleanTime());
				}
				break;
			case window["YT"].PlayerState.PAUSED:
				if (
					playerRef.current.getDuration() - playerRef.current.getCurrentTime() !=
					0
				) {
					console.log("paused" + " @ " + cleanTime());
				}
				break;
			case window["YT"].PlayerState.ENDED:
				updatePoint();
				console.log("ended ");
				break;
			default:
				console.log("no state");
				break;
		}
	}

	function onReady(event) {
		console.log(event);
		// window.onYouTubeIframeAPIReady();
		playerRef.current.playVideo();
        // const interval = setInterval(() => {
		// 	updatePoint();
		// }, 5000);

		// setInterval(console.log(playerRef.current.getVideoLoadedFraction()), 10)
	}

	//utility
	function cleanTime() {
		return Math.round(playerRef.current.getCurrentTime());
	}
	function updatePoint() {
		// Multiply the percentage of video watched currently with the total available points of the video divided by hundred
		// setCurrentPoint((Math.ceil(playerRef.current.getVideoLoadedFraction()*100)*point)/100)
		setCurrentPoint(Math.ceil(playerRef.current.getVideoLoadedFraction() * 100));
	}
	function onPlayerError(event) {
		switch (event.data) {
			case 2: //The request contains an invalid parameter value
				console.log("CODE 2" + video);
				break;
			case 5: //The requested content cannot be played in an HTML5
				console.log("CODE 5");
				break;
			case 100: //The video requested was not found
				console.log("CODE 100");
				break;
			case 101 || 150: //The owner of the requested video does not allow it to be played in embedded players.
				console.log("CODE 101 || 150");
				break;
			default:
				console.log("Unknown player error: " + event.data);
				break;
		}
	}

	function init() {
		console.log("initing");
		var tag = document.createElement("script");
		tag.src = "https://www.youtube.com/iframe_api";

        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
		var firstScriptTag = document.getElementsByTagName("script")[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	function changeVid() {
		playerRef.current.loadVideoById("1cH2cerUpMQ");
	}

	return (
        <div className='w-screen h-screen bg-gray-200 grid grid-cols-12 overflow-y-auto gap-2 justify-start content-start p-3'>
            <div className="md:col-span-8 bg-white col-span-12 p-3 rounded-2xl overflow-hidden relative h-fit flex flex-col space-y-2">
                <div
                    id="player"
                    className="h-full w-full rounded-xl overflow-hidden aspect-video "
                ></div>

                <div className="w-24 p-3 bg-mina-blue-dark text-white text-xl font-bold ">
                    {currentPoint}
                </div>

                <div className="w-full p-3">
                    <button onClick={changeVid}>change</button>
                </div>
            </div>
        </div>
	);
}

export default VideoPlayer;
