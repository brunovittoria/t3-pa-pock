import { z } from "zod";
import { publicProcedure, router, tiktokApi } from "../trpc";
import { AxiosError } from "axios";

export const advertiserRouter = router({
  getAdAccounts: publicProcedure
    .input(
      z.object({
        advertiserId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await tiktokApi.get(`/advertiser/info/`, {
          params: {
            advertiser_id: input.advertiserId,
          },
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ?? "Failed to fetch ad accounts"
          );
        }
        throw error;
      }
    }),

  getAdAccountBalance: publicProcedure
    .input(
      z.object({
        bcId: z.string(),
        fields: z.array(z.enum([
          "budget_remaining",
          "budget_frequency_restriction",
          "budget_amount_restriction",
          "min_transferable_amount"
        ])).optional(),
        filtering: z.object({
          keyword: z.string().optional(),
          advertiser_status: z.array(z.enum([
            "SHOW_ACCOUNT_STATUS_NOT_APPROVED",
            "SHOW_ACCOUNT_STATUS_APPROVED",
            "SHOW_ACCOUNT_STATUS_IN_REVIEW",
            "SHOW_ACCOUNT_STATUS_PUNISHED"
          ])).optional(),
        }).optional(),
        page: z.number().optional(),
        page_size: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const response = await tiktokApi.get(`/advertiser/balance/get/`, {
          params: {
            bc_id: input.bcId,
            ...input,
          },
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ?? "Failed to fetch ad account balance"
          );
        }
        throw error;
      }
    }),

  createAdAccount: publicProcedure
    .input(
      z.object({
        bc_id: z.string(),
        tied_to_billing_group: z.boolean().optional(),
        advertiser_info: z.object({
          name: z.string(),
          currency: z.string(),
          timezone: z.string(),
          type: z.enum(["RESERVATION", "AUCTION"]).optional(),
        }),
        customer_info: z.object({
          company: z.string(),
          industry: z.number(),
          registered_area: z.string(),
        }),
        qualification_info: z.object({
          promotion_link: z.string(),
          license_no: z.string().optional(),
          license_image_id: z.string().optional(),
          qualification_image_ids: z.array(z.string()).optional(),
        }).optional(),
        contact_info: z.object({
          name: z.string().optional(),
          email: z.string().optional(),
          number: z.string().optional(),
        }),
        billing_info: z.object({
          address: z.string(),
          tax_field_dict: z.object({
            vat: z.string().optional(),
            tax_id: z.string().optional(),
            abn: z.string().optional(),
          }),
        }).optional(),
        billing_group_info: z.object({
          invoice_group_by: z.enum(["ACCOUNT", "ADVERTISER"]),
          billing_group_id: z.string().optional(),
          invoice_payer: z.enum(["AGENCY", "ADVERTISER"]).optional(),
        }).optional(),
        qualification_id: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await tiktokApi.post(`/bc/advertiser/create/`, input);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ?? "Failed to create ad account"
          );
        }
        throw error;
      }
    }),

  updateAdAccount: publicProcedure
    .input(
      z.object({
        advertiser_id: z.string().optional(),
        bc_id: z.string().optional(),
        advertiser_name: z.string().optional(),
        company: z.string().optional(),
        contact_name: z.string().optional(),
        contact_email: z.string().optional(),
        contact_number: z.string().optional(),
        promotion_link: z.string().optional(),
        license_no: z.string().optional(),
        license_image_id: z.string().optional(),
        qualification_images: z.array(z.object({ image_id: z.string() })).optional(),
        address: z.string().optional(),
        tax_map: z.record(z.string()).optional(),
        need_submit_certificate: z.boolean().optional(),
        budget_update_type: z.enum(["UPDATE", "RESET", "INCREMENTAL_UPDATE", "ONE_CLICK_SET"]).optional(),
        advertiser_budgets: z.array(z.object({
          advertiser_id: z.string(),
          budget_mode: z.enum(["UNLIMITED", "MONTHLY_BUDGET", "DAILY_BUDGET", "CUSTOM_BUDGET"]).optional(),
          budget: z.number().optional(),
        })).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const response = await tiktokApi.post(`/advertiser/update/`, input);
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError) {
          throw new Error(
            error.response?.data?.message ?? "Failed to update ad account"
          );
        }
        throw error;
      }
    }),
}); 