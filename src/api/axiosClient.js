import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.ezfrontend.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptors= mở axios trên github(https://github.com/axios/axios) và coppy sang:
// Add a request interceptor
// gắn axiosClient vào axios
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent // thường ở đây sẽ là gắn token
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
// gắn axiosClient vào axios
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data // thường thì là sẽ chuyển đổi api
    return response.data; // nên .data để trả về data thôi(bt sẽ là headers,config,request,v... - ko cần care)
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const { config, status, data } = error.response;
    const URLS = ["/auth/local/register", "/auth/local"];
    if (URLS.includes(config.url) && status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      throw new Error(firstMessage.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
