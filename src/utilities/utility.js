import axios from "axios";
import {
	useInfiniteQuery,
	useQueries,
	useQuery,
	useQueryClient,
} from "react-query";

//Invalidate query
export const useInvalidateQuery = (name) => {
	const queryClient = useQueryClient();

	return queryClient.invalidateQueries(name);
	// return queryClient.getQueryData(name);
};
//Fetch Currently Signed In User
const fetchCurrentUser = () => {
	return axios.get(`api/auth/currentUser`);
};
export const useUsers = (onSuccess, onError) =>
	useQuery("currentUser", fetchCurrentUser, {
		onSuccess,
		onError,
		// refetchOnWindowFocus: false,
        refetchOnMount: true,
        // refetchInterval: 1000,
		retry: false,
        // cacheTime: 1000,
        // staleTime: 0,
        fetchPolicy: "network-only"
	});


//Logout
const logout = () => {
	return axios.post("api/auth/logout");
};
export const useLogout = (onSuccess, onError) => {
	const queryClient = useQueryClient();
	// queryClient.removeQueries("currentUser");

	return useQuery("logout", logout, {
		enabled: false,
		onSuccess: () => {
			onSuccess();
			queryClient.removeQueries("currentUser");
		},
		onError,
	});
};

// Fetch Advertisements
const fetchAds = () => {
    return axios.get(`/api/settings`);
}
export const useAds = (onSuccess) => useQuery('advertisements', fetchAds, { onSuccess, refetchOnWindowFocus:false });

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
