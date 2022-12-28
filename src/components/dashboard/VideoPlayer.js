import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faPlayCircle, faPauseCircle, faUserCircle, faSignOut, faUpload   } from '@fortawesome/free-solid-svg-icons';
import logo from "../../images/logo.png";
import YouTube from "react-youtube";
import axios from "axios";
import swal from "sweetalert2";

function VideoPlayer(props) {
	const playerRef = useRef(null);
	var [currentPoint, setCurrentPoint] = useState(0);
    var [isPlaying, setIsPlaying] = useState(false);
    var [isWatched, setIsWatched] = useState(true);
    var [watchStat, setWatchStat] = useState("Loading");
	var classNames = props.className;
	var player;
	var YT;
	// var video = '1cH2cerUpMQ'
	// var video = 'ars_rEC3oP8'
	const { id } = useParams();
	var video = id;

    var navigate = useNavigate();
    var [videos, setVideos] = useState([
        {
            // title:''
        }
    ]);
    // Fetch available Videos
    const [videoLinks, setVideoLinks] = useState([
    ])
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
            console.log(currentPoint)
            axios.get(`/api/video/index`, { 
                params:{
                    asc: 'desc',
                    per_page: 50
                }
            }).then((res) => {
                // setIsLoading(false)
                if (res.data.status === 200) {
                    console.log(res.data.videos.data)
                    setVideoLinks(res.data.videos.data.map(video => video.video_id))
                } else {

                }
            });
        });
    },[])

    function watch(video_id){
        console.log(video_id);
        navigate(`/watch/${video_id}`)
        window.location.reload();
    }


	useEffect(() => {
		if (window.YT) {
			onYouTubeIframeAPIReady();
		} else{
            init();
        }
        isViewed();
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
                rel: 0
            },
        });
    };


	useEffect(() => {
        if(!isWatched){
            // setCurrentPoint()
            setCurrentPoint(0);
            //Update points every 5 second
            const interval = setInterval(() => {
                updatePoint();
            }, 5000);

            
            return () => clearInterval(interval);
        } else {
            // setWatchStat("Video already watched!")
        }
	}, [isWatched]);

	function onPlayerStateChange(event) {
		// console.log(event)

		switch (event.data) {
			case window["YT"].PlayerState.PLAYING:
				if (cleanTime() == 0) {

					console.log("started " + cleanTime());
				} else {
					console.log("playing " + cleanTime());
				}
                setIsPlaying(true)
				break;
			case window["YT"].PlayerState.PAUSED:
				if (
					playerRef.current.getDuration() - playerRef.current.getCurrentTime() !=
					0
				) {
					console.log("paused" + " @ " + cleanTime());
				}
                setIsPlaying(false)
				break;
			case window["YT"].PlayerState.ENDED:
				updatePoint();
                setIsPlaying(false)
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
		// playerRef.current.playVideo();
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
		setCurrentPoint(playerRef.current.getVideoLoadedFraction().toFixed(2));
        // console.log(currentPoint)
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
	function playVid() {
        isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo()   
        setIsPlaying(!isPlaying);   
	}

    // Check if video is watched
    function isViewed() {
        // Fetch Video Links
        axios.get("/sanctum/csrf-cookie").then((response) => {
            // setIsLoading(true)
            console.log(currentPoint)
            axios.get(`/api/view/isViewed`, { 
                params:{
                    video_id: id
                }
            }).then((res) => {
                // setIsLoading(false)
                if (res.data.status === 200) {
                    console.log(res.data.view_exists)
                    // res.data.view_exists.length == 0 ? setIsWatched(false) : setIsWatched(true)
                    if(res.data.view_exists){
                        setIsWatched(true)
                        setCurrentPoint(parseFloat(res.data.view_exists.points).toFixed(2))
                        setWatchStat("Video already watched!")
                    } else {
                        setIsWatched(false)
                    }
                    // setIsWatched(true)
                } else {

                }
            });
        });
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

    const submitPoint = (e) => {
        swal.fire({
            title : "warning",
            icon : "warning",
            text: "After submitting your point, you won't be able to collect any more points from this video. Make sure you watched the whole video if you want to get the maximum point",
            showCancelButton : true
        }
        ).then((res)=>{
            if(res.isConfirmed){
                // Submit point 
                axios.get("/sanctum/csrf-cookie").then((response) => {
                    // setIsLoading(true)
                    console.log(currentPoint)
                    axios.post(`/api/view/create`, { 
                        points: currentPoint,
                        video_id: id
                    }).then((res) => {
                        // setIsLoading(false)
                        if (res.data.status === 200) {
                            console.log(res.data.user)
                            swal.fire({
                                title: "success",
                                icon: "success",
                                text: "Successfully Submitted Point"
                            })
                        } else {

                        }
                    });
                });
            }
        })
    }

	return (
        <div className='w-screen h-screen bg-slate-200 grid grid-cols-12 overflow-y-auto gap-2 justify-start content-start'>
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
            <div className="md:col-span-8 bg-white col-span-12 p-1 md:p-4 rounded-2xl relative aspect-video flex flex-col space-y-2 mx-2 md:mx-3 max-w-[1280px]">
                <div
                    id="player"
                    className="h-full w-full rounded-xl overflow-hidden aspect-video "
                >
                    <div className="h-full w-full bg-slate-100"></div>
                </div>

                <div className="w-full p-3 flex justify-between">
                    <div className="flex sm:flex-row flex-col items-start sm:items-center sm:space-x-2 sm:space-y-0 space-y-2">
                        <div className="w-36 md:w-48 h-fit p-2 md:p-3 bg-mina-blue-dark text-white text-sm md:text-xl font-bold flex rounded-full justify-start space-x-4 items-center">
                            <FontAwesomeIcon icon={faGift} />
                            <p>Points: </p>
                            <p>
                                {currentPoint}
                            </p>
                        </div>
                        <div className="">
                            {!isWatched ?
                                <button 
                                    className="p-3 bg-mina-orange-light rounded-xl hover:bg-orange-200"
                                    onClick={()=>{submitPoint()}}>
                                        <FontAwesomeIcon icon={faUpload}/> Submit 
                                </button>
                                :
                                <div className="p-3 text-sm">
                                    {watchStat}
                                </div>
                            }
                        </div>

                    </div>

                    <div className="">
                        <button 
                            className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200"
                            onClick={()=>{playVid()}}>
                            {isPlaying ? 
                            <>
                                <FontAwesomeIcon icon={faPauseCircle} className="text-mina-orange-light"/> Pause 
                            </>
                            : 
                            <>
                                <FontAwesomeIcon icon={faPlayCircle} className="text-mina-blue-light"/> Play
                            </>
                            }
                        </button>
                    </div>

                </div>
            </div>

            <div className="md:col-span-4 col-span-12 grid grid-cols-12 gap-4 items-center p-3 grid-auto-rows auto-rows-max max-h-screen overflow-y-scroll">
                <div className="h-48 col-span-12 bg-slate-600 rounded-xl items-center flex justify-center">AD SPACE</div>
                <div className="col-span-12 p-3 text-start bg-white rounded-lg">
                    Suggested Videos
                </div>
            {
                    videos.map((content,key)=>(
                        // <Link to="/watch/103">
                            <div key={key} onClick={()=>{watch(content.video_id)}} className='h-full lg:col-span-6 col-span-12 md:max-w-[480px] p-3 bg-white rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-slate-400/10 hover:-translate-y-1 duration-100'>
                                <div className="w-full aspect-video overflow-hidden rounded-xl ">
                                    <img src={content.thumbnail_url} alt="" srcSet="" className='object-center w-full overflow-hidden aspect-video object-cover' />
                                </div>
                                <h1 className='my-2 font-bold text-start text-sm md:text-md'>{content.title}</h1>
                            </div>
                        
                        // </Link>

                    )
                    )
                }
            </div>
        </div>
	);
}

export default VideoPlayer;
