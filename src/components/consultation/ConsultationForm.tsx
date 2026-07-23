"use client";

import { useId, useRef, useState, type ChangeEvent, type FocusEvent } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import { Chevron } from "@/components/ui/Chevron";
import {
  consultationObjectSchema,
  consultationSchema,
  HELP_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  EMPTY_FORM,
  type ConsultationFormValues,
} from "@/lib/validation";

type FieldName = keyof ConsultationFormValues;
type Status = "idle" | "submitting" | "success" | "error";

const inputBase =
  "w-full min-h-11 rounded-sm border bg-cliq-white px-4 py-2.5 text-[0.95rem] text-cliq-black transition-colors duration-200 ease-brand placeholder:text-cliq-silver focus-visible:outline-none";

function fieldBorder(hasError: boolean) {
  return hasError
    ? "border-rose-400 focus-visible:shadow-[0_0_0_3px_rgba(244,63,94,0.15)]"
    : "border-cliq-light-grey focus-visible:border-cliq-purple focus-visible:shadow-[0_0_0_3px_rgba(106,53,255,0.15)]";
}

function ErrorMessage({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm text-rose-600">
      <AlertCircle size={15} className="mt-0.5 shrink-0" />
      {message}
    </p>
  );
}

export function ConsultationForm() {
  const [values, setValues] = useState<ConsultationFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const idPrefix = useId();

  function validateField(field: FieldName, allValues: ConsultationFormValues) {
    if (field === "phone") {
      // Cross-field rule: only required when contactMethod is "call".
      const result = consultationSchema.safeParse(allValues);
      if (!result.success) {
        const issue = result.error.issues.find((i) => i.path[0] === "phone");
        setErrors((prev) => ({ ...prev, phone: issue?.message }));
      } else {
        setErrors((prev) => ({ ...prev, phone: undefined }));
      }
      return;
    }
    const shape = consultationObjectSchema.shape as Record<string, { safeParse: (v: unknown) => { success: boolean; error?: { issues: { message: string }[] } } }>;
    const fieldSchema = shape[field];
    if (!fieldSchema) return;
    const result = fieldSchema.safeParse(allValues[field]);
    setErrors((prev) => ({
      ...prev,
      [field]: result.success ? undefined : result.error?.issues[0]?.message,
    }));
  }

  function handleChange(field: FieldName) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: e.target.value };
      setValues(next);
      if (touched[field]) validateField(field, next);
      if (field === "contactMethod" && touched.phone) validateField("phone", next);
    };
  }

  function handleBlur(field: FieldName) {
    return (_e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, values);
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = consultationSchema.safeParse(values);
    if (!result.success) {
      const nextErrors: Partial<Record<FieldName, string>> = {};
      const nextTouched: Partial<Record<FieldName, boolean>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as FieldName;
        nextErrors[key] = nextErrors[key] ?? issue.message;
        nextTouched[key] = true;
      }
      setErrors(nextErrors);
      setTouched((prev) => ({ ...prev, ...nextTouched }));
      const firstInvalid = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong sending your request.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong sending your request. Please try again, or email us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-cliq-light-grey bg-cliq-white p-10 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-[#F0FBF4] text-emerald-600">
          <CheckCircle2 size={28} strokeWidth={1.75} />
        </span>
        <h3 className="font-display text-2xl font-bold">Thanks, that&apos;s in.</h3>
        <p className="max-w-[42ch] text-[0.95rem] text-cliq-slate">
          A senior consultant will respond within 24 hours, not a rotating
          account manager. In the meantime, feel free to look through our
          work.
        </p>
        <Button href="/#case-studies" variant="ghost-light" showChevron className="mt-2">
          See our work
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {status === "error" && serverError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          <AlertCircle size={17} className="mt-0.5 shrink-0" />
          {serverError}
        </div>
      )}

      {/* Honeypot — hidden from real users, visible to naive bots */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Website</label>
        <input
          id={`${idPrefix}-website`}
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={values.company_website}
          onChange={handleChange("company_website")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="mb-1.5 block text-sm font-medium">
            Name <span className="text-cliq-purple">*</span>
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange("name")}
            onBlur={handleBlur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
            className={`${inputBase} ${fieldBorder(!!errors.name)}`}
          />
          <ErrorMessage id={`${idPrefix}-name-error`} message={errors.name} />
        </div>

        <div>
          <label htmlFor={`${idPrefix}-email`} className="mb-1.5 block text-sm font-medium">
            Email <span className="text-cliq-purple">*</span>
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange("email")}
            onBlur={handleBlur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            className={`${inputBase} ${fieldBorder(!!errors.email)}`}
          />
          <ErrorMessage id={`${idPrefix}-email-error`} message={errors.email} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-company`} className="mb-1.5 block text-sm font-medium">
            Company <span className="text-cliq-purple">*</span>
          </label>
          <input
            id={`${idPrefix}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={handleChange("company")}
            onBlur={handleBlur("company")}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? `${idPrefix}-company-error` : undefined}
            className={`${inputBase} ${fieldBorder(!!errors.company)}`}
          />
          <ErrorMessage id={`${idPrefix}-company-error`} message={errors.company} />
        </div>

        <div>
          <label htmlFor={`${idPrefix}-size`} className="mb-1.5 block text-sm font-medium">
            Company size
          </label>
          <select
            id={`${idPrefix}-size`}
            value={values.companySize}
            onChange={handleChange("companySize")}
            className={`${inputBase} ${fieldBorder(false)}`}
          >
            <option value="">Prefer not to say</option>
            {COMPANY_SIZE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-help`} className="mb-1.5 block text-sm font-medium">
          What do you need help with? <span className="text-cliq-purple">*</span>
        </label>
        <select
          id={`${idPrefix}-help`}
          value={values.helpWith ?? ""}
          onChange={handleChange("helpWith")}
          onBlur={handleBlur("helpWith")}
          aria-invalid={!!errors.helpWith}
          aria-describedby={errors.helpWith ? `${idPrefix}-help-error` : undefined}
          className={`${inputBase} ${fieldBorder(!!errors.helpWith)}`}
        >
          <option value="" disabled>
            Choose one
          </option>
          {HELP_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ErrorMessage id={`${idPrefix}-help-error`} message={errors.helpWith} />
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor={`${idPrefix}-situation`} className="block text-sm font-medium">
            Tell us about your situation <span className="text-cliq-purple">*</span>
          </label>
          <span className="text-xs text-cliq-slate">{values.situation.length}/500</span>
        </div>
        <textarea
          id={`${idPrefix}-situation`}
          name="message"
          rows={4}
          maxLength={500}
          placeholder="What's working, what isn't, and what you're hoping changes."
          value={values.situation}
          onChange={handleChange("situation")}
          onBlur={handleBlur("situation")}
          aria-invalid={!!errors.situation}
          aria-describedby={errors.situation ? `${idPrefix}-situation-error` : undefined}
          className={`${inputBase} resize-none ${fieldBorder(!!errors.situation)}`}
        />
        <ErrorMessage id={`${idPrefix}-situation-error`} message={errors.situation} />
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium">
          Preferred contact method <span className="text-cliq-purple">*</span>
        </legend>
        <div className="flex gap-6">
          {(["email", "call"] as const).map((method) => (
            <label key={method} className="flex items-center gap-2 text-sm capitalize">
              <input
                type="radio"
                name={`${idPrefix}-contact`}
                value={method}
                checked={values.contactMethod === method}
                onChange={handleChange("contactMethod")}
                onBlur={handleBlur("contactMethod")}
                className="size-4 accent-[#6A35FF]"
              />
              {method}
            </label>
          ))}
        </div>
        <ErrorMessage id={`${idPrefix}-contact-error`} message={errors.contactMethod} />
      </fieldset>

      {values.contactMethod === "call" && (
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="mb-1.5 block text-sm font-medium">
            Phone number <span className="text-cliq-purple">*</span>
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={handleChange("phone")}
            onBlur={handleBlur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined}
            className={`${inputBase} ${fieldBorder(!!errors.phone)}`}
          />
          <ErrorMessage id={`${idPrefix}-phone-error`} message={errors.phone} />
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="mt-2 w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader className="size-4" />
            Submitting
          </>
        ) : (
          <>
            Book your session
            <Chevron className="size-3" strokeWidth={2.5} />
          </>
        )}
      </Button>
    </form>
  );
}
