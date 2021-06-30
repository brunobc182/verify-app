import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

const http = axios.create({
  baseURL,
  headers: {
    "x-api-key": apiKey,
  },
});

export default http;
