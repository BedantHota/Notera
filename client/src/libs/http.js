import axios from "axios";

const http = axios.create({
  baseURL: "https://notera-web-ppxh.onrender.com",
  withCredentials: true,
});

export default http;
