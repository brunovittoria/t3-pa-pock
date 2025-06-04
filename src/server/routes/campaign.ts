import { z } from "zod";
import { publicProcedure, router, tiktokApi } from "../trpc";
import { AxiosError } from "axios";

export const campaignRouter = router({
  getCampaigns: publicProcedure
    .input(
      z.object({
        advertiserId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await tiktokApi.get(`/campaign/get/`, {
          params: {
            advertiser_id: input.advertiserId,
          },
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ?? "Failed to fetch campaigns"
          );
        }
        throw error;
      }
    }),
}); 