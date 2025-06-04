import { z } from "zod";
import { publicProcedure, router, tiktokApi } from "../trpc";
import { AxiosError } from "axios";

export const creativeRouter = router({
    getCreativeAssets: publicProcedure
    .input(
      z.object({
        advertiserId: z.string(),
        assetType: z.string().optional(),
        pageSize: z.number().optional(),
        page: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await tiktokApi.get(`/file/image/ad/search/`, {
          params: {
            advertiser_id: input.advertiserId,
            asset_type: input.assetType,
            page_size: input.pageSize,
            page: input.page,
          },
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message || "Failed to fetch creative assets"
          );
        }
        throw error;
      }
    }),
}); 