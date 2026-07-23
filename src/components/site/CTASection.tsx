"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, CheckCircle2, Clock } from "lucide-react";

const FOCUS_OPTIONS = [
  "I need more customers",
  "I need a better website",
  "I want to automate my business",
  "I'm not sure where to start",
] as const;

const WHY_CLIQWORX = [
  "Strategy before execution",
  "AI-powered transformation",
  "Performance-focused delivery",
  "Trusted by ambitious businesses",
];

const REASSURANCE = [
  "Free consultation",
  "No obligation",
  "Response within one business day",
  "No spam. Ever.",
];

type Errors = { focus?: string; name?: string; email?: string; phone?: string };

export function CTASection() {
  const [focus, setFocus] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [challenge, setChallenge] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  function validate(): boolean {
    const next: Errors = {};
    if (!focus) next.focus = "Choose the option closest to your goal.";
    if (name.trim().length < 2) next.name = "Please add your name.";
    if (!/.+@.+\..+/.test(email)) next.email = "Please use a valid email address.";
    if (phone.replace(/[^\d]/g, "").length < 7) next.phone = "Please add a valid phone number.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Focus the first invalid control directly; the aria-invalid attribute
      // only lands after React re-renders, so query by field, not attribute.
      const target = next.focus
        ? formRef.current?.querySelector<HTMLElement>("input[name='focus']")
        : next.name
          ? document.getElementById("lead-name")
          : next.email
            ? document.getElementById("lead-email")
            : document.getElementById("lead-phone");
      target?.focus();
      return false;
    }
    return true;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFailed(false);
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, focus, challenge, website }),
      });
      if (!res.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      // Network-level failure only; never show technical detail.
      setFailed(true);
    } finally {
      setSubmitting(false);
    }
  }

  const inputBase =
    "w-full px-4 py-3 rounded-lg text-sm text-white outline-none transition-all duration-200";
  const inputStyle = (hasError: boolean) => ({
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${hasError ? "#FF7A9A" : "rgba(123,47,255,0.15)"}`,
  });

  return (
    <section
      ref={ref}
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: "var(--cw-dark)" }}
    >
      {/* Purple glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(123,47,255,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: value + trust */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:pt-4"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#C4A0FF" }}>
              A strategy session, not a sales pitch.
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Book your free strategy session.
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#A9A9C4" }}>
              Tell us a little about your business and we&apos;ll recommend the best next step. You
              speak with a senior practitioner, whether or not we end up working together.
            </p>
            <p className="flex items-center gap-2 text-sm mb-10" style={{ color: "#8888AA" }}>
              <Clock size={14} style={{ color: "#9B5FFF" }} aria-hidden="true" />
              Takes less than 30 seconds
            </p>

            {/* Trust panel */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(123,47,255,0.14)" }}
            >
              <p className="text-sm font-bold text-white mb-4">Why businesses choose CliqWorx</p>
              <ul className="space-y-3">
                {WHY_CLIQWORX.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(123,47,255,0.18)" }}
                    >
                      <Check size={12} style={{ color: "#C4A0FF" }} aria-hidden="true" />
                    </span>
                    <span className="text-sm" style={{ color: "#A9A9C4" }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className="rounded-2xl p-10 text-center"
                  style={{ background: "rgba(123,47,255,0.12)", border: "1px solid rgba(123,47,255,0.25)" }}
                  role="status"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "#7B2FFF" }}
                  >
                    <CheckCircle2 size={28} color="#FFFFFF" aria-hidden="true" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">Thank you.</h3>
                  <p className="text-sm" style={{ color: "#A9A9C4" }}>
                    We&apos;ll contact you within one business day to arrange your strategy session.
                  </p>
                </motion.div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  className="rounded-2xl p-8 relative"
                  style={{ background: "#12121F", border: "1px solid rgba(123,47,255,0.2)" }}
                >
                  <fieldset className="mb-6">
                    <legend className="text-sm font-semibold text-white mb-4">
                      What do you need help with?
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label="What do you need help with?">
                      {FOCUS_OPTIONS.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-2.5 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 focus-within:ring-2 focus-within:ring-[#9B5FFF]"
                          style={{
                            background: focus === opt ? "rgba(123,47,255,0.2)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${focus === opt ? "#7B2FFF" : "rgba(123,47,255,0.12)"}`,
                          }}
                        >
                          <input
                            type="radio"
                            name="focus"
                            value={opt}
                            checked={focus === opt}
                            className="sr-only"
                            aria-invalid={!!errors.focus}
                            onChange={() => {
                              setFocus(opt);
                              setErrors((prev) => ({ ...prev, focus: undefined }));
                            }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                            style={{ borderColor: focus === opt ? "#7B2FFF" : "#555577" }}
                            aria-hidden="true"
                          >
                            {focus === opt && (
                              <span className="w-2 h-2 rounded-full" style={{ background: "#7B2FFF" }} />
                            )}
                          </span>
                          <span
                            className="text-sm font-medium leading-snug"
                            style={{ color: focus === opt ? "#FFFFFF" : "#A9A9C4" }}
                          >
                            {opt}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.focus && (
                      <p role="alert" className="text-xs mt-2" style={{ color: "#FF9AB4" }}>
                        {errors.focus}
                      </p>
                    )}
                  </fieldset>

                  {/* Honeypot: invisible to real users */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="absolute -left-[9999px] top-auto"
                  />

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="lead-name" className="block text-sm font-medium text-white mb-1.5">
                        Your Name
                      </label>
                      <input
                        id="lead-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="e.g. Tendai Moyo"
                        value={name}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "lead-name-error" : undefined}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        className={`${inputBase} placeholder-[#555577]`}
                        style={inputStyle(!!errors.name)}
                        onFocus={(e) => (e.target.style.borderColor = "#7B2FFF")}
                        onBlur={(e) =>
                          (e.target.style.borderColor = errors.name ? "#FF7A9A" : "rgba(123,47,255,0.15)")
                        }
                      />
                      {errors.name && (
                        <p id="lead-name-error" role="alert" className="text-xs mt-1.5" style={{ color: "#FF9AB4" }}>
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lead-email" className="block text-sm font-medium text-white mb-1.5">
                        Business Email
                      </label>
                      <input
                        id="lead-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={email}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "lead-email-error" : undefined}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        className={`${inputBase} placeholder-[#555577]`}
                        style={inputStyle(!!errors.email)}
                        onFocus={(e) => (e.target.style.borderColor = "#7B2FFF")}
                        onBlur={(e) =>
                          (e.target.style.borderColor = errors.email ? "#FF7A9A" : "rgba(123,47,255,0.15)")
                        }
                      />
                      {errors.email && (
                        <p id="lead-email-error" role="alert" className="text-xs mt-1.5" style={{ color: "#FF9AB4" }}>
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lead-phone" className="block text-sm font-medium text-white mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="lead-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="e.g. 082 123 4567"
                        value={phone}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        className={`${inputBase} placeholder-[#555577]`}
                        style={inputStyle(!!errors.phone)}
                        onFocus={(e) => (e.target.style.borderColor = "#7B2FFF")}
                        onBlur={(e) =>
                          (e.target.style.borderColor = errors.phone ? "#FF7A9A" : "rgba(123,47,255,0.15)")
                        }
                      />
                      {errors.phone && (
                        <p id="lead-phone-error" role="alert" className="text-xs mt-1.5" style={{ color: "#FF9AB4" }}>
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="lead-challenge" className="block text-sm font-medium text-white mb-1.5">
                        What&apos;s your biggest challenge right now?
                      </label>
                      <textarea
                        id="lead-challenge"
                        name="message"
                        rows={3}
                        maxLength={1000}
                        placeholder="e.g. We get traffic but very few enquiries"
                        value={challenge}
                        onChange={(e) => setChallenge(e.target.value)}
                        className={`${inputBase} resize-none placeholder-[#555577]`}
                        style={inputStyle(false)}
                        onFocus={(e) => (e.target.style.borderColor = "#7B2FFF")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(123,47,255,0.15)")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-lg font-bold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(123,47,255,0.35)] disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                      style={{ background: "#7B2FFF" }}
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2">
                          <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                          </svg>
                          Booking your session...
                        </span>
                      ) : (
                        "Book My Free Strategy Session"
                      )}
                    </button>

                    {failed && (
                      <p role="alert" className="text-xs text-center" style={{ color: "#FFB8CB" }}>
                        That didn&apos;t go through. Please try again, or email hello@cliqworx.com and
                        we&apos;ll take it from there.
                      </p>
                    )}
                  </div>

                  {/* Reassurance */}
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mt-5">
                    {REASSURANCE.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check size={12} style={{ color: "#9B5FFF", flexShrink: 0 }} aria-hidden="true" />
                        <span className="text-xs" style={{ color: "#8888AA" }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </form>
              )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
