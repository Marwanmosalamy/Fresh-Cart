import * as z from "zod";

export const checkoutSchema = z.object({
  details: z.string().nonempty("details is required"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "invalid phone number")
    .nonempty("phone is required"),
  city: z.string().nonempty("city is required"),
});

export type checkoutSchemaType = z.infer<typeof checkoutSchema>;
