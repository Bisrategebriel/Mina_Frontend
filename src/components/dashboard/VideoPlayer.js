import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGift,
	faPlayCircle,
	faPauseCircle,
	faUserCircle,
	faSignOut,
	faUpload,
	faChevronCircleDown,
	faVideo,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../images/logo.png";
import YouTube from "react-youtube";
import axios from "axios";
import swal from "sweetalert2";
import { LanguageContext } from "../..";
import {
	useSettings,
	useFetchThumbnail,
	useInvalidateQuery,
	useLogout,
	useVideos,
} from "../../hooks/utilityHooks";
import LanguageSelector from "../LanguageSelector";

function VideoPlayer(props) {
	const playerRef = useRef(null);
	var [currentPoint, setCurrentPoint] = useState(0);
	var [isPlaying, setIsPlaying] = useState(false);
	var [isWatched, setIsWatched] = useState(true);
	var [watchStat, setWatchStat] = useState("Loading");
	const [ad3, setAd3] = useState();
	let [asc, setAsc] = useState(true); //table sort using asc or desc
	var classNames = props.className;
	var player;
	var YT;

	let [pages, setPages] = useState({
		currentPage: 1,
		totalCount: 1,
	});

	const { id } = useParams();
	var video = id;

	var navigate = useNavigate();
	var [videos, setVideos] = useState([]);

	//fetch Ad
	const onSettingsSuccess = (data) => {
		setAd3(data?.data.settings.ad3);
	};
	useSettings(onSettingsSuccess);

	// Fetch available Videos
	const [videoLinks, setVideoLinks] = useState([]);
	const onSuccess = (data) => {
		setVideoLinks([
			...videoLinks,
			...data?.data.videos.data.map((video) => video.video_id),
		]);
		setPages({
			currentPage: data?.data.videos.current_page,
			totalCount: data?.data.videos.last_page,
		});
	};
	const onError = (data) => {};
	const { data, isLoading } = useVideos(onSuccess, onError, {
		pages,
		axiosParams: {
			per_page: 20,
			asc: asc ? "asc" : "desc",
			search_query: "",
		},
	});
	// Fetch thumbnails
	const onThumbnailSuccess = (data) => {
		setVideos((videos) => [...videos, data.data]);
	};
	const onThumbnailError = (data) => {};
	const { data: thumbnail_data } = useFetchThumbnail(
		onThumbnailSuccess,
		onThumbnailError,
		{
			videoLinks,
		}
	);

	useEffect(() => {
		const handleContextmenu = (e) => {
			e.preventDefault();
		};
		document.addEventListener("contextmenu", handleContextmenu);
		return function cleanup() {
			document.removeEventListener("contextmenu", handleContextmenu);
		};
	}, []);

	function watch(video_id) {
		// console.log(video_id);
		navigate(`/watch/${video_id}`);
		window.location.reload();
	}

	useEffect(() => {
		if (window.YT) {
			onYouTubeIframeAPIReady();
		} else {
			init();
		}
		isViewed();
	}, [id]);

	function onYouTubeIframeAPIReady() {
		YT = window["YT"];
		// console.log("youtube ready");
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
				rel: 0,
			},
		});
	}

	useEffect(() => {
		if (!isWatched) {
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
		switch (event.data) {
			case window["YT"].PlayerState.PLAYING:
				if (cleanTime() == 0) {
					console.log("started " + cleanTime());
				} else {
					console.log("playing " + cleanTime());
				}
				setIsPlaying(true);
				break;
			case window["YT"].PlayerState.PAUSED:
				if (
					playerRef.current.getDuration() - playerRef.current.getCurrentTime() !=
					0
				) {
					console.log("paused" + " @ " + cleanTime());
				}
				setIsPlaying(false);
				break;
			case window["YT"].PlayerState.ENDED:
				updatePoint();
				setIsPlaying(false);
				console.log("ended ");
				break;
			default:
				console.log("no state");
				break;
		}
	}

	function onReady(event) {
		// console.log(event);
	}

	//utility
	function cleanTime() {
		return Math.round(playerRef.current.getCurrentTime());
	}
	function updatePoint() {
		// Get the loaded fraction
		setCurrentPoint(playerRef.current.getVideoLoadedFraction().toFixed(2));
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
		// console.log("initing");
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
		isPlaying ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
		setIsPlaying(!isPlaying);
	}

	// Check if video is watched
	function isViewed() {
		// Fetch Video Links
		axios.get("/sanctum/csrf-cookie").then((response) => {
			axios
				.get(`/api/view/isViewed`, {
					params: {
						video_id: id,
					},
				})
				.then((res) => {
					if (res.data.status === 200) {
						if (res.data.view_exists) {
							setIsWatched(true);
							setCurrentPoint(parseFloat(res.data.view_exists.points).toFixed(2));
							setWatchStat("Video already watched!");
						} else {
							setIsWatched(false);
						}
					} else {
					}
				});
		});
	}

	// Logout
	const onLogoutSuccess = (data) => {
		if (data?.data.status === 200) {
			// localStorage.removeItem("auth_token");
			sessionStorage.removeItem("auth_token");
			// localStorage.removeItem("auth_name");
		} else {
			// console.log(data?.data);
		}
	};
	const { refetch } = useLogout(onLogoutSuccess);
	const logout = (e) => {
		e.preventDefault();
		refetch();
		navigate("/signin");
	};

	const submitPoint = (e) => {
		swal
			.fire({
				title: "warning",
				icon: "warning",
				text:
					"After submitting your point, you won't be able to collect any more points from this video. Make sure you watched the whole video if you want to get the maximum point available",
				showCancelButton: true,
			})
			.then((res) => {
				if (res.isConfirmed) {
					// Submit point
					axios.get("/sanctum/csrf-cookie").then((response) => {
						// setIsLoading(true)
						// console.log(currentPoint)
						axios
							.post(`/api/view/create`, {
								points: currentPoint,
								video_id: id,
							})
							.then((res) => {
								// setIsLoading(false)
								if (res.data.status === 200) {
									// console.log(res.data.user)
									swal.fire({
										title: "success",
										icon: "success",
										text: "Successfully Submitted Point",
									});
									setIsWatched(true);
								} else {
								}
							});
					});
				}
			});
	};

	const languageContext = useContext(LanguageContext);
	const ln = languageContext[0];
	return (
		<div className="w-screen h-screen bg-slate-200 grid grid-cols-12 overflow-y-auto gap-2 justify-start content-start">
			<div className="col-span-12 h-24 p-3 md:px-24 px-6 flex justify-between items-center  z-50 bg-mina-blue-dark">
				{/* <Link to="/">
                    <img src={logo} alt="mina logo" className="h-16 object-cover" />
                </Link> */}
				<Link to="/">
					<img src={logo} alt="mina logo" className="h-16 object-cover" />
				</Link>

				<div className=" font-comfortaa space-x-3">
					<Link to="/dashboard" replace>
						<button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
							<FontAwesomeIcon icon={faVideo} />

							<p className="md:inline-block hidden">&nbsp; {ln.videos} </p>
						</button>
					</Link>
					<Link to="/profile" replace>
						<button className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg">
							<FontAwesomeIcon icon={faUserCircle} />
							<p className="md:inline-block hidden">&nbsp; {ln.profile} </p>
						</button>
					</Link>
					<button
						onClick={logout}
						className="p-2 px-4 bg-transparent border-2 border-mina-orange-light hover:bg-mina-orange-light hover:text-white text-mina-orange-light font-bold rounded-lg"
					>
						<FontAwesomeIcon icon={faSignOut} />
						<p className="md:inline-block hidden">&nbsp;{ln.logout}</p>
					</button>
					<LanguageSelector />
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
							<p>{ln.points}: </p>
							<p>{currentPoint}</p>
						</div>
						<div className="">
							{!isWatched ? (
								<button
									className="p-3 bg-mina-orange-light rounded-xl hover:bg-orange-200"
									onClick={() => {
										submitPoint();
									}}
								>
									<FontAwesomeIcon icon={faUpload} /> {ln.submit}
								</button>
							) : (
								<div className="p-3 text-sm rounded-full bg-mina-orange-light/20">
									{watchStat}
								</div>
							)}
						</div>
					</div>

					<div className="">
						<button
							className="p-3 bg-slate-100 rounded-xl hover:bg-slate-200"
							onClick={() => {
								playVid();
							}}
						>
							{isPlaying ? (
								<>
									<FontAwesomeIcon
										icon={faPauseCircle}
										className="text-mina-orange-light"
									/>{" "}
									{ln.pause}
								</>
							) : (
								<>
									<FontAwesomeIcon
										icon={faPlayCircle}
										className="text-mina-blue-light"
									/>{" "}
									{ln.play}
								</>
							)}
						</button>
					</div>
				</div>
			</div>

			<div className="md:col-span-4 col-span-12 grid grid-cols-12 gap-4 items-center p-3 grid-auto-rows auto-rows-max max-h-screen overflow-y-scroll">
				<div className="h-64 col-span-12 bg-mina-orange-light rounded-xl items-center flex justify-center overflow-clip">
					<img
						src={axios.defaults.baseURL + "/public/uploads/ads/" + ad3}
						alt="ad space"
						className="min-h-full min-w-full object-cover object-left"
					></img>
				</div>
				<div className="col-span-12 p-3 text-start bg-white rounded-lg">
					{ln.suggestedVideos}
				</div>
				{videos.map((content, key) => (
					<div
						key={key}
						onClick={() => {
							watch(content.video_id);
						}}
						className="h-full lg:col-span-6 col-span-12 md:max-w-[480px] p-3 bg-white rounded-2xl cursor-pointer hover:shadow-xl hover:shadow-slate-400/10 hover:-translate-y-1 duration-100"
					>
						<div className="w-full aspect-video overflow-hidden rounded-xl ">
							<img
								src={content.thumbnail_url}
								alt=""
								srcSet=""
								className="object-center w-full overflow-hidden aspect-video object-cover"
							/>
						</div>
						<h1 className="my-2 font-bold text-start text-sm md:text-md">
							{content.title}
						</h1>
					</div>
				))}
				{pages.currentPage < pages.totalCount && (
					<div className="col-span-12">
						<button
							className="p-3 bg-black/5 hover:bg-black/10  w-full"
							onClick={() => {
								setPages({
									...pages,
									currentPage: pages.currentPage + 1,
								});
							}}
						>
							Load More <FontAwesomeIcon icon={faChevronCircleDown} />{" "}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default VideoPlayer;
