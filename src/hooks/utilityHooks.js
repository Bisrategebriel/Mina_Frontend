import axios from "axios";
import {
	useInfiniteQuery,
	useQueries,
	useQuery,
	useQueryClient,
} from "react-query";
// axios.interceptors.response.use(
//     (response) => {
//       // Return the response if successful
//       return response;
//     },
//     (error) => {
//       // Handle errors here
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.log(error.response.data);
//         console.log(error.response.status);
//         console.log(error.response.headers);
// 		return
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.log(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.log('Error', error.message);
//       }

//       // Return a rejected promise with the error object
//       return Promise.reject(error);
//     }
//   );

//Invalidate query
export const useInvalidateQuery = (name) => {
	const queryClient = useQueryClient();

	return queryClient.invalidateQueries(name);
	// return queryClient.getQueryData(name);
};
//Fetch Currently Signed In User
const fetchCurrentUser = () => {
	let response = axios.get(`api/auth/currentUser`)
	return response;
};
export const useUsers = (onSuccess, onError) =>
	useQuery("currentUser", fetchCurrentUser, {
		onSuccess,
		onError,
		refetchOnWindowFocus: false,
		refetchOnMount: true,
		// refetchInterval: 1000,
		retry: false,
		// cacheTime: 1000,
		// staleTime: 0,
		fetchPolicy: "network-only",
	});

//Logout
const logout = () => {
	return axios.post("api/auth/logout");
};
export const useLogout = (onSuccess, onError) => {
	const queryClient = useQueryClient();

	return useQuery("logout", logout, {
		enabled: false,
		onSuccess: () => {
			onSuccess();
			queryClient.invalidateQueries("currentUser");
		},
		onError,
	});
};

// Fetch Advertisements
const fetchSettings = () => {
	return axios.get(`/api/settings`);
};
export const useSettings = (onSuccess) =>
	useQuery("settings", fetchSettings, {
		onSuccess,
		refetchOnWindowFocus: false,
	});

//Fetch Available Videos
const fetchAvailableVideos = ({ queryKey }) => {
	const pageParam = queryKey[1];
	const axiosParams = queryKey[2];

	let url =
		axiosParams.search_query.length === 0
			? `api/video/user_index?page=${pageParam}`
			: `api/video/user_search?page=${pageParam}`;
	return axios.get(url, { params: axiosParams });
};
export const useVideos = (onSuccess, onError, { pages, axiosParams }) =>
	useQuery(["videos", pages.currentPage, axiosParams], fetchAvailableVideos, {
		refetchOnWindowFocus: false,
		onSuccess,
		onError,
		keepPreviousData: true,
	});

//Fetch Thumbnails
const fetchThumbnail = ({ queryKey }) => {
	const videoLink = queryKey[1];
	const uninterceptedAxiosInstance = axios.create();
	let url = `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoLink}`;
	return uninterceptedAxiosInstance.get(url, {
		withCredentials: false,
	});
};
export const useFetchThumbnail = (
	onThumbnailSuccess,
	onThumbnailError,
	{ videoLinks }
) =>
	useQueries(
		videoLinks.map((videoLink) => {
			return {
				queryKey: ["thumbnails", videoLink],
				queryFn: fetchThumbnail,
				refetchOnWindowFocus: false,
				onSuccess: onThumbnailSuccess,
				onError: onThumbnailError,
				select: (data) => {
					data.data.video_id = videoLink;
					return data;
				},
			};
		})
	);

export const useFetchSingleThumbnail = (
	onThumbnailSuccess,
	onThumbnailError,
	{ videoLink }
) =>
	useQuery(["thumbnail", videoLink], fetchThumbnail, {
		refetchOnWindowFocus: false,
		onSuccess: onThumbnailSuccess,
		onError: onThumbnailError,
	});

const fetchTransactionHistory = () => {
	return axios.get(`/api/transaction/show`);
};
export const useTransactionHistory = (onSuccess, onError) =>
	useQuery(["transactions"], fetchTransactionHistory, {
		refetchOnWindowFocus: true,
		onSuccess,
		onError,
	});

const fetchWatchHistory = () => {
	return axios.get(`/api/view/watchHistory`);
};
export const useWatchHistory = (onSuccess, onError) =>
	useQuery(["watchHistory"], fetchWatchHistory, {
		refetchOnWindowFocus: true,
		onSuccess,
		onError,
	});
