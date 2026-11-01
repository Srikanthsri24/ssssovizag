import { useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeIndianRupee,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  HandHeart,
  Heart,
  IndianRupee,
  Landmark,
  LockKeyhole,
  Mail,
  Phone,
  QrCode,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  User,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
import { toast } from "sonner";

type PurposeId =
  | "education"
  | "healthcare"
  | "welfare"
  | "general";

type PaymentMethod =
  | "upi"
  | "card"
  | "netbanking";

type DonatePageProps = {
  initialPurpose?: string;
};

type DonorForm = {
  name: string;
  email: string;
  phone: string;
  pan: string;
};

type DonorField = keyof DonorForm;

type Purpose = {
  id: PurposeId;
  label: string;
  description: string;
  impact: string;
  Icon: LucideIcon;
};

type PaymentOption = {
  id: PaymentMethod;
  label: string;
  description: string;
  Icon: LucideIcon;
};

const AMOUNTS = [500, 1000, 2500, 5000, 10000];

const PURPOSES: Purpose[] = [
  {
    id: "education",
    label: "Education & Bal Vikas",
    description:
      "Support value-based education, learning materials and Bal Vikas activities.",
    impact:
      "Helps children learn with values, confidence and discipline.",
    Icon: GraduationCap,
  },
  {
    id: "healthcare",
    label: "Medical Camps",
    description:
      "Support free medical camps, screenings and healthcare assistance.",
    impact:
      "Helps bring essential healthcare closer to families in need.",
    Icon: Stethoscope,
  },
  {
    id: "welfare",
    label: "Narayana Seva",
    description:
      "Support food distribution, essential supplies and community welfare.",
    impact:
      "Helps serve nutritious meals and compassionate community care.",
    Icon: HandHeart,
  },
  {
    id: "general",
    label: "General Seva Fund",
    description:
      "Allow the Samithi to use your offering where support is needed most.",
    impact:
      "Provides flexible support across education, healthcare and welfare activities.",
    Icon: Heart,
  },
];

const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: "upi",
    label: "UPI / QR",
    description:
      "Pay securely through any supported UPI application.",
    Icon: QrCode,
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description:
      "Use Visa, Mastercard, RuPay or another supported card.",
    Icon: CreditCard,
  },
  {
    id: "netbanking",
    label: "Net Banking",
    description:
      "Complete your offering through your bank account.",
    Icon: Landmark,
  },
];

const STEPS = [
  { number: 1, title: "Offering" },
  { number: 2, title: "Your Details" },
  { number: 3, title: "Review" },
];

