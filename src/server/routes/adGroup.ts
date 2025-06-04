import { z } from "zod";
import { publicProcedure, router, tiktokApi } from "../trpc";
import { AxiosError } from "axios";

export const adGroupRouter = router({
  getAdGroups: publicProcedure
    .input(
      z.object({
        advertiserId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await tiktokApi.get(`/adgroup/get/`, {
          params: {
            advertiser_id: input.advertiserId,
          },
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ?? "Failed to fetch ad groups"
          );
        }
        throw error;
      }
    }),
}); 