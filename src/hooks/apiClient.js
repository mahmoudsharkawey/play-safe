import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-apisports-key": process.env.NEXT_PUBLIC_APISPORTS_KEY,
  },
});

export default apiClient;


