import axios from "axios";
import http from 'http';
import https from 'https';

const BASE_URL = "https://localhost:5000";

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
	timeout: 10000,
	httpAgent: new http.Agent({ keepAlive: true }),
	httpsAgent: new https.Agent({ keepAlive: true }),
});

export default axiosInstance;
