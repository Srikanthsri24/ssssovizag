import {
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  HandHeart,
  Heart,
  Mail,
  MessageCircle,
  Music2,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";

import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { QuoteBanner } from "@/components/shared/QuoteBanner";
import volunteers from "@/assets/seva-volunteers.jpg";

type VolunteerArea =
  | "education"
  | "healthcare"
  | "welfare"
  | "spiritual";

type ContactMethod = "phone" | "whatsapp" | "email";

type VolunteerForm = {
  name: string;
  email: string;
  phone: string;
  area: VolunteerArea;
  availability: string;
  preferredContact: ContactMethod;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof VolunteerForm, string>>;

type AreaOption = {
  value: VolunteerArea;
  title: string;
  description: string;
  icon: LucideIcon;
};

type ContactOption = {
  value: ContactMethod;
  label: string;
  description: string;
  icon: LucideIcon;
};

const INITIAL_FORM: VolunteerForm = {
  name: "",
  email: "",
  phone: "",
  area: "welfare",
  availability: "",
  preferredContact: "phone",
  message: "",
  consent: false,
};

const STEPS = [
  {
    number: 1,
    title: "Your details",
    mobileTitle: "Details",
  },
  {
    number: 2,
    title: "Choose seva",
    mobileTitle: "Seva",
  },
  {
    number: 3,
    title: "Availability",
    mobileTitle: "Schedule",
  },
  {
    number: 4,
    title: "Review",
    mobileTitle: "Review",
  },
];

const AREA_OPTIONS: AreaOption[] = [
  {
    value: "education",
    title: "Education",
    description:
      "Support students through learning activities, mentoring and academic guidance.",
    icon: BookOpen,
  },
  {
    value: "healthcare",
    title: "Healthcare",
    description:
      "Participate in medical camps, health awareness and patient assistance.",
    icon: Stethoscope,
  },
  {
    value: "welfare",
    title: "Welfare",
    description:
      "Help with food distribution, community outreach and support activities.",
    icon: HandHeart,
  },
  {
    value: "spiritual",
    title: "Spiritual",
    description:
      "Support bhajans, mandir programmes and spiritual service activities.",
    icon: Music2,
  },
];

const AVAILABILITY_OPTIONS = [
  {
    value: "Weekday mornings",
    title: "Weekday mornings",
    description: "Monday to Friday, before afternoon",
  },
  {
    value: "Weekday evenings",
    title: "Weekday evenings",
    description: "Monday to Friday, after work hours",
  },
  {
    value: "Weekends",
    title: "Weekends",
    description: "Saturday and Sunday activities",
  },
  {
    value: "Flexible",
    title: "Flexible",
    description: "Availability depends on the activity",
  },
];

const CONTACT_OPTIONS: ContactOption[] = [
  {
    value: "phone",
    label: "Phone call",
    description: "The coordinator will call your number.",
    icon: Phone,
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    description: "Receive activity information on WhatsApp.",
    icon: MessageCircle,
  },
  {
    value: "email",
    label: "Email",
    description: "Receive registration details by email.",
    icon: Mail,
  },
];

const INPUT_CLASS =
  "h-14 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none transition duration-200 placeholder:text-muted-foreground/60 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10";

export function VolunteerPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<VolunteerForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedArea =
    AREA_OPTIONS.find((option) => option.value === form.area) ??
    AREA_OPTIONS[2];

  const selectedContact =
    CONTACT_OPTIONS.find(
      (option) => option.value === form.preferredContact,
    ) ?? CONTACT_OPTIONS[0];

  useEffect(() => {
    if (!isSubmitted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isSubmitted]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isSubmitted) {
        setIsSubmitted(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSubmitted]);

  function updateField<K extends keyof VolunteerForm>(
    field: K,
    value: VolunteerForm[K],
  ) {
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
  }

  function validateStep(currentStep: number) {
    const nextErrors: FormErrors = {};

    if (currentStep === 1) {
      const phoneDigits = form.phone.replace(/\D/g, "");

      if (form.name.trim().length < 2) {
        nextErrors.name = "Please enter your full name.";
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        nextErrors.email = "Please enter a valid email address.";
      }

      if (phoneDigits.length < 10 || phoneDigits.length > 13) {
        nextErrors.phone = "Please enter a valid phone number.";
      }
    }

    if (currentStep === 3 && !form.availability) {
      nextErrors.availability = "Please select your availability.";
    }

    if (currentStep === 4 && !form.consent) {
      nextErrors.consent =
        "Please allow our coordinator to contact you.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) {
      toast.error("Please complete the required information.");
      return;
    }

    setStep((current) => Math.min(current + 1, STEPS.length));
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(current - 1, 1));
  }

  function goToPreviousStep(targetStep: number) {
    if (targetStep >= step) return;

    setErrors({});
    setStep(targetStep);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < STEPS.length) {
      goNext();
      return;
    }

    submit(event);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateStep(4)) {
      toast.error("Please accept the contact permission.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace this delay with your real API request.
      await new Promise((resolve) => window.setTimeout(resolve, 800));

      setIsSubmitted(true);

      toast.success(
        "Your volunteer registration was submitted successfully. 🙏",
      );
    } catch {
      toast.error(
        "Unable to submit your registration. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function closeSuccessPopup() {
    setIsSubmitted(false);
  }

  function resetForm() {
    setForm(INITIAL_FORM);
    setErrors({});
    setStep(1);
    setIsSubmitting(false);
    setIsSubmitted(false);
  }

  return (
    <main className="overflow-hidden">
      <PageHero
        eyebrow="Volunteer With Us"
        title="Be the hands of seva"
        subtitle="A simple registration journey to connect your time and skills with meaningful service."
        image={volunteers}
        quote="The best way to find yourself is to lose yourself in the service of others."
      />

      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-32 bottom-16 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto mb-9 max-w-3xl text-center lg:mb-11">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary">
                <Sparkles className="h-4 w-4" />
                Volunteer registration
              </div>

              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                Find the right seva opportunity
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                Complete four simple steps and review your information
                before submitting your registration.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <RegistrationProgress
              currentStep={step}
              onStepClick={goToPreviousStep}
            />
          </Reveal>

          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-9">
            <Reveal>
              <form
                onSubmit={handleFormSubmit}
                className="min-w-0 overflow-hidden rounded-[30px] border border-border bg-card shadow-xl"
                noValidate
              >
                <FormHeader step={step} />

                <div className="min-h-[450px] p-5 sm:p-7 lg:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`volunteer-step-${step}`}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{
                        duration: 0.23,
                        ease: "easeOut",
                      }}
                    >
                      {step === 1 && (
                        <PersonalDetailsStep
                          form={form}
                          errors={errors}
                          updateField={updateField}
                        />
                      )}

                      {step === 2 && (
                        <SevaSelectionStep
                          selectedArea={form.area}
                          onSelect={(area) =>
                            updateField("area", area)
                          }
                        />
                      )}

                      {step === 3 && (
                        <AvailabilityStep
                          form={form}
                          errors={errors}
                          updateField={updateField}
                        />
                      )}

                      {step === 4 && (
                        <ReviewStep
                          form={form}
                          selectedArea={selectedArea}
                          selectedContact={selectedContact}
                          errors={errors}
                          updateField={updateField}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <FormNavigation
                  step={step}
                  isSubmitting={isSubmitting}
                  onBack={goBack}
                  onNext={goNext}
                />
              </form>
            </Reveal>

            <Reveal delay={0.1}>
              <RegistrationSidebar
                form={form}
                selectedArea={selectedArea}
                selectedContact={selectedContact}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isSubmitted && (
          <SuccessPopup
            onClose={closeSuccessPopup}
            onReset={resetForm}
          />
        )}
      </AnimatePresence>

      <QuoteBanner text="Service to man is service to God." />
    </main>
  );
}

function RegistrationProgress({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="mb-8 rounded-3xl border border-border bg-card p-3 shadow-sm sm:p-5">
      <div className="relative grid grid-cols-4">
        <div className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-border sm:block" />

        <motion.div
          className="absolute left-[12.5%] top-5 hidden h-px bg-primary sm:block"
          initial={false}
          animate={{
            width: `${((currentStep - 1) / 3) * 75}%`,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        />

        {STEPS.map((item) => {
          const isActive = currentStep === item.number;
          const isCompleted = currentStep > item.number;
          const canClick = item.number < currentStep;

          return (
            <button
              key={item.number}
              type="button"
              onClick={() => onStepClick(item.number)}
              disabled={!canClick}
              className="relative z-10 flex min-w-0 flex-col items-center text-center disabled:cursor-default"
            >
              <span
                className={[
                  "grid h-10 w-10 place-items-center rounded-full border text-sm font-bold transition duration-300",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isActive
                      ? "border-primary bg-background text-primary ring-4 ring-primary/10"
                      : "border-border bg-background text-muted-foreground",
                ].join(" ")}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  item.number
                )}
              </span>

              <span
                className={[
                  "mt-2 hidden text-xs font-semibold sm:block",
                  isActive || isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {item.title}
              </span>

              <span
                className={[
                  "mt-2 text-[10px] font-semibold sm:hidden",
                  isActive || isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground",
                ].join(" ")}
              >
                {item.mobileTitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FormHeader({ step }: { step: number }) {
  return (
    <div className="border-b border-border bg-gradient-to-br from-primary/[0.08] via-card to-orange-500/[0.05] px-5 py-6 sm:px-8 sm:py-7">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20">
          {step}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Step {step} of {STEPS.length}
          </p>

          <h3 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">
            {getStepTitle(step)}
          </h3>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {getStepDescription(step)}
          </p>
        </div>
      </div>
    </div>
  );
}

function FormNavigation({
  step,
  isSubmitting,
  onBack,
  onNext,
}: {
  step: number;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/20 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <button
        type="button"
        onClick={onBack}
        disabled={step === 1}
        className={[
          "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold transition",
          step === 1
            ? "pointer-events-none invisible"
            : "hover:border-primary hover:text-primary",
        ].join(" ")}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {step < 4 ? (
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </motion.button>
      ) : (
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={!isSubmitting ? { y: -2 } : undefined}
          whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Submitting
            </>
          ) : (
            <>
              Submit registration
              <Send className="h-4 w-4" />
            </>
          )}
        </motion.button>
      )}
    </div>
  );
}

function PersonalDetailsStep({
  form,
  errors,
  updateField,
}: {
  form: VolunteerForm;
  errors: FormErrors;
  updateField: <K extends keyof VolunteerForm>(
    field: K,
    value: VolunteerForm[K],
  ) => void;
}) {
  return (
    <div className="grid gap-x-6 gap-y-5 md:grid-cols-2">
      <Field
        id="volunteer-name"
        label="Full name"
        description="Enter your complete name"
        icon={UserRound}
        error={errors.name}
      >
        <input
          id="volunteer-name"
          type="text"
          value={form.name}
          onChange={(event) =>
            updateField("name", event.target.value)
          }
          placeholder="Enter your full name"
          autoComplete="name"
          maxLength={100}
          className={INPUT_CLASS}
          aria-invalid={Boolean(errors.name)}
        />
      </Field>

      <Field
        id="volunteer-phone"
        label="Phone number"
        description="Enter an active contact number"
        icon={Phone}
        error={errors.phone}
      >
        <input
          id="volunteer-phone"
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={(event) =>
            updateField("phone", event.target.value)
          }
          placeholder="+91 98765 43210"
          autoComplete="tel"
          maxLength={20}
          className={INPUT_CLASS}
          aria-invalid={Boolean(errors.phone)}
        />
      </Field>

      <div className="md:col-span-2">
        <Field
          id="volunteer-email"
          label="Email address"
          description="Volunteer activity information may be sent here"
          icon={Mail}
          error={errors.email}
        >
          <input
            id="volunteer-email"
            type="email"
            value={form.email}
            onChange={(event) =>
              updateField("email", event.target.value)
            }
            placeholder="you@example.com"
            autoComplete="email"
            maxLength={255}
            className={INPUT_CLASS}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>
      </div>

      <div className="md:col-span-2">
        <div className="flex items-start gap-3 rounded-2xl border border-border bg-muted/20 p-4">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-semibold">
              Your details are protected
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              This information will only be used for volunteer
              coordination and seva activity communication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SevaSelectionStep({
  selectedArea,
  onSelect,
}: {
  selectedArea: VolunteerArea;
  onSelect: (area: VolunteerArea) => void;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {AREA_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isSelected = selectedArea === option.value;

        return (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => onSelect(option.value)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.985 }}
            aria-pressed={isSelected}
            className={[
              "group relative flex min-h-[185px] flex-col items-start rounded-[24px] border p-5 text-left transition duration-200",
              isSelected
                ? "border-primary bg-primary/[0.07] shadow-md ring-1 ring-primary/20"
                : "border-border bg-background hover:border-primary/40 hover:shadow-md",
            ].join(" ")}
          >
            <div
              className={[
                "grid h-12 w-12 place-items-center rounded-2xl transition",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
              ].join(" ")}
            >
              <Icon className="h-6 w-6" />
            </div>

            <h4 className="mt-5 font-display text-xl font-semibold">
              {option.title}
            </h4>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {option.description}
            </p>

            <span
              className={[
                "absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full border transition",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background",
              ].join(" ")}
            >
              {isSelected && <Check className="h-3.5 w-3.5" />}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

function AvailabilityStep({
  form,
  errors,
  updateField,
}: {
  form: VolunteerForm;
  errors: FormErrors;
  updateField: <K extends keyof VolunteerForm>(
    field: K,
    value: VolunteerForm[K],
  ) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <div className="mb-5">
          <h4 className="font-display text-xl font-semibold">
            When can you participate?
          </h4>

          <p className="mt-1 text-sm text-muted-foreground">
            Select your general availability for seva activities.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {AVAILABILITY_OPTIONS.map((option) => {
            const isSelected =
              form.availability === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  updateField("availability", option.value)
                }
                aria-pressed={isSelected}
                className={[
                  "flex min-h-[96px] items-start gap-3 rounded-2xl border p-4 text-left transition",
                  isSelected
                    ? "border-primary bg-primary/[0.07] shadow-sm ring-1 ring-primary/20"
                    : "border-border bg-background hover:border-primary/40",
                ].join(" ")}
              >
                <div
                  className={[
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  ].join(" ")}
                >
                  <Clock3 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {option.title}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {errors.availability && (
          <p className="mt-3 text-xs font-medium text-destructive">
            {errors.availability}
          </p>
        )}
      </div>

      <div className="border-t border-border pt-8">
        <div className="mb-5">
          <h4 className="font-display text-xl font-semibold">
            Preferred contact method
          </h4>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose how our coordinator should contact you.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {CONTACT_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected =
              form.preferredContact === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() =>
                  updateField("preferredContact", option.value)
                }
                aria-pressed={isSelected}
                className={[
                  "min-h-[145px] rounded-2xl border p-4 text-left transition",
                  isSelected
                    ? "border-primary bg-primary/[0.07] ring-1 ring-primary/20"
                    : "border-border bg-background hover:border-primary/40",
                ].join(" ")}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={[
                      "grid h-10 w-10 place-items-center rounded-xl",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {isSelected && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </div>

                <p className="mt-4 text-sm font-semibold">
                  {option.label}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ReviewStep({
  form,
  selectedArea,
  selectedContact,
  errors,
  updateField,
}: {
  form: VolunteerForm;
  selectedArea: AreaOption;
  selectedContact: ContactOption;
  errors: FormErrors;
  updateField: <K extends keyof VolunteerForm>(
    field: K,
    value: VolunteerForm[K],
  ) => void;
}) {
  const AreaIcon = selectedArea.icon;
  const ContactIcon = selectedContact.icon;

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <ReviewItem
          icon={UserRound}
          label="Volunteer"
          value={form.name}
        />

        <ReviewItem
          icon={Phone}
          label="Phone number"
          value={form.phone}
        />

        <ReviewItem
          icon={Mail}
          label="Email address"
          value={form.email}
        />

        <ReviewItem
          icon={AreaIcon}
          label="Seva area"
          value={selectedArea.title}
        />

        <ReviewItem
          icon={CalendarDays}
          label="Availability"
          value={form.availability}
        />

        <ReviewItem
          icon={ContactIcon}
          label="Contact preference"
          value={selectedContact.label}
        />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label
            htmlFor="volunteer-message"
            className="text-sm font-semibold"
          >
            Additional message
          </label>

          <span className="text-[11px] text-muted-foreground">
            {form.message.length}/600
          </span>
        </div>

        <textarea
          id="volunteer-message"
          value={form.message}
          onChange={(event) =>
            updateField("message", event.target.value)
          }
          rows={5}
          maxLength={600}
          placeholder="Share your skills, interests or any additional information..."
          className="min-h-[135px] w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
      </div>

      <div
        className={[
          "rounded-2xl border p-4 transition",
          errors.consent
            ? "border-destructive/50 bg-destructive/5"
            : "border-border bg-muted/20",
        ].join(" ")}
      >
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(event) =>
              updateField("consent", event.target.checked)
            }
            className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-primary"
          />

          <span>
            <span className="block text-sm font-medium">
              I agree to be contacted by the volunteer coordinator.
            </span>

            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              Your information will only be used for seva
              coordination and related communication.
            </span>
          </span>
        </label>

        {errors.consent && (
          <p className="ml-7 mt-2 text-xs font-medium text-destructive">
            {errors.consent}
          </p>
        )}
      </div>
    </div>
  );
}

function RegistrationSidebar({
  form,
  selectedArea,
  selectedContact,
}: {
  form: VolunteerForm;
  selectedArea: AreaOption;
  selectedContact: ContactOption;
}) {
  return (
    <aside className="space-y-5 lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-[28px] border border-border bg-card shadow-lg">
        <div className="relative h-44 overflow-hidden">
          <img
            src={volunteers}
            alt="Volunteers serving the community"
            loading="lazy"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-xs font-medium text-white/70">
              Your seva journey
            </p>

            <h3 className="mt-1 font-display text-xl font-semibold">
              Registration summary
            </h3>
          </div>
        </div>

        <div className="space-y-1 p-4">
          <SummaryRow
            icon={UserRound}
            label="Volunteer"
            value={form.name || "Not entered"}
            completed={Boolean(form.name)}
          />

          <SummaryRow
            icon={selectedArea.icon}
            label="Seva area"
            value={selectedArea.title}
            completed
          />

          <SummaryRow
            icon={CalendarDays}
            label="Availability"
            value={form.availability || "Not selected"}
            completed={Boolean(form.availability)}
          />

          <SummaryRow
            icon={selectedContact.icon}
            label="Contact through"
            value={selectedContact.label}
            completed
          />
        </div>
      </div>

      <div className="rounded-[26px] border border-border bg-primary/[0.06] p-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <h4 className="text-sm font-semibold">
              Your information is safe
            </h4>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Your details will only be used for volunteer
              coordination and seva activity updates.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[26px] border border-border bg-card p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <Heart className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="font-display text-lg font-semibold">
              Love in action is seva.
            </p>

            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Every hour offered with love can bring comfort and
              happiness to many lives.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Field({
  id,
  label,
  description,
  icon: Icon,
  error,
  children,
}: {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="block min-w-0">
      <label htmlFor={id} className="mb-2 flex min-h-[48px] items-start gap-3 cursor-pointer">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>

        <div>
          <span className="block text-sm font-semibold">
            {label}
          </span>

          <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
            {description}
          </span>
        </div>
      </label>

      {children}

      <span className="mt-1.5 block min-h-5 text-xs font-medium text-destructive">
        {error || ""}
      </span>
    </div>
  );
}

function SummaryRow({
  icon: Icon,
  label,
  value,
  completed,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl px-2 py-3">
      <div
        className={[
          "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
          completed
            ? "bg-primary/10 text-primary"
            : "bg-muted text-muted-foreground",
        ].join(" ")}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted-foreground">
          {label}
        </p>

        <p
          className={[
            "truncate text-sm font-semibold",
            completed
              ? "text-foreground"
              : "text-muted-foreground",
          ].join(" ")}
        >
          {value}
        </p>
      </div>

      {completed && (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
      )}
    </div>
  );
}

function ReviewItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-h-[82px] items-center gap-3 rounded-2xl border border-border bg-background p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground">
          {label}
        </p>

        <p className="truncate text-sm font-semibold">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function SuccessPopup({
  onClose,
  onReset,
}: {
  onClose: () => void;
  onReset: () => void;
}) {
  return (
    <motion.div
      key="success-popup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-popup-title"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.88,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.92,
          y: 20,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 22,
        }}
       className="relative max-h-[calc(100vh-32px)] w-full max-w-[590px] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[30px] border border-border bg-card shadow-2xl sm:max-h-[calc(100vh-48px)] sm:rounded-[36px]"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close success message"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-sm backdrop-blur-md transition hover:border-primary hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative px-5 py-10 text-center sm:px-10 sm:py-12">
          <motion.div
            initial={{
              scale: 0.4,
              rotate: -15,
            }}
            animate={{
              scale: 1,
              rotate: 0,
            }}
            transition={{
              delay: 0.1,
              type: "spring",
              stiffness: 220,
              damping: 14,
            }}
            className="relative mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/25 sm:h-24 sm:w-24"
          >
            <CheckCircle2 className="h-9 w-9 sm:h-11 sm:w-11" />

            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.38,
                type: "spring",
              }}
              className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full border-4 border-card bg-emerald-500 text-white"
            >
              <Check className="h-3.5 w-3.5" />
            </motion.span>
          </motion.div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Registration submitted
          </p>

          <h2
            id="success-popup-title"
            className="mx-auto mt-4 max-w-md font-display text-2xl font-semibold leading-tight text-foreground sm:text-4xl"
          >
            Thank you for becoming part of seva.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
            Your registration has been received successfully. Our
            volunteer coordinator will contact you using your selected
            communication method.
          </p>

          <div className="mx-auto mt-6 flex max-w-md items-center gap-3 rounded-2xl border border-border bg-muted/30 p-4 text-left">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Heart className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                Love in action is seva
              </p>

              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                Thank you for offering your time and compassion.
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-semibold transition hover:border-primary hover:text-primary"
            >
              Close
            </button>

            <motion.button
              type="button"
              onClick={onReset}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-xl"
            >
              Register another volunteer
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function getStepTitle(step: number) {
  switch (step) {
    case 1:
      return "Tell us about yourself";

    case 2:
      return "Where would you like to serve?";

    case 3:
      return "Choose your availability";

    case 4:
      return "Review your registration";

    default:
      return "";
  }
}

function getStepDescription(step: number) {
  switch (step) {
    case 1:
      return "Enter your contact information so our coordinator can reach you.";

    case 2:
      return "Select the seva area that best matches your interest.";

    case 3:
      return "Choose when you are available and how you prefer to be contacted.";

    case 4:
      return "Check your details and add any final information before submitting.";

    default:
      return "";
  }
}