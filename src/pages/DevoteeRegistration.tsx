import { useRef, useState, type FormEvent } from "react";
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
import {
  GENDERS,
  COMMUNITY_OPTIONS,
  CITY_GROUPS,
  registrationSchema,
  registrationEndpoint,
  sendRegistration,
  type Registration,
} from "@/lib/devotee-registration";
import { shrine1 } from "@/lib/site-images";

const empty = {
  community: "",
  groups: [] as string[],
  name: "",
  gender: "",
  age: "",
  dob: "",
  email: "",
  education: "",
  profession: "",
  skills: "",
};
const input =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 aria-invalid:border-destructive sm:text-sm disabled:opacity-60";
const primary =
  "inline-flex items-center justify-center gap-2 rounded-full gradient-saffron px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/15 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60";
export function DevoteeRegistrationPage() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [registered, setRegistered] = useState<Registration | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submissionId = useRef(crypto.randomUUID());
  const live = Boolean(registrationEndpoint);
  function update(key: keyof typeof empty, value: string | string[]) {
    setForm((current) => ({
      ...current,
      [key]: value,
      ...(key === "community" ? { groups: [] } : {}),
    }));
    setErrors((current) => ({ ...current, [key]: "", ...(key === "age" ? { dob: "" } : {}) }));
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setSubmitError("");
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
    setSubmitting(true);
    try {
      if (live) await sendRegistration(result.data, submissionId.current);
      setRegistered(result.data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setSubmitError(
        "We could not confirm that your registration was saved. Please retry without changing your details, or contact the Samithi if this continues.",
      );
    } finally {
      setSubmitting(false);
    }
  }
  const field = (
    key: Exclude<keyof typeof empty, "gender" | "skills" | "community" | "groups">,
    label: string,
    placeholder: string,
    required = false,
  ) => (
    <div>
      <label htmlFor={key} className="text-sm font-medium">
        {label}
        {required ? (
          <span className="ml-1 text-primary" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs text-muted-foreground">(optional)</span>
        )}
      </label>
      <input
        id={key}
        name={key}
        value={form[key]}
        onChange={(e) => update(key, e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={submitting}
        type={key === "email" ? "email" : "text"}
        inputMode={key === "age" ? "numeric" : undefined}
        maxLength={
          key === "age" ? 3 : key === "dob" ? 8 : key === "name" ? 100 : key === "email" ? 150 : 200
        }
        autoComplete={
          key === "name" ? "name" : key === "email" ? "email" : key === "dob" ? "bday" : undefined
        }
        className={input}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : key === "dob" ? "dob-help" : undefined}
      />
      {key === "dob" && (
        <p id="dob-help" className="mt-1.5 text-xs text-muted-foreground">
          Day / month / two-digit year, e.g. 15/08/90. Enter your age in completed years.
        </p>
      )}
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
      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8">
        {!live && (
          <div
            role="note"
            className="mb-7 flex gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-4 text-sm"
          >
            <FileSpreadsheet className="h-5 w-5 shrink-0 text-primary" />
            <p>
              <strong>Demo preview</strong> · Registration is not connected. Use sample details;
              nothing is transmitted or saved.
            </p>
          </div>
        )}
        {registered ? (
          <section
            aria-live="polite"
            className="rounded-3xl border border-border bg-card p-7 text-center shadow-sm sm:p-10"
          >
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-9 w-9" />
            </span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary">
              {live ? "Registration complete" : "Registration preview complete"}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              Thank you, {registered.name}!
            </h2>
            <p className="mx-auto mt-4 max-w-lg leading-7 text-muted-foreground">
              {live
                ? "Your registration has been saved. Thank you for joining our spiritual family."
                : "This is a preview only. Your details have not been submitted to the Samithi."}
            </p>
            <button
              className={`${primary} mt-7`}
              onClick={() => {
                submissionId.current = crypto.randomUUID();
                setRegistered(null);
                setForm(empty);
                setErrors({});
              }}
            >
              Try another registration <ArrowRight className="h-4 w-4" />
            </button>
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
                    Bhajan Mandali / City Samithi, name, gender, age and date of birth are required.
                  </p>
                </div>
              </div>
              <div className="mb-7 space-y-5">
                <div>
                  <label htmlFor="community" className="text-sm font-medium">
                    Bhajan Mandali / City Samithi <span className="text-primary">*</span>
                  </label>
                  <select
                    id="community"
                    required
                    aria-invalid={!!errors.community}
                    aria-describedby={errors.community ? "community-error" : undefined}
                    value={form.community}
                    disabled={submitting}
                    onChange={(e) => update("community", e.target.value)}
                    className={input}
                  >
                    <option value="">Select Bhajan Mandali or City Samithi</option>
                    {COMMUNITY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.community && (
                    <p id="community-error" className="mt-1.5 text-xs text-destructive">
                      {errors.community}
                    </p>
                  )}
                </div>
                {form.community === "City Samithi" && (
                  <fieldset className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                    <legend className="px-1 text-sm font-medium">
                      City Samithi groups{" "}
                      <span className="text-xs text-muted-foreground">(optional)</span>
                    </legend>
                    <p className="mb-3 text-xs text-muted-foreground">
                      Select all groups that apply.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {CITY_GROUPS.map((group) => (
                        <label
                          key={group}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-card p-3 text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={form.groups.includes(group)}
                            disabled={submitting}
                            onChange={(e) =>
                              update(
                                "groups",
                                e.target.checked
                                  ? [...form.groups, group]
                                  : form.groups.filter((g) => g !== group),
                              )
                            }
                            className="h-4 w-4 accent-primary"
                          />
                          {group}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                )}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {field("name", "Name", "Your full name", true)}
                <div>
                  <label htmlFor="gender" className="text-sm font-medium">
                    Gender <span className="text-primary">*</span>
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    required
                    disabled={submitting}
                    value={form.gender}
                    onChange={(e) => update("gender", e.target.value)}
                    className={input}
                    aria-invalid={!!errors.gender}
                    aria-describedby={errors.gender ? "gender-error" : undefined}
                  >
                    <option value="">Select gender</option>
                    {GENDERS.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  {errors.gender && (
                    <p id="gender-error" className="mt-1.5 text-xs text-destructive">
                      {errors.gender}
                    </p>
                  )}
                </div>
                {field("age", "Age", "Completed years", true)}
                {field("dob", "Date of Birth", "dd/mm/yy", true)}
                {field("email", "Email ID", "you@example.com")}
                {field(
                  "education",
                  "Highest education qualification",
                  "e.g. Graduate, Postgraduate",
                )}
                {field("profession", "Current profession", "e.g. Teacher, Student, Retired")}
                <div className="sm:col-span-2">
                  <label htmlFor="skills" className="text-sm font-medium">
                    Special skills <span className="text-xs text-muted-foreground">(optional)</span>
                  </label>
                  <textarea
                    id="skills"
                    value={form.skills}
                    onChange={(e) => update("skills", e.target.value)}
                    disabled={submitting}
                    maxLength={1000}
                    rows={3}
                    placeholder="Singing, playing musical instruments, or other skills you would like to share"
                    className={`${input} resize-y`}
                    aria-invalid={!!errors.skills}
                  />
                </div>
              </div>
              <p className="mt-6 text-xs leading-6 text-muted-foreground">
                By submitting, you agree that the Samithi may use these details to maintain its
                devotee register and contact you about spiritual and seva activities. Optional
                details can be left blank.
              </p>
              {submitError && (
                <p role="alert" className="mt-5 text-sm text-destructive">
                  {submitError}
                </p>
              )}
              <button type="submit" disabled={submitting} className={`${primary} mt-6 w-full`}>
                {submitting
                  ? "Saving registration…"
                  : live
                    ? "Submit registration"
                    : "Preview registration"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <aside className="space-y-5">
              <div className="rounded-3xl border border-border bg-card p-7">
                <Heart className="h-7 w-7 text-primary" />
                <h2 className="mt-4 font-display text-2xl font-semibold">
                  One family. Many ways to serve.
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Share your interests and talents, and stay connected with our spiritual family.
                </p>
                <div className="mt-5 space-y-3">
                  {[
                    "Share your basic details",
                    "Add your education and profession if you wish",
                    "Tell us about your special skills",
                  ].map((t) => (
                    <p key={t} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {t}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl border border-primary/20 bg-primary/5 p-7">
                <ShieldCheck className="h-7 w-7 text-primary" />
                <h3 className="mt-3 font-semibold">Shared with care</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Your registration details are shared with the Samithi. They will not appear in a
                  public list on this website.
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
