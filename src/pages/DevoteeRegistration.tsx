import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardList,
  FileSpreadsheet,
  Heart,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";
import { MANDALIS } from "@/lib/bhajan-mandalis";
import { makeDemoReceipt, registrationSchema, type Registration } from "@/lib/devotee-registration";
import { shrine1 } from "@/lib/site-images";

type Receipt = ReturnType<typeof makeDemoReceipt>;
const empty = {
  name: "",
  phone: "",
  email: "",
  mandali: "",
  category: "Devotee" as Registration["category"],
  locality: "",
  consent: false,
};
const input =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 aria-invalid:border-destructive";
const primary =
  "inline-flex items-center justify-center gap-2 rounded-full gradient-saffron px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/15 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function DevoteeRegistrationPage() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  function update(key: keyof typeof empty, value: string | boolean) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = registrationSchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      requestAnimationFrame(() =>
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    setReceipt(makeDemoReceipt(result.data));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const field = (
    key: "name" | "phone" | "email" | "locality",
    label: string,
    placeholder: string,
    required = true,
  ) => (
    <div>
      <label htmlFor={key} className="text-sm font-medium">
        {label}
        {required && (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={key}
        name={key}
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={key === "phone" ? 10 : key === "locality" ? 150 : 100}
        type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
        inputMode={key === "phone" ? "numeric" : undefined}
        autoComplete={
          key === "name"
            ? "name"
            : key === "phone"
              ? "tel-national"
              : key === "email"
                ? "email"
                : "address-level2"
        }
        className={input}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
      />
      {errors[key] && (
        <p id={`${key}-error`} className="mt-1.5 text-xs text-destructive">
          {errors[key]}
        </p>
      )}
    </div>
  );
  return (
    <div className="pb-16">
      <section className="relative overflow-hidden border-b border-border bg-primary/5">
        <div className="absolute inset-0 opacity-[0.07]">
          <img src={shrine1} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-3 py-1.5 text-xs font-medium text-primary">
            <UserRoundPlus className="h-4 w-4" />
            Our spiritual family
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-6xl">
            Devotee <span className="text-gradient">Registrations</span>
          </h1>
          <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
            A simple step towards devotion, connection and service. Tell us a little about yourself
            and become part of the Premsadan family.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div
          role="note"
          className="my-7 flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm"
        >
          <FileSpreadsheet className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="leading-6">
            <strong className="font-semibold">Demo preview</strong> · Google Sheet connection is
            pending. Use sample details to try the form. Nothing is sent or saved to Google Sheets;
            entered details remain only on this page until you refresh or leave.
          </p>
        </div>
        {receipt ? (
          <section
            aria-live="polite"
            className="rounded-3xl border border-border bg-card p-7 text-center shadow-sm sm:p-10"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-9 w-9" />
            </span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary">
              Registration preview complete
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Thank you, {receipt.name}!</h2>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-muted-foreground">
              This is how the confirmation will appear after registration. This demo has not
              submitted your details to the Samithi or Google Sheets.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                className={primary}
                onClick={() => {
                  setReceipt(null);
                  setForm(empty);
                  setErrors({});
                }}
              >
                Try another registration <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <form
              noValidate
              onSubmit={submit}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <ClipboardList className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-display text-2xl font-semibold">Your registration details</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Fields marked * are required.
                  </p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {field("name", "Full name", "e.g. Sai Kumar")}
                {field("phone", "Mobile number", "10-digit Indian mobile number")}
                {field("email", "Email address", "you@example.com", false)}
                {field("locality", "Locality / area", "e.g. MVP Colony")}
                <div className="sm:col-span-2">
                  <label htmlFor="mandali" className="text-sm font-medium">
                    Bhajan Mandali / group <span className="text-primary">*</span>
                  </label>
                  <select
                    id="mandali"
                    required
                    value={form.mandali}
                    onChange={(e) => update("mandali", e.target.value)}
                    className={input}
                    aria-invalid={!!errors.mandali}
                    aria-describedby={errors.mandali ? "mandali-error" : undefined}
                  >
                    <option value="">Select your Mandali or City Samithi group</option>
                    {MANDALIS.map((m) => (
                      <option key={m.slug} value={m.slug}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                  {errors.mandali && (
                    <p id="mandali-error" className="mt-1.5 text-xs text-destructive">
                      {errors.mandali}
                    </p>
                  )}
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className="text-sm font-medium">
                    Register as <span className="text-primary">*</span>
                  </legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {(["Devotee", "Active Sevadal", "Balvikas Guru"] as const).map((category) => (
                      <label
                        key={category}
                        className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm transition ${form.category === category ? "border-primary bg-primary/5 text-primary" : "border-border"}`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={form.category === category}
                          onChange={() => update("category", category)}
                          className="accent-primary"
                        />
                        {category}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
              <label className="mt-7 flex items-start gap-3 text-sm leading-6">
                <input
                  id="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-primary"
                  aria-invalid={!!errors.consent}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                />
                <span>
                  I agree that the Samithi may use my registration details to contact me about
                  spiritual and seva activities. <span className="text-primary">*</span>
                </span>
              </label>
              {errors.consent && (
                <p id="consent-error" className="mt-1.5 text-xs text-destructive">
                  {errors.consent}
                </p>
              )}
              <button type="submit" className={`${primary} mt-7 w-full`}>
                Preview registration <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Demo only · No data is transmitted
              </p>
            </form>
            <aside className="space-y-5">
              <div className="rounded-3xl border border-border bg-card p-7">
                <Heart className="h-7 w-7 text-primary" />
                <h2 className="mt-4 font-display text-2xl font-semibold">
                  One family. Many ways to serve.
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Join as a devotee, offer your time as an active sevadal, or share human values as
                  a Balvikas Guru.
                </p>
                <div className="mt-5 space-y-3">
                  {[
                    "Choose your local Mandali",
                    "Share your contact details",
                    "Stay connected with the Samithi",
                  ].map((t) => (
                    <p key={t} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      {t}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-primary/20 bg-primary/5 p-7">
                <ShieldCheck className="h-7 w-7 text-primary" />
                <h3 className="mt-3 font-semibold">Shared with care</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  The completed connection will send registrations to the Samithi’s designated
                  Google Sheet. Registration details will not appear in a public list on this site.
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Need help? Contact us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
