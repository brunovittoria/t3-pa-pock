import { z } from "zod";
import { publicProcedure, router, tiktokApi } from "../trpc";
import { AxiosError } from "axios";

export const audienceRouter = router({
  getAudienceInsights: publicProcedure
    .input(
      z.object({
        advertiserId: z.string(),
        audienceType: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await tiktokApi.get(`/dmp/custom_audience/list/`, {
          params: {
            advertiser_id: input.advertiserId,
            audience_type: input.audienceType,
          },
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ?? "Failed to fetch audience insights"
          );
        }
        throw error;
      }
    }),
}); 