import axios from "axios";

const BASE_URL = "http://127.0.0.1";

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
});

// axiosInstance.interceptors.request.use(
// 	async (config) => {
// 		return config;
// 	},
// 	(error) => {
// 		console.log("Request has failed", error);
// 		Promise.reject(error);
// 	}
// );

export default axiosInstance;
