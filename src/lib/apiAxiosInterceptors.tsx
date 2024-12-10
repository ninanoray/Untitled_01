import axios, { AxiosResponse } from "axios";

export const API_SERVER = `${process.env.NEXT_PUBLIC_SERVER}`;

// url 호출 시 기본 값 셋팅
export const axiosInstance = axios.create({
  // baseURL: ``,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true,
});

// console log로 response 정보 출력
const printResponse = (response: AxiosResponse) => {
  const name = `(response)${response.config.url}`;
  console.log({ [name]: response.data });
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`(${config.method})${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    printResponse(response);
    return response;
  },
  (error) => {
    printResponse(error.response);
    return Promise.reject(error);
  }
);

export default axiosInstance;
