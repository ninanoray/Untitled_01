import axios, { AxiosResponse } from "axios";

// url 호출 시 기본 값 셋팅
export const apiAxios = axios.create({
  // baseURL: ``,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor
apiAxios.interceptors.request.use(
  (config) => {
    console.log(`(${config.method})${config.url}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiAxios.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiAxios;
