import axios from "axios";

const BASE_URL = "http://localhost";

const axiosInstance = axios.create({
	baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
	async (config) => {
		config.headers.crossDomain = true;
		config.headers.withCredentias = true;
		config.headers["Access-Control-Allow-Origin"] = "*";
		config.headers["Access-Control-Allow-Headers"] =
			"Origin, X-Requested-With, Content-Type, Accept";
		return config;
	},
	(error) => {
		console.log("Request has failed", error);
		Promise.reject(error);
	}
);

export default axiosInstance;
