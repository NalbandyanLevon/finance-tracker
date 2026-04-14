import z from "zod";

export const createTransactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(["income", "expense"]),
  category_id: z.string().uuid(),
});
