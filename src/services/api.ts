import axios from "axios";

export const tiktokApi = axios.create({
  baseURL: "https://sandbox-ads.tiktok.com/open_api/v1.3",
  headers: {
    "Access-Token": process.env.TIKTOK_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});
