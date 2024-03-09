import axios from "axios";

const BASE_URL = "http://127.0.0.1";

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
});

export default axiosInstance;