function normalizePurpose(value?: string): PurposeId {
  const matchedPurpose = PURPOSES.find(
    (purpose) => purpose.id === value,
  );

  return matchedPurpose?.id ?? "general";
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function DonatePage({
  initialPurpose,
}: DonatePageProps) {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [purpose, setPurpose] = useState<PurposeId>(() =>
    normalizePurpose(initialPurpose),
  );
  const [presetAmount, setPresetAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [form, setForm] = useState<DonorForm>({
    name: "",
    email: "",
    phone: "",
    pan: "",
  });
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<DonorField, boolean>>
  >({});
  const [method, setMethod] =
    useState<PaymentMethod>("upi");
  const [needsReceipt, setNeedsReceipt] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState("");

  const selectedPurpose =
    PURPOSES.find((item) => item.id === purpose) ??
    PURPOSES[3];

  const selectedPaymentMethod =
    PAYMENT_METHODS.find((item) => item.id === method) ??
    PAYMENT_METHODS[0];

  const SelectedPurposeIcon = selectedPurpose.Icon;

  const finalAmount = useMemo(() => {
    const parsedCustomAmount = Number(customAmount);

    if (
      customAmount &&
      Number.isFinite(parsedCustomAmount)
    ) {
      return parsedCustomAmount;
    }

    return presetAmount;
  }, [customAmount, presetAmount]);

const donorErrors = useMemo<
    Partial<Record<DonorField, string>>
  >(() => {
    const errors: Partial<Record<DonorField, string>> =
      {};

    if (form.name.trim().length < 2) {
      errors.name = "Please enter your full name.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim(),
      )
    ) {
      errors.email = "Enter a valid email address.";
    }

    const cleanPhone = form.phone.replace(/\D/g, "");

    if (form.phone && cleanPhone.length !== 10) {
      errors.phone =
        "Enter a valid 10-digit mobile number.";
    }

    // PAN validation removed completely

    return errors;
  }, [form]);
  useEffect(() => {
    if (!showSuccess) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const redirectTimer = window.setTimeout(() => {
      navigate({
        to: "/",
        replace: true,
      });
    }, 10000);

    return () => {
      window.clearTimeout(redirectTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [navigate, showSuccess]);

  const updateForm = (
    field: DonorField,
    value: string,
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const markFieldTouched = (field: DonorField) => {
    setTouchedFields((currentFields) => ({
      ...currentFields,
      [field]: true,
    }));
  };

  const selectPresetAmount = (value: number) => {
    setPresetAmount(value);
    setCustomAmount("");
  };

  const validateOffering = () => {
    if (
      !Number.isFinite(finalAmount) ||
      finalAmount < 100
    ) {
      toast.error(
        "Please enter an amount of at least ₹100.",
      );
      return false;
    }

    if (finalAmount > 10000000) {
      toast.error(
        "Please contact the Samithi directly for offerings above ₹1 crore.",
      );
      return false;
    }

    return true;
  };

  const validateDonorDetails = () => {
    if (Object.keys(donorErrors).length > 0) {
      setTouchedFields({
        name: true,
        email: true,
        phone: true,
        // pan: true,
      });

      toast.error(
        "Please check the highlighted fields.",
      );
      return false;
    }

    return true;
  };

  const continueToNextStep = () => {
    if (currentStep === 1 && !validateOffering()) {
      return;
    }

    if (
      currentStep === 2 &&
      !validateDonorDetails()
    ) {
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, 3));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const returnToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const goToHomePage = () => {
    navigate({
      to: "/",
      replace: true,
    });
  };

  const submitDonation = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validateOffering()) {
      setCurrentStep(1);
      return;
    }

    if (!validateDonorDetails()) {
      setCurrentStep(2);
      return;
    }

    if (!acceptedTerms) {
      toast.error(
        "Please confirm the donation details before continuing.",
      );
      return;
    }

    const donationPayload = {
      purpose,
      amount: finalAmount,
      donor: form,
      paymentMethod: method,
      receiptRequested: needsReceipt,
    };

    console.log("Donation payload:", donationPayload);

    const generatedReference = `SEVA-${Date.now()
      .toString()
      .slice(-8)}`;

    setReferenceId(generatedReference);
    setShowSuccess(true);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentStep < 3) {
      continueToNextStep();
      return;
    }

    submitDonation(event);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-primary/[0.07] blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.1),transparent_38%)]" />
        </div>

        <div className="relative mx-auto max-w-[1380px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.07] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                A secure offering
              </div>

              <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Your offering becomes{" "}
                <span className="text-gradient">
                  meaningful seva
                </span>
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                Support Bal Vikas, medical camps, Narayana
                Seva and community welfare through a
                transparent and purposeful contribution.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <HeaderInfoCard
                Icon={ShieldCheck}
                title="Protected details"
                text="Secure donation process"
              />
              <HeaderInfoCard
                Icon={ReceiptText}
                title="Digital receipt"
                text="Sent to your email"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto grid max-w-[1380px] gap-7 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start lg:px-8">
        <form
          onSubmit={handleFormSubmit}
          className="min-w-0"
        >
          <div className="overflow-hidden rounded-[2rem] border border-border bg-card/75 shadow-[0_28px_80px_-48px_rgba(15,23,42,0.45)] backdrop-blur-md">
            <ProgressHeader
              currentStep={currentStep}
              onStepClick={(step) => {
                if (step < currentStep) {
                  setCurrentStep(step);
                }
              }}
            />

            <div className="p-5 sm:p-8">
              <AnimatePresence mode="wait" initial={false}>
                {currentStep === 1 && (
                  <motion.div
                    key="offering"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StepHeading
                      step="Step 1 of 3"
                      title="Choose where your offering should serve"
                      description="Select a seva area or allow the Samithi to use your contribution where it is needed most."
                      Icon={Heart}
                    />

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {PURPOSES.map((item) => (
                        <PurposeCard
                          key={item.id}
                          item={item}
                          selected={purpose === item.id}
                          onClick={() => setPurpose(item.id)}
                        />
                      ))}
                    </div>

                    <div className="mt-8 rounded-[1.75rem] border border-border bg-background/45 p-4 shadow-sm sm:p-5">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                            Offering amount
                          </p>
                          <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                            Select an amount in INR
                          </h3>
                        </div>

                        <p className="text-xs text-muted-foreground">
                          Minimum ₹100
                        </p>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
                        {AMOUNTS.map((amountValue) => {
                          const isSelected =
                            presetAmount === amountValue &&
                            !customAmount;

                          return (
                            <motion.button
                              key={amountValue}
                              type="button"
                              onClick={() =>
                                selectPresetAmount(
                                  amountValue,
                                )
                              }
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.97 }}
                              className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                                  : "border-border bg-background/65 text-foreground hover:border-primary/30 hover:bg-primary/[0.05]"
                              }`}
                            >
                              ₹
                              {amountValue.toLocaleString(
                                "en-IN",
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      <div className="relative mt-3">
                        <div className="pointer-events-none absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl bg-primary/10 text-primary">
                          <IndianRupee className="h-4 w-4" />
                        </div>

                        <input
                          value={customAmount}
                          onChange={(event) =>
                            setCustomAmount(
                              event.target.value
                                .replace(/\D/g, "")
                                .slice(0, 8),
                            )
                          }
                          placeholder="Enter a custom amount"
                          inputMode="numeric"
                          maxLength={8}
                          className="h-[54px] w-full rounded-2xl border border-input bg-background pl-14 pr-4 text-sm font-semibold text-foreground outline-none transition placeholder:font-normal placeholder:text-muted-foreground/70 hover:border-primary/25 focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
                        />
                      </div>
                    </div>

                    <motion.div
                      key={selectedPurpose.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-5 flex items-start gap-3 rounded-2xl border border-primary/15 bg-primary/[0.055] p-4"
                    >
                      <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Your offering can create impact
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {selectedPurpose.impact}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StepHeading
                      step="Step 2 of 3"
                      title="Your details"
                      description="Enter your information for acknowledgement and receipt communication."
                      Icon={User}
                    />

                    <div className="mt-7 rounded-[1.75rem] border border-border bg-background/45 p-4 shadow-sm sm:p-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <DonationField
                          field="name"
                          label="Full name"
                          placeholder="Enter your full name"
                          value={form.name}
                          Icon={User}
                          required
                          autoComplete="name"
                          maxLength={100}
                          touched={Boolean(
                            touchedFields.name,
                          )}
                          error={donorErrors.name}
                          onBlur={() =>
                            markFieldTouched("name")
                          }
                          onChange={(value) =>
                            updateForm("name", value)
                          }
                        />

                        <DonationField
                          field="email"
                          label="Email address"
                          placeholder="name@example.com"
                          value={form.email}
                          Icon={Mail}
                          required
                          type="email"
                          autoComplete="email"
                          maxLength={255}
                          touched={Boolean(
                            touchedFields.email,
                          )}
                          error={donorErrors.email}
                          onBlur={() =>
                            markFieldTouched("email")
                          }
                          onChange={(value) =>
                            updateForm("email", value)
                          }
                        />

                        <DonationField
                          field="phone"
                          label="Mobile number"
                          placeholder="Enter 10-digit number"
                          value={form.phone}
                          Icon={Phone}
                          hint="Optional"
                          inputMode="tel"
                          autoComplete="tel"
                          maxLength={10}
                          touched={Boolean(
                            touchedFields.phone,
                          )}
                          error={donorErrors.phone}
                          onBlur={() =>
                            markFieldTouched("phone")
                          }
                          onChange={(value) => {
                            let digits = value.replace(/\D/g, "");
                            if (digits.startsWith("91") && digits.length > 10) {
                              digits = digits.slice(2);
                            } else if (digits.startsWith("0") && digits.length > 10) {
                              digits = digits.slice(1);
                            }
                            updateForm("phone", digits.slice(0, 10));
                          }}
                          prefix="+91"
                        />

                        <DonationField
                          field="pan"
                          label="PAN number"
                          placeholder="ABCDE1234F"
                          value={form.pan}
                          Icon={BadgeIndianRupee}
                          hint="Optional"
                          maxLength={10}
                          touched={Boolean(
                            touchedFields.pan,
                          )}
                          // error={donorErrors.pan}
                          onBlur={() =>
                            markFieldTouched("pan")
                          }
                          onChange={(value) =>
                            updateForm(
                              "pan",
                              value
                                .toUpperCase()
                                .replace(/[^A-Z0-9]/g, "")
                                .slice(0, 10),
                            )
                          }
                        />
                      </div>
                    </div>

                    <ReceiptToggle
                      enabled={needsReceipt}
                      onToggle={() =>
                        setNeedsReceipt(
                          (current) => !current,
                        )
                      }
                    />

                    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-muted/35 px-4 py-3.5">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          Your details are protected
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Information entered here is used
                          only for acknowledgement,
                          communication and receipt
                          processing.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StepHeading
                      step="Step 3 of 3"
                      title="Payment and review"
                      description="Select a payment method and review your offering details."
                      Icon={WalletCards}
                    />

                    <div className="mt-7 grid gap-3">
                      {PAYMENT_METHODS.map(
                        (paymentOption) => (
                          <PaymentMethodCard
                            key={paymentOption.id}
                            option={paymentOption}
                            selected={
                              method === paymentOption.id
                            }
                            onClick={() =>
                              setMethod(paymentOption.id)
                            }
                          />
                        ),
                      )}
                    </div>

                    <div className="mt-7 overflow-hidden rounded-[1.75rem] border border-border bg-background/55">
                      <div className="border-b border-border px-5 py-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          Donation summary
                        </p>
                      </div>

                      <div className="space-y-4 p-5">
                        <SummaryRow
                          label="Purpose"
                          value={selectedPurpose.label}
                        />
                        <SummaryRow
                          label="Amount"
                          value={formatCurrency(finalAmount)}
                          strong
                        />
                        <SummaryRow
                          label="Donor"
                          value={form.name}
                        />
                        <SummaryRow
                          label="Email"
                          value={form.email}
                        />
                        <SummaryRow
                          label="Payment"
                          value={
                            selectedPaymentMethod.label
                          }
                        />
                        <SummaryRow
                          label="Receipt"
                          value={
                            needsReceipt
                              ? "Digital receipt requested"
                              : "Not requested"
                          }
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setAcceptedTerms(
                          (current) => !current,
                        )
                      }
                      className={`mt-5 flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                        acceptedTerms
                          ? "border-primary/30 bg-primary/[0.06]"
                          : "border-border bg-background/50 hover:border-primary/20"
                      }`}
                    >
                      <div
                        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${
                          acceptedTerms
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background"
                        }`}
                      >
                        {acceptedTerms && (
                          <Check className="h-3.5 w-3.5" />
                        )}
                      </div>

                      <p className="text-xs leading-5 text-muted-foreground">
                        I confirm that the donation details
                        entered above are correct and that this
                        offering is being made voluntarily.
                      </p>
                    </button>

                    <div className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-muted/40 p-4">
                      <WalletCards className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <p className="text-xs leading-5 text-muted-foreground">
                        Payment gateway integration will be
                        activated soon. This demo currently
                        sends the details to the Samithi
                        workflow.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <FormNavigation
              currentStep={currentStep}
              onBack={returnToPreviousStep}
              onContinue={continueToNextStep}
            />
          </div>
        </form>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative isolate overflow-hidden rounded-[2rem] border border-primary/20 bg-card/85 p-5 shadow-[0_28px_80px_-48px_rgba(249,115,22,0.5)] backdrop-blur-md sm:p-6"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.14),transparent_42%)]" />

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Your offering
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-foreground">
                  Donation summary
                </h2>
              </div>

              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"
              >
                <Heart className="h-5 w-5 fill-current" />
              </motion.div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-background/65 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <SelectedPurposeIcon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Supporting
                  </p>
                  <p className="truncate font-semibold text-foreground">
                    {selectedPurpose.label}
                  </p>
                </div>
              </div>

              <div className="my-4 h-px bg-border" />

              <div className="flex items-end justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Total amount
                </p>

                <motion.p
                  key={finalAmount}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-display text-3xl font-semibold text-primary"
                >
                  {formatCurrency(finalAmount)}
                </motion.p>
              </div>
            </div>

            <motion.div
              key={selectedPurpose.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-2xl border border-primary/15 bg-primary/[0.055] p-4"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-xs leading-5 text-muted-foreground">
                  {selectedPurpose.impact}
                </p>
              </div>
            </motion.div>

            <div className="mt-5 space-y-3">
              {[
                {
                  Icon: ShieldCheck,
                  title: "Transparent utilisation",
                },
                {
                  Icon: ReceiptText,
                  title: "Digital acknowledgement",
                },
                {
                  Icon: LockKeyhole,
                  title: "Protected donor information",
                },
              ].map(({ Icon, title }) => (
                <div
                  key={title}
                  className="flex items-center gap-3"
                >
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-[1.75rem] gradient-saffron p-6 text-white shadow-xl shadow-primary/20"
          >
            <Banknote className="h-7 w-7" />
            <blockquote className="mt-5 font-display text-xl italic leading-relaxed">
              “Hands that serve are holier than lips that pray.”
            </blockquote>
            <p className="mt-4 text-xs text-white/80">
              — Bhagawan Sri Sathya Sai Baba
            </p>
          </motion.div>

          <div className="rounded-[1.75rem] border border-border bg-card/70 p-5 shadow-sm">
            <Building2 className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
              Need assistance?
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Contact the Premsadan Samithi team for help with
              large contributions, receipts or bank transfer
              details.
            </p>
          </div>
        </aside>
      </main>

      <AnimatePresence>
        {showSuccess && (
          <SuccessModal
            donorName={form.name}
            email={form.email}
            amount={finalAmount}
            purpose={selectedPurpose}
            referenceId={referenceId}
            needsReceipt={needsReceipt}
            onHome={goToHomePage}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

type HeaderInfoCardProps = {
  Icon: LucideIcon;
  title: string;
  text: string;
};

function HeaderInfoCard({
  Icon,
  title,
  text,
}: HeaderInfoCardProps) {
  return (
    <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card/75 px-4 py-3 text-sm text-muted-foreground shadow-sm backdrop-blur">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-xs">{text}</p>
      </div>
    </div>
  );
}

type ProgressHeaderProps = {
  currentStep: number;
  onStepClick: (step: number) => void;
};

function ProgressHeader({
  currentStep,
  onStepClick,
}: ProgressHeaderProps) {
  return (
    <div className="border-b border-border bg-background/55 px-4 py-5 sm:px-8">
      <div className="relative grid grid-cols-3">
        <div className="absolute left-[16%] right-[16%] top-5 h-px bg-border" />

        <motion.div
          className="absolute left-[16%] top-5 h-px bg-primary"
          animate={{
            width:
              currentStep === 1
                ? "0%"
                : currentStep === 2
                  ? "34%"
                  : "68%",
          }}
          transition={{ duration: 0.35 }}
        />

        {STEPS.map((step) => {
          const completed = currentStep > step.number;
          const active = currentStep === step.number;
          const canClick = step.number < currentStep;

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => onStepClick(step.number)}
              disabled={!canClick}
              className="relative z-10 flex flex-col items-center disabled:cursor-default"
            >
              <div
                className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-semibold shadow-sm transition-all duration-300 ${
                  completed
                    ? "border-primary bg-primary text-primary-foreground"
                    : active
                      ? "border-primary bg-background text-primary ring-4 ring-primary/10"
                      : "border-border bg-background text-muted-foreground"
                }`}
              >
                {completed ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.number
                )}
              </div>

              <span
                className={`mt-2 text-center text-[9px] font-semibold uppercase tracking-[0.08em] sm:text-xs sm:tracking-[0.12em] ${
                  active || completed
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

type StepHeadingProps = {
  step: string;
  title: string;
  description: string;
  Icon: LucideIcon;
};

function StepHeading({
  step,
  title,
  description,
  Icon,
}: StepHeadingProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-primary">
          {step}
        </p>
        <h2 className="mt-1 font-display text-2xl font-semibold text-foreground sm:text-3xl">
          {title}
        </h2>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

type PurposeCardProps = {
  item: Purpose;
  selected: boolean;
  onClick: () => void;
};

function PurposeCard({
  item,
  selected,
  onClick,
}: PurposeCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
        selected
          ? "border-primary bg-primary/[0.08] shadow-md ring-1 ring-primary/10"
          : "border-border bg-background/55 hover:border-primary/25 hover:bg-primary/[0.035]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition ${
            selected
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
          }`}
        >
          <item.Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {item.label}
            </h3>

            {selected && (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
            )}
          </div>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

type ReceiptToggleProps = {
  enabled: boolean;
  onToggle: () => void;
};

function ReceiptToggle({
  enabled,
  onToggle,
}: ReceiptToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group mt-5 flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
        enabled
          ? "border-primary/30 bg-primary/[0.065] shadow-sm"
          : "border-border bg-background/50 hover:border-primary/20 hover:bg-primary/[0.03]"
      }`}
    >
      <div
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition ${
          enabled
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary"
        }`}
      >
        <ReceiptText className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-foreground">
            Send me a digital receipt
          </p>

          <div
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
              enabled ? "bg-primary" : "bg-muted"
            }`}
          >
            <motion.span
              animate={{ x: enabled ? 23 : 3 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
              className="absolute top-1 grid h-4 w-4 place-items-center rounded-full bg-white shadow-sm"
            >
              {enabled && (
                <Check className="h-2.5 w-2.5 text-primary" />
              )}
            </motion.span>
          </div>
        </div>

        <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
          The acknowledgement will be sent to your email. PAN
          may be required for an eligible tax receipt,
          subject to applicable registration.
        </p>
      </div>
    </button>
  );
}

type PaymentMethodCardProps = {
  option: PaymentOption;
  selected: boolean;
  onClick: () => void;
};

function PaymentMethodCard({
  option,
  selected,
  onClick,
}: PaymentMethodCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.99 }}
      className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-primary bg-primary/[0.08] shadow-sm"
          : "border-border bg-background/55 hover:border-primary/25"
      }`}
    >
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition ${
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
        }`}
      >
        <option.Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">
          {option.label}
        </p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          {option.description}
        </p>
      </div>

      <div
        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
          selected
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border"
        }`}
      >
        {selected && <Check className="h-3.5 w-3.5" />}
      </div>
    </motion.button>
  );
}

type FormNavigationProps = {
  currentStep: number;
  onBack: () => void;
  onContinue: () => void;
};

function FormNavigation({
  currentStep,
  onBack,
  onContinue,
}: FormNavigationProps) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border bg-background/45 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={onBack}
          className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/30 hover:bg-primary/[0.05]"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back
        </button>
      ) : (
        <div />
      )}

      {currentStep < 3 ? (
        <motion.button
          type="button"
          onClick={onContinue}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:shadow-xl"
        >
          Continue
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </motion.button>
      ) : (
        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full gradient-saffron px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:shadow-xl"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <Heart className="relative h-4 w-4 fill-current" />
          <span className="relative">Complete Offering</span>
          <ArrowRight className="relative h-4 w-4 transition group-hover:translate-x-1" />
        </motion.button>
      )}
    </div>
  );
}

type DonationFieldProps = {
  field: DonorField;
  label: string;
  value: string;
  placeholder: string;
  Icon: LucideIcon;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  hint?: string;
  prefix?: string;
  type?: string;
  maxLength?: number;
  autoComplete?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
};

function DonationField({
  field,
  label,
  value,
  placeholder,
  Icon,
  onChange,
  onBlur,
  error,
  touched = false,
  required = false,
  hint,
  prefix,
  type = "text",
  maxLength,
  autoComplete,
  inputMode,
}: DonationFieldProps) {
  const showError = touched && Boolean(error);
  const isValid =
    touched && value.trim().length > 0 && !error;

  return (
    <div className="group block">
      <label
        htmlFor={`donation-${field}`}
        className="mb-2 flex min-h-5 items-center justify-between gap-3 cursor-pointer"
      >
        <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          {label}
          {required && (
            <span className="text-primary">*</span>
          )}
        </span>

        {hint && (
          <span className="text-[10px] text-muted-foreground">
            {hint}
          </span>
        )}
      </label>

      <div
        className={`relative flex h-[54px] items-center rounded-2xl border bg-background transition-all duration-300 ${
          showError
            ? "border-destructive/60 ring-4 ring-destructive/10"
            : isValid
              ? "border-emerald-500/40 ring-2 ring-emerald-500/5"
              : "border-input hover:border-primary/25 focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10"
        }`}
      >
        <div
          className={`ml-2.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
            showError
              ? "bg-destructive/10 text-destructive"
              : isValid
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-primary/10 text-primary group-focus-within:bg-primary group-focus-within:text-primary-foreground"
          }`}
        >
          <Icon className="h-4 w-4" />
        </div>

        {prefix && (
          <span className="ml-3 border-r border-border pr-3 text-sm font-medium text-muted-foreground">
            {prefix}
          </span>
        )}

        <input
          id={`donation-${field}`}
          name={field}
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={showError}
          aria-describedby={
            showError
              ? `donation-${field}-error`
              : undefined
          }
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/65"
        />

        <AnimatePresence>
          {isValid && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="mr-4 text-emerald-600"
            >
              <CheckCircle2 className="h-4 w-4" />
            </motion.div>
          )}

          {showError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              className="mr-4 text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showError && (
          <motion.p
            id={`donation-${field}-error`}
            initial={{
              opacity: 0,
              y: -4,
              height: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              y: -4,
              height: 0,
            }}
            className="mt-1.5 flex items-center gap-1.5 text-[11px] text-destructive"
          >
            <AlertCircle className="h-3 w-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  strong?: boolean;
};

function SummaryRow({
  label,
  value,
  strong = false,
}: SummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-muted-foreground">
        {label}
      </span>

      <span
        className={`max-w-[65%] break-words text-right ${
          strong
            ? "font-display text-xl font-semibold text-primary"
            : "text-sm font-medium text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

type SuccessModalProps = {
  donorName: string;
  email: string;
  amount: number;
  purpose: Purpose;
  referenceId: string;
  needsReceipt: boolean;
  onHome: () => void;
};

function SuccessModal({
  donorName,
  email,
  amount,
  purpose,
  referenceId,
  needsReceipt,
  onHome,
}: SuccessModalProps) {
  const PurposeIcon = purpose.Icon;
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const countdownTimer = window.setInterval(() => {
      setSecondsLeft((current) =>
        Math.max(current - 1, 0),
      );
    }, 1000);

    return () => {
      window.clearInterval(countdownTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.22,
      }}
      className="fixed inset-0 z-[200] overflow-hidden bg-black/65 p-3 backdrop-blur-md sm:p-5"
    >
      {/* Keeps the card inside every viewport height. */}
      <div className="relative flex min-h-full items-center justify-center">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-[12%] top-[12%] h-52 w-52 rounded-full bg-primary/25 blur-3xl"
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-[10%] right-[10%] h-56 w-56 rounded-full bg-orange-400/20 blur-3xl"
          animate={{
            scale: [1.12, 1, 1.12],
            opacity: [0.5, 0.28, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
        />

        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="donation-success-title"
          aria-describedby="donation-success-description"
          initial={{
            opacity: 0,
            y: 24,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 15,
            scale: 0.97,
          }}
          transition={{
            type: "spring",
            stiffness: 270,
            damping: 25,
          }}
          className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[520px] flex-col overflow-hidden rounded-[1.75rem] border border-white/20 bg-card shadow-[0_35px_120px_-30px_rgba(0,0,0,0.7)] sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-[2.25rem]"
        >
          {/* Compact fixed header */}
          <div className="relative shrink-0 overflow-hidden gradient-saffron px-5 py-5 text-center text-white sm:px-8 sm:py-6">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_42%)]" />

            <motion.div
              aria-hidden
              className="absolute left-5 top-5 text-white/20 sm:left-8 sm:top-6"
              animate={{
                y: [0, -5, 0],
                rotate: [-7, 6, -7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <Sparkles className="h-7 w-7 sm:h-9 sm:w-9" />
            </motion.div>

            <motion.div
              aria-hidden
              className="absolute right-5 top-5 text-white/20 sm:right-8 sm:top-6"
              animate={{
                scale: [1, 1.14, 1],
                rotate: [5, -5, 5],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
              }}
            >
              <Heart className="h-8 w-8 fill-current sm:h-10 sm:w-10" />
            </motion.div>

            <motion.div
              initial={{
                scale: 0,
                rotate: -30,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 17,
                delay: 0.1,
              }}
              className="relative mx-auto grid h-14 w-14 place-items-center rounded-full border-[3px] border-white/35 bg-white text-primary shadow-xl sm:h-16 sm:w-16"
            >
              <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8" />
            </motion.div>

            <motion.p
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.18,
              }}
              className="relative mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-xs"
            >
              Offering details received
            </motion.p>

            <motion.h2
              id="donation-success-title"
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.26,
              }}
              className="relative mx-auto mt-1 max-w-[430px] break-words font-display text-2xl font-semibold leading-tight sm:text-3xl"
            >
              Thank you,{" "}
              {donorName.trim() || "dear devotee"}
            </motion.h2>

            <motion.p
              id="donation-success-description"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.34,
              }}
              className="relative mx-auto mt-2 max-w-sm text-xs leading-5 text-white/85 sm:text-sm sm:leading-6"
            >
              Your loving contribution becomes meaningful
              seva and helps us continue serving the
              community.
            </motion.p>
          </div>

          {/* Only this area scrolls on shorter screens. */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
              }}
              className="rounded-[1.35rem] border border-border bg-background p-4 shadow-lg sm:p-5"
            >
              <div className="flex items-center gap-3 border-b border-border pb-3.5">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary sm:h-11 sm:w-11 sm:rounded-2xl">
                  <PurposeIcon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-[10px]">
                    Supporting
                  </p>

                  <p className="truncate font-display text-base font-semibold text-foreground sm:text-lg">
                    {purpose.label}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-3">
                <div className="min-w-0 rounded-xl bg-muted/50 p-3 sm:rounded-2xl sm:p-3.5">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">
                    Offering
                  </p>

                  <p className="mt-1 truncate font-display text-lg font-semibold text-primary sm:text-xl">
                    {formatCurrency(amount)}
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-muted/50 p-3 sm:rounded-2xl sm:p-3.5">
                  <p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[10px]">
                    Reference
                  </p>

                  <p className="mt-1 truncate text-xs font-semibold text-foreground sm:text-sm">
                    {referenceId}
                  </p>
                </div>
              </div>

              {needsReceipt && (
                <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-primary/15 bg-primary/[0.055] p-3 sm:rounded-2xl sm:p-3.5">
                  <ReceiptText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                  <p className="min-w-0 break-words text-[11px] leading-5 text-muted-foreground sm:text-xs">
                    A digital acknowledgement will be sent
                    to{" "}
                    <span className="font-semibold text-foreground">
                      {email}
                    </span>
                    .
                  </p>
                </div>
              )}
            </motion.div>

            <p className="mt-4 text-center font-display text-xs italic text-muted-foreground sm:text-sm">
              “Hands that serve are holier than lips that
              pray.”
            </p>
          </div>

          {/* Always-visible action footer */}
          <div className="shrink-0 border-t border-border bg-card/95 px-4 py-4 backdrop-blur sm:px-6">
            <div
              aria-live="polite"
              className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground sm:text-xs"
            >
              <span>
                Returning to home in{" "}
                <strong className="text-foreground">
                  {secondsLeft}s
                </strong>
              </span>

              <span className="whitespace-nowrap text-primary">
                Thank you 🙏
              </span>
            </div>

            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{
                  width: "0%",
                }}
                animate={{
                  width: "100%",
                }}
                transition={{
                  duration: 5,
                  ease: "linear",
                }}
                className="h-full rounded-full gradient-saffron"
              />
            </div>

            <motion.button
              type="button"
              onClick={onHome}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="group mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full gradient-saffron px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:shadow-xl sm:min-h-12 sm:px-6 sm:py-3"
            >
              Go to Home Page

              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

