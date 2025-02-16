import { z } from "zod";

export const formSchema = z
  .object({
    name: z.string().min(1, "Please enter a valid name"),
    number: z.string().min(1, "Please enter a valid bot number"),
    description: z.string().min(1, "Please enter a valid bot number"),
    phone: z.string()
      .min(8, { message: "Please enter a valid phone" })
      .refine((value) => /[0-9]/.test(value), {
        message: "Atleast 8 number is required",
      }),
    status: z.boolean(),
  });

export type IBotCreateSchema = z.infer<typeof formSchema>;

export const defaultValuesBot = {
  name: "Finance Advisor",
  number: "BOT-1004",
  description: "Offers financial tips and investment advice.",
  phone: "55667788",
  status: false,
};
