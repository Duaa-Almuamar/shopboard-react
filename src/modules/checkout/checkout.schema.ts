// Every checkout validation rule and its message
import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.email("Enter a valid email, like name@example.com."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+ ()-]{7,20}$/, "Enter a phone number with 7 to 20 digits."),
  address: z.string().trim().min(5, "Enter your street and building number."),
  city: z.string().trim().min(2, "Enter your city."),
  postalCode: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9 -]{3,10}$/, "Enter a postal code with 3 to 10 characters."),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
