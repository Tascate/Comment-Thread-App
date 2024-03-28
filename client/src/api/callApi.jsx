import axios from "axios";

export function callAPI(url, headers) {
  var api = axios.create({
    //baseURL: "http://localhost:3001/",
    baseURL: import.meta.env.VITE_SERVER_URL,
  });
  return api(url, headers)
    .then((res) => res.data)
    .catch((error) => Promise.reject(error.response?.data?.message ?? "Error"));
}
