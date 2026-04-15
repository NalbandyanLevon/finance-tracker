import z from "zod";

export const createUpdateCategorySchema = z.object({
  name: z.string().min(3),
});
