import { z } from "zod";
import { MANDALIS } from "./bhajan-mandalis";

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number."),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email address.")]),
  mandali: z
    .string()
    .refine(
      (value) => MANDALIS.some((m) => m.slug === value),
      "Choose your Bhajan Mandali or City Samithi group.",
    ),
  category: z.enum(["Devotee", "Active Sevadal", "Balvikas Guru"]),
  locality: z.string().trim().min(2, "Enter your locality.").max(150),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Please allow the Samithi to contact you about your registration.",
    }),
  }),
});
export type Registration = z.infer<typeof registrationSchema>;
export function makeDemoReceipt(data: Registration) {
  return {
    id: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    submittedAt: new Date().toISOString(),
    ...data,
  };
}
export const SHEET_COLUMNS = [
  "Registration ID",
  "Submitted At",
  "Full Name",
  "Mobile",
  "Email",
  "Mandali / Group",
  "Category",
  "Locality",
  "Contact Consent",
];
