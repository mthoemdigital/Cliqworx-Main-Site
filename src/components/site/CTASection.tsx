"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function CTASection() {
  const [interest, setInterest] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  async function submit() {
    setError(null);
    if (!name.trim() || !/.+@.+\..+/.test(email)) {
      setError("Add your name and a valid work email so we can reach you.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, interest: interest || "Not sure yet", website }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#C4A0FF" }}>
              A strategy session, not a sales pitch.
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Thirty minutes. One honest read on where to go next.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#8888AA" }}>
              You speak with a senior practitioner who will give you a straight assessment of your biggest
              constraint and a clear recommendation, whether or not we end up working together.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "No junior account managers in the room",
                "No pitch decks or slide shows",
                "One honest recommendation you can act on",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 size={16} style={{ color: "#7B2FFF", flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "#AAAACC" }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div
                className="rounded-2xl p-10 text-center"
                style={{ background: "rgba(123,47,255,0.12)", border: "1px solid rgba(123,47,255,0.25)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#7B2FFF" }}
                >
                  <CheckCircle2 size={28} color="#FFFFFF" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Request received.</h3>
                <p className="text-sm" style={{ color: "#8888AA" }}>
                  A senior practitioner will reach out within 24 hours to confirm your session.
                </p>
              </div>
            ) : (
              <div
                className="rounded-2xl p-8"
                style={{ background: "#12121F", border: "1px solid rgba(123,47,255,0.2)" }}
              >
                <p className="text-sm font-semibold text-white mb-5">What are you focused on?</p>

                {/* Qualifying radio */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {["Strategy", "Build", "Growth", "Not sure yet"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-all"
                      style={{
                        background: interest === opt ? "rgba(123,47,255,0.2)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${interest === opt ? "#7B2FFF" : "rgba(123,47,255,0.12)"}`,
                      }}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={opt}
                        className="sr-only"
                        onChange={() => setInterest(opt)}
                      />
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: interest === opt ? "#7B2FFF" : "#555577" }}
                      >
                        {interest === opt && (
                          <div className="w-2 h-2 rounded-full" style={{ background: "#7B2FFF" }} />
                        )}
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: interest === opt ? "#FFFFFF" : "#8888AA" }}
                      >
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>

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

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    aria-label="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-[#555577] outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.15)" }}
                    onFocus={(e) => (e.target.style.borderColor = "#7B2FFF")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(123,47,255,0.15)")}
                  />
                  <input
                    type="email"
                    placeholder="Work email"
                    aria-label="Work email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-[#555577] outline-none transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.15)" }}
                    onFocus={(e) => (e.target.style.borderColor = "#7B2FFF")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(123,47,255,0.15)")}
                  />
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="w-full py-3.5 rounded-lg font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: "#7B2FFF" }}
                  >
                    {submitting ? "Sending..." : "Book a Consultation"}
                  </button>
                  {error && (
                    <p role="alert" className="text-xs" style={{ color: "#FF7A9A" }}>
                      {error}
                    </p>
                  )}
                </div>

                <p className="text-xs text-center mt-4" style={{ color: "#444466" }}>
                  No spam. No CRM chase sequences. Just a calendar invite.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
