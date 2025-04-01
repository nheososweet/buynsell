import axios from "axios";
import queryString from "query-string";
import { unstable_batchedUpdates } from "react-dom";
import { useUserStore } from "@/pages/authenticate/state";
import { useAppLoading } from "@/global-states/loading.state"; // Import từ Zustand

const axios_client = axios.create({
  baseURL: "https://3ed6-27-72-89-108.ngrok-free.app/api",
  paramsSerializer: (params) => queryString.stringify(params),
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "69420",
  },
});

axios_client.defaults.timeout = 30000;

// Function để thiết lập Interceptor
const setupInterceptors = () => {
  // Lấy setAppLoading từ Zustand với kiểu đã định nghĩa
  const setAppLoading = (useAppLoading.getState() as any).setAppLoading;
  // Request Interceptor
  axios_client.interceptors.request.use(
    function (config) {
      const access_token = unstable_batchedUpdates(() => {
        return useUserStore.getState().access_token;
      });

      if (access_token) {
        config.headers.Authorization = "Bearer " + access_token;
      }

      setAppLoading(true); // Bật loading
      return config;
    },
    function (error) {
      setAppLoading(false); // Tắt loading nếu lỗi
      return Promise.reject(error);
    }
  );

  // Response Interceptor
  axios_client.interceptors.response.use(
    function (response) {
      setAppLoading(false); // Tắt loading khi có response
      return {
        ...response.data,
        status: response.status,
      };
    },
    function (error) {
      setAppLoading(false); // Tắt loading nếu lỗi
      return Promise.reject(error);
    }
  );
};

// Gọi setupInterceptors một lần khi khởi tạo
setupInterceptors();

export default axios_client;
