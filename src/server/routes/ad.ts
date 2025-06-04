import { z } from "zod";
import { publicProcedure, router, tiktokApi } from "../trpc";

export const adRouter = router({
  getAds: publicProcedure
    .input(
      z.object({
        advertiserId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await tiktokApi.get(`/ad/get/`, {
          params: {
            advertiser_id: input.advertiserId,
          },
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ?? "Failed to fetch ads"
          );
        }
        throw error;
      }
    }),
});import { AxiosError } from "axios";
 