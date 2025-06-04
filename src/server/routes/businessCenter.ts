import { z } from "zod";
import { publicProcedure, router, tiktokApi } from "../trpc";
import { AxiosError } from "axios";

export const businessCenterRouter = router({
  getBusinessCenterList: publicProcedure
    .input(
      z.object({
        bc_id: z.string().optional(),
        page: z.number().optional(),
        page_size: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await tiktokApi.get(`/bc/get/`, {
          params: input,
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ?? "Failed to fetch business center list"
          );
        }
        throw error;
      }
    }),

  getBusinessCenterActivityLog: publicProcedure
    .input(
      z.object({
        bcId: z.string(),
        filtering: z.object({
          start_date: z.string().optional(),
          end_date: z.string().optional(),
          activity_type: z.enum(["ALL", "USER", "ACCOUNT", "ASSET", "BUSINESS"]).optional(),
        }).optional(),
        lang: z.string().optional(),
        sort_field: z.literal("operation_time").optional(),
        sort_type: z.enum(["DESC", "ASC"]).optional(),
        page: z.number().optional(),
        page_size: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await tiktokApi.get(`/changelog/get/`, {
          params: {
            bc_id: input.bcId,
            ...input,
          },
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ?? "Failed to fetch business center activity log"
          );
        }
        throw error;
      }
    }),
}); 