import { useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  ExternalLink,
  Heart,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { QuoteBanner } from "@/components/shared/QuoteBanner";
import { Reveal } from "@/components/shared/Reveal";

import { SITE } from "@/lib/site";
import { mandir3 as mandir } from "@/lib/site-images";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  reason: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactForm, string>>;

const INITIAL_FORM: ContactForm = {
  name: "",
  email: "",
  phone: "",
  reason: "General enquiry",
  message: "",
};

const CONTACT_REASONS = [
  "General enquiry",
  "Visit the Mandir",
  "Join Seva activities",
  "Bal Vikas enquiry",
  "Volunteer with us",
];

const inputClassName =
  "w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60";

export function ContactPage() {
  const shouldReduceMotion = useReducedMotion();

  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const hasPhone = Boolean(SITE.phone?.trim());
  const hasEmail = Boolean(SITE.email?.trim());

  const phoneHref = useMemo(() => {
    if (!hasPhone) return undefined;

    return `tel:${SITE.phone.replace(/[^\d+]/g, "")}`;
  }, [hasPhone]);

  const mapHref = useMemo(() => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;
  }, []);

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Please enter at least 2 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (form.phone.trim() && !/^[+\d\s()-]{7,20}$/.test(form.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!form.reason) {
      nextErrors.reason = "Please select a contact reason.";
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = "Please write at least 10 characters.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    if (!hasEmail) {
      toast.error("The Samithi email address is not configured yet.");
      return;
    }

    setSubmitting(true);

    window.setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message prepared! Choose your preferred way to send.");
    }, 400);
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setIsSubmitted(false);
  };

  const copyAddress = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(SITE.address);
      } else {
        const textarea = document.createElement("textarea");

        textarea.value = SITE.address;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        const copied = document.execCommand("copy");

        document.body.removeChild(textarea);

        if (!copied) {
          throw new Error("Copy failed");
        }
      }

      toast.success("Address copied.");
    } catch {
      toast.error("Unable to copy the address.");
    }
  };

  return (
    <div className="overflow-hidden bg-background">
      <PageHero
        eyebrow="Contact"
        title="Reach out to our Samithi"
        subtitle="Connect with us for seva activities, spiritual guidance, Bal Vikas enquiries or a visit to Premsadan Mandir."
        image={mandir}
        quote="The doors of the mandir, like the heart, are always open."
      />

      <section className="relative px-4 py-16 sm:px-6 lg:py-24">
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-[1240px]">
          <Reveal>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Heart className="h-3.5 w-3.5 fill-current" />
                We are here to help
              </div>

              <h2 className="mt-5 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                Visit, call or send us a message
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Our Samithi welcomes everyone with love. Reach out for information about Mandir
                activities, seva opportunities and spiritual programmes.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            {/* Contact information */}
            <div className="space-y-5">
              <Reveal>
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-[2rem] border border-border/70 bg-card p-2 shadow-xl shadow-foreground/5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem]">
                    <motion.img
                      src={mandir}
                      alt="Premsadan Mandir"
                      loading="lazy"
                      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/75">
                        <MapPin className="h-4 w-4" />
                        MVP Colony, Visakhapatnam
                      </div>

                      <h3 className="mt-2 font-display text-2xl font-semibold">Premsadan Mandir</h3>

                      <p className="mt-1 text-sm text-white/75">
                        A spiritual home for prayer, learning and selfless service.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>

              {/* Convenor */}
              <Reveal delay={0.05}>
                <motion.article
                  whileHover={shouldReduceMotion ? undefined : { y: -4 }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-sm transition-all hover:border-primary/25 hover:shadow-lg"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative flex items-start gap-4">
                    <div className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                      <UserRound className="h-6 w-6" />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                        Contact person
                      </p>

                      <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                        {SITE.convenor}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-muted-foreground">{SITE.role}</p>

                      <p className="mt-2 text-sm text-muted-foreground">
                        Premsadan Mandir, MVP Colony
                      </p>
                    </div>
                  </div>
                </motion.article>
              </Reveal>

              {/* Phone and email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Reveal delay={0.08}>
                  <motion.article
                    whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                    className="h-full rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-sm transition-all hover:border-primary/25 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <Phone className="h-5 w-5" />
                      </div>

                      {phoneHref && (
                        <a
                          href={phoneHref}
                          aria-label="Call the Samithi"
                          className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                      Phone
                    </h3>

                    {phoneHref ? (
                      <a
                        href={phoneHref}
                        className="mt-2 block text-sm font-medium text-muted-foreground transition hover:text-primary"
                      >
                        {SITE.phone}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Number will be updated soon.
                      </p>
                    )}
                  </motion.article>
                </Reveal>

                <Reveal delay={0.12}>
                  <motion.article
                    whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                    className="h-full rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-sm transition-all hover:border-primary/25 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <Mail className="h-5 w-5" />
                      </div>

                      {hasEmail && (
                        <a
                          href={`mailto:${SITE.email}`}
                          aria-label="Email the Samithi"
                          className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                      Email
                    </h3>

                    {hasEmail ? (
                      <a
                        href={`mailto:${SITE.email}`}
                        className="mt-2 block break-all text-sm font-medium text-muted-foreground transition hover:text-primary"
                      >
                        {SITE.email}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm text-muted-foreground">
                        Email will be updated soon.
                      </p>
                    )}
                  </motion.article>
                </Reveal>
              </div>

              {/* Address */}
              <Reveal delay={0.14}>
                <article className="rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        Mandir address
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{SITE.address}</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <a
                      href={mapHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                    >
                      <Navigation className="h-4 w-4" />
                      Open in Maps
                    </a>

                    <button
                      type="button"
                      onClick={copyAddress}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:bg-primary/5"
                    >
                      <Copy className="h-4 w-4" />
                      Copy address
                    </button>
                  </div>
                </article>
              </Reveal>

              {/* Timings */}
              <Reveal delay={0.16}>
                <article className="rounded-[1.75rem] border border-primary/15 bg-primary/5 p-6">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-background text-primary shadow-sm">
                      <Clock3 className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        Mandir timings
                      </h3>

                      <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          Daily: 6:00 AM – 8:30 PM
                        </p>

                        <p className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                          Bhajans: Thursday and Sunday, 6:30 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            </div>

            {/* Contact form */}
            <Reveal delay={0.1}>
              <div className="lg:sticky lg:top-28">
                <form
                  onSubmit={submit}
                  noValidate
                  autoComplete="off"
                  className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl shadow-foreground/5"
                >
                  <div className="relative overflow-hidden border-b border-border/70 bg-gradient-to-br from-primary/10 via-card to-orange-500/5 p-6 sm:p-8">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

                    <div className="relative">
                      <div className="grid h-13 w-13 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                        <MessageCircle className="h-6 w-6" />
                      </div>

                      <div className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        Send an enquiry
                      </div>

                      <h3 className="mt-2 font-display text-2xl font-semibold text-foreground sm:text-3xl">
                        How can we help you?
                      </h3>

                      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                        Complete the form and your email application will open with the message
                        prepared for the Samithi.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5 p-6 sm:p-8">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField id="contact-name" label="Your name" required error={errors.name}>
                        <div className="relative">
                          <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <input
                            id="contact-name"
                            type="text"
                            name="premsadan_contact_name"
                            value={form.name}
                            onChange={(event) => updateField("name", event.target.value)}
                            placeholder="Enter your name"
                            autoComplete="name"
                            autoCorrect="off"
                            spellCheck={false}
                            maxLength={100}
                            disabled={submitting}
                            aria-invalid={Boolean(errors.name)}
                            className={`${inputClassName} pl-11`}
                          />
                        </div>
                      </FormField>

                      <FormField
                        id="contact-phone"
                        label="Phone number"
                        hint="Optional"
                        error={errors.phone}
                      >
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                          <input
                            id="contact-phone"
                            type="tel"
                            name="premsadan_contact_phone"
                            value={form.phone}
                            onChange={(event) => updateField("phone", event.target.value)}
                            placeholder="+91"
                            autoComplete="tel"
                            maxLength={20}
                            disabled={submitting}
                            aria-invalid={Boolean(errors.phone)}
                            className={`${inputClassName} pl-11`}
                          />
                        </div>
                      </FormField>
                    </div>

                    <FormField
                      id="contact-email"
                      label="Email address"
                      required
                      error={errors.email}
                    >
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                        <input
                          id="contact-email"
                          type="email"
                          name="premsadan_contact_email"
                          value={form.email}
                          onChange={(event) => updateField("email", event.target.value)}
                          placeholder="you@example.com"
                          autoComplete="email"
                          autoCapitalize="none"
                          autoCorrect="off"
                          spellCheck={false}
                          maxLength={255}
                          disabled={submitting}
                          aria-invalid={Boolean(errors.email)}
                          className={`${inputClassName} pl-11`}
                        />
                      </div>
                    </FormField>

                    <FormField
                      id="contact-reason"
                      label="Reason for contacting"
                      required
                      error={errors.reason}
                    >
                      <select
                        id="contact-reason"
                        name="premsadan_contact_reason"
                        value={form.reason}
                        onChange={(event) => updateField("reason", event.target.value)}
                        disabled={submitting}
                        aria-invalid={Boolean(errors.reason)}
                        className={inputClassName}
                      >
                        {CONTACT_REASONS.map((reason) => (
                          <option key={reason} value={reason}>
                            {reason}
                          </option>
                        ))}
                      </select>
                    </FormField>

                    <FormField
                      id="contact-message"
                      label="Your message"
                      required
                      error={errors.message}
                    >
                      <div className="relative">
                        <textarea
                          id="contact-message"
                          name="premsadan_contact_message"
                          value={form.message}
                          onChange={(event) => updateField("message", event.target.value)}
                          placeholder="Tell us how we can help you..."
                          autoComplete="off"
                          rows={7}
                          maxLength={1000}
                          disabled={submitting}
                          aria-invalid={Boolean(errors.message)}
                          className={`${inputClassName} min-h-44 resize-y pb-10`}
                        />

                        <span className="pointer-events-none absolute bottom-3 right-4 text-xs text-muted-foreground">
                          {form.message.length}/1000
                        </span>
                      </div>
                    </FormField>

                    <div className="rounded-2xl border border-border/70 bg-muted/30 p-4">
                      <p className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        Submitting this form opens your default email application. The website does
                        not store your message.
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={shouldReduceMotion || submitting ? undefined : { y: -2 }}
                      whileTap={shouldReduceMotion || submitting ? undefined : { scale: 0.98 }}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full gradient-saffron px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Preparing message...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          Prepare Email Message
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isSubmitted && (
          <ContactSuccessModal
            form={form}
            onClose={() => setIsSubmitted(false)}
            onReset={resetForm}
          />
        )}
      </AnimatePresence>

      <QuoteBanner text="Love All, Serve All." />
    </div>
  );
}

