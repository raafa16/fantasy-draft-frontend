import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost.com:3001/api/v1/",
  responseType: "json",
  withCredentials: true,
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token"
});
