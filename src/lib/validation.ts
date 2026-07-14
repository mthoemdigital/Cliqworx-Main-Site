import { z } from "zod";

export const HELP_OPTIONS = [
  { value: "strategy", label: "Strategy" },
  { value: "technology", label: "Technology" },
  { value: "growth", label: "Growth" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const COMPANY_SIZE_OPTIONS = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "200+", label: "200+" },
] as const;

export const consultationFields = {
  name: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email address"),
  company: z.string().trim().min(2, "Enter your company name"),
  helpWith: z.enum(["strategy", "technology", "growth", "not-sure"], {
    message: "Choose what you need help with",
  }),
  companySize: z.enum(["1-10", "11-50", "51-200", "200+", ""]).optional(),
  situation: z
    .string()
    .trim()
    .min(20, "Tell us a little more, at least 20 characters")
    .max(500, "Keep it under 500 characters"),
  contactMethod: z.enum(["email", "call"], { message: "Choose how we should reach you" }),
  phone: z.string().trim().optional(),
  // Honeypot: must stay empty. Real users never see or fill this field.
  company_website: z.string().max(0, "Spam check failed").optional().or(z.literal("")),
};

/** Base object schema, without the cross-field phone rule. Used for per-field (onBlur) checks via .pick(). */
export const consultationObjectSchema = z.object(consultationFields);

/** Full schema used on submit, including the "phone required if contactMethod is call" rule. */
export const consultationSchema = consultationObjectSchema.refine(
  (data) => data.contactMethod !== "call" || (data.phone && data.phone.trim().length >= 7),
  { message: "Enter a phone number so we can call you", path: ["phone"] }
);

export type ConsultationFormValues = z.infer<typeof consultationSchema>;

export const EMPTY_FORM: ConsultationFormValues = {
  name: "",
  email: "",
  company: "",
  helpWith: undefined as unknown as ConsultationFormValues["helpWith"],
  companySize: "",
  situation: "",
  contactMethod: undefined as unknown as ConsultationFormValues["contactMethod"],
  phone: "",
  company_website: "",
};
