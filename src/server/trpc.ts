import { initTRPC } from "@trpc/server";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { advertiserRouter } from "./routes/advertiser";
import { campaignRouter } from "./routes/campaign";
import { adGroupRouter } from "./routes/adGroup";
import { adRouter } from "./routes/ad";
import { creativeRouter } from "./routes/creative";
import { audienceRouter } from "./routes/audience";
import { businessCenterRouter } from "./routes/businessCenter";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const tiktokApi = axios.create({
  baseURL: "https://sandbox-ads.tiktok.com/open_api/v1.3",
  headers: {
    "Access-Token": process.env.TIKTOK_ACCESS_TOKEN,
    "Content-Type": "application/json",
  },
});

export const appRouter = router({
  advertiser: advertiserRouter,
  campaign: campaignRouter,
  adGroup: adGroupRouter,
  ad: adRouter,
  creative: creativeRouter,
  audience: audienceRouter,
  businessCenter: businessCenterRouter,
});

export type AppRouter = typeof appRouter; 