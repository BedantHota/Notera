import axios from "axios";

const http = axios.create({
  baseURL: "https://notera-web-ppxh.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "https://jolly-melba-f00c0b.netlify.app",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default http;
