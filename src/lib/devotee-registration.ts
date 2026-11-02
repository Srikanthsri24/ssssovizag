import { z } from "zod";

export const GENDERS = ["Female", "Male", "Other", "Prefer not to say"] as const;
export function validBirthDate(dob: string, ageText: string, today = new Date()) {
  if (!/^\d{2}\/\d{2}\/\d{2}$/.test(dob) || !/^\d{1,3}$/.test(ageText)) return false;
  const [day, month, shortYear] = dob.split("/").map(Number);
  const age = Number(ageText);
  if (age < 0 || age > 120) return false;
  return [today.getFullYear() - age, today.getFullYear() - age - 1].some((year) => {
    if (year % 100 !== shortYear) return false;
    const birth = new Date(year, month - 1, day);
    if (
      birth.getFullYear() !== year ||
      birth.getMonth() !== month - 1 ||
      birth.getDate() !== day ||
      birth > today
    )
      return false;
    const actualAge =
      today.getFullYear() -
      year -
      (today.getMonth() < month - 1 || (today.getMonth() === month - 1 && today.getDate() < day)
        ? 1
        : 0);
    return actualAge === age;
  });
}
export const registrationSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your full name.").max(100),
    gender: z.enum(GENDERS, { errorMap: () => ({ message: "Select your gender." }) }),
    age: z
      .string()
      .trim()
      .regex(/^\d{1,3}$/, "Enter your age in completed years.")
      .refine((value) => Number(value) <= 120, "Enter an age between 0 and 120."),
    dob: z
      .string()
      .trim()
      .regex(/^\d{2}\/\d{2}\/\d{2}$/, "Enter date of birth as dd/mm/yy."),
    email: z.union([
      z.literal(""),
      z.string().trim().email("Enter a valid email address.").max(150),
    ]),
    education: z.string().trim().max(200),
    profession: z.string().trim().max(200),
    skills: z.string().trim().max(1000),
  })
  .superRefine((data, ctx) => {
    if (!validBirthDate(data.dob, data.age))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dob"],
        message: "Enter a valid date of birth in dd/mm/yy format that matches your age.",
      });
  });
export type Registration = z.infer<typeof registrationSchema>;
export const registrationEndpoint = import.meta.env.VITE_REGISTRATION_ENDPOINT?.trim() || "";
export async function sendRegistration(data: Registration, submissionId: string) {
  if (
    !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(registrationEndpoint)
  )
    throw new Error("Registration connection is not configured.");
  const response = await fetch(registrationEndpoint, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ ...data, submissionId }),
    redirect: "follow",
    signal: AbortSignal.timeout(45000),
  });
  const result = await response.json();
  if (!response.ok || result.ok !== true || result.submissionId !== submissionId)
    throw new Error(result.error || "We could not confirm your registration. Please try again.");
}
