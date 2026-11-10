import { z } from "zod";
import { MANDALIS } from "./bhajan-mandalis";
export const COMMUNITY_OPTIONS = [...MANDALIS.slice(0, 10).map((m) => m.name), "City Samithi"];
export const CITY_GROUPS = [
  "Devotee",
  "Singers Group",
  "Balvikas Group",
  "Youth Wing",
  "Sevadal",
  "Spiritual Wing",
] as const;

export const GENDERS = ["Female", "Male", "Other", "Prefer not to say"] as const;
export function calculateAge(dob: string, today = new Date()): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return "";
  const [year, month, day] = dob.split("-").map(Number);
  const birth = new Date(year, month - 1, day);
  const todayParts = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(today);
  const part = (type: string) => Number(todayParts.find((p) => p.type === type)?.value);
  const y = part("year"), m = part("month"), d = part("day");
  const age = y - year - (m < month || (m === month && d < day) ? 1 : 0);
  if (birth.getFullYear() !== year || birth.getMonth() !== month - 1 || birth.getDate() !== day || dob > `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}` || age < 0 || age > 120) return "";
  return String(age);
}
export function validBirthDate(dob: string, ageText: string, today = new Date()) {
  return calculateAge(dob, today) !== "" && calculateAge(dob, today) === ageText;
}
export function todayISO() {
  const parts = new Intl.DateTimeFormat("en-CA", {timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date());
  const part = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}
export const registrationSchema = z
  .object({
    community: z
      .string()
      .refine(
        (value) => COMMUNITY_OPTIONS.includes(value),
        "Select a valid Mandali or City Samithi.",
      ),
    groups: z.array(z.enum(CITY_GROUPS)).max(CITY_GROUPS.length),
    contact: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9."),
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
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Select your date of birth."),
    email: z
      .string()
      .trim()
      .max(150)
      .refine((value) => value === "" || z.string().email().safeParse(value).success, "Enter a valid email address."),
    education: z.string().trim().max(200),
    profession: z.string().trim().max(200),
    skills: z
      .string()
      .trim()
      .max(1000),
  })
  .superRefine((data, ctx) => {
    if (data.community === "City Samithi" && !data.groups.length)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["groups"],
        message: "Select at least one City Samithi group.",
      });
    if (data.community !== "City Samithi" && data.groups.length)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["groups"],
        message: "Groups apply to City Samithi only.",
      });
    if (!validBirthDate(data.dob, data.age))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["dob"],
        message: "Select a valid date of birth. Age is calculated automatically.",
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
