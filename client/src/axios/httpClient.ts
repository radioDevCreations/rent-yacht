import { SystemBoolean } from '@/utilities/System';
import axios from 'axios';

const BASE_URL = 'https://localhost:5000';

const axiosInstance = axios.create({
  withCredentials: SystemBoolean.True,
  baseURL: BASE_URL,
  timeout: 10000,
});

export default axiosInstance;