type FormFieldProps = {
  id?: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
};

function FormField({ id, label, required, hint, error, children }: FormFieldProps) {
  return (
    <div className="block">
      <label
        htmlFor={id}
        className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-foreground cursor-pointer"
      >
        <span>
          {label}

          {required && <span className="ml-1 text-destructive">*</span>}
        </span>

        {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
      </label>

      {children}

      {error && (
        <span role="alert" className="mt-1.5 block text-xs font-medium text-destructive">
          {error}
        </span>
      )}
    </div>
  );
}

function ContactSuccessModal({
  form,
  onClose,
  onReset,
}: {
  form: ContactForm;
  onClose: () => void;
  onReset: () => void;
}) {
  const subject = `${form.reason} — Website enquiry`;
  const emailBody = [
    "Sai Ram,",
    "",
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Phone: ${form.phone.trim() || "Not provided"}`,
    `Enquiry type: ${form.reason}`,
    "",
    "Message:",
    form.message.trim(),
    "",
    "Sent through the Premsadan website.",
  ].join("\n");

  const mailtoUrl = `mailto:${SITE.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(emailBody)}`;

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    SITE.email,
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(emailBody);
      toast.success("Message copied to clipboard!");
    } catch {
      toast.error("Failed to copy message.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-border bg-card p-6 sm:p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition hover:border-primary hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary ring-8 ring-primary/5">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
            Enquiry Prepared
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your message has been prepared for{" "}
            <strong className="text-foreground">{SITE.email}</strong>. Choose how you would like to
            send it:
          </p>

          <div className="mt-6 w-full space-y-3">
            <a
              href={gmailUrl}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:opacity-95"
            >
              <ExternalLink className="h-4 w-4" />
              Send using Gmail in Web Browser
            </a>

            <a
              href={mailtoUrl}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-background px-5 py-3.5 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:bg-primary/5"
            >
              <Mail className="h-4 w-4 text-primary" />
              Send using Default Email App
            </a>

            <button
              type="button"
              onClick={handleCopyMessage}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-muted/40 px-5 py-3 text-sm font-medium text-muted-foreground transition hover:text-foreground hover:bg-muted"
            >
              <Copy className="h-4 w-4" />
              Copy Prepared Message
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between w-full border-t border-border pt-4 text-xs text-muted-foreground">
            <span>Need to make changes?</span>
            <button
              type="button"
              onClick={onReset}
              className="font-semibold text-primary hover:underline"
            >
              Reset and start again
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
