import axios from "axios";

const BASE_URL = "https://localhost:5000";

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
});

export default axiosInstance;
