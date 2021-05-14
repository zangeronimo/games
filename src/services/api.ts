import axios from "axios";

const api = axios.create({
  baseURL: "https://gamesapi.tudolinux.com.br/v1/",
});

export default api;
