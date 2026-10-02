"use client";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  ArrowRight,
  ArrowLeft,
  BedDouble,
  Bath,
  Check,
  Minus,
  Plus,
  LockKeyhole,
  House,
  Sparkles,
  KeyRound,
  Phone,
  RotateCcw,
} from "lucide-react";
import { RadioGroup } from "radix-ui";
import { estimate, services, type ServiceId } from "@/lib/content";
const icons = [House, Sparkles, KeyRound];
export function ServiceButton({
  id,
  children,
  className = "",
}: {
  id: ServiceId;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("tidy:service", { detail: id }));
        document
          .getElementById("estimate")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </button>
  );
}
export function QuoteCalculator() {
  const [step, setStep] = useState(0);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [service, setService] = useState<ServiceId>("standard");
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  useEffect(() => {
    const select = (event: Event) => {
      const id = (event as CustomEvent).detail;
      if (services.some((s) => s.id === id)) {
        setService(id);
        setStep(1);
      }
    };
    window.addEventListener("tidy:service", select);
    return () => window.removeEventListener("tidy:service", select);
  }, []);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    heading.current?.focus({ preventScroll: true });
  }, [step]);
  const selected = services.find((s) => s.id === service)!;
  const price = estimate(bedrooms, bathrooms, service);
  function submit(e: FormEvent) {
    e.preventDefault();
    if (lead.name.trim().length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    const digits = lead.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      setError(
        "Please enter a valid phone number with area code (10–15 digits).",
      );
      return;
    }
    setError("");
    setStep(3);
  }
  return (
    <div className="calculator" id="quote-calculator">
      <div className="calc-topline">
        <span>
          <Sparkles size={14} /> YOUR FRESH START
        </span>
        <span>{step < 3 ? `0${step + 1} / 03` : "ALL SET"}</span>
      </div>
      <ol className="calc-steps" aria-label="Estimate progress">
        {["Your home", "Your clean", "Your details"].map((text, i) => (
          <li
            key={text}
            className={step >= i ? "active" : ""}
            aria-current={step === i ? "step" : undefined}
          >
            <span>{step > i ? <Check size={13} /> : i + 1}</span>
            {text}
          </li>
        ))}
      </ol>
      <div className="progress-track">
        <span style={{ width: `${(Math.min(step + 1, 3) / 3) * 100}%` }} />
      </div>
      <div className="calc-body" key={step}>
        {step === 0 && (
          <>
            <span className="step-eyebrow">LET’S MAKE IT PERSONAL</span>
            <h3 ref={heading} tabIndex={-1}>
              Tell us about your home.
            </h3>
            <p className="calc-description">
              Big or small, every home deserves a little love.
            </p>
            <Counter
              label="Bedrooms"
              caption="A studio? Choose 0."
              icon={<BedDouble />}
              value={bedrooms}
              min={0}
              max={8}
              set={setBedrooms}
            />
            <Counter
              label="Bathrooms"
              caption="Count full & half bathrooms."
              icon={<Bath />}
              value={bathrooms}
              min={1}
              max={8}
              set={setBathrooms}
            />
            <button className="btn btn-dark full" onClick={() => setStep(1)}>
              Find my clean <ArrowRight size={17} />
            </button>
            <p className="calc-help">
              More than 8 rooms?{" "}
              <a href="tel:+14327012112">Let’s talk about your space.</a>
            </p>
          </>
        )}
        {step === 1 && (
          <>
            <span className="step-eyebrow">A CLEAN FOR EVERY CHAPTER</span>
            <h3 ref={heading} tabIndex={-1}>
              What feels right for you?
            </h3>
            <p className="calc-description">
              {bedrooms} bedrooms · {bathrooms} bathrooms{" "}
              <button className="inline-link" onClick={() => setStep(0)}>
                Edit
              </button>
            </p>
            <RadioGroup.Root
              className="service-options"
              aria-label="Cleaning service"
              value={service}
              onValueChange={(v) => setService(v as ServiceId)}
            >
              {services.map((s, i) => {
                const Icon = icons[i];
                return (
                  <label
                    key={s.id}
                    className={`service-option ${service === s.id ? "selected" : ""}`}
                  >
                    <Icon size={24} />
                    <span>
                      <strong>{s.name}</strong>
                      <small>{s.short}</small>
                    </span>
                    <RadioGroup.Item
                      value={s.id}
                      aria-label={s.name}
                      className="radio-item"
                    >
                      <RadioGroup.Indicator>
                        <span />
                      </RadioGroup.Indicator>
                    </RadioGroup.Item>
                  </label>
                );
              })}
            </RadioGroup.Root>
            <div className="calc-actions">
              <button className="back-button" onClick={() => setStep(0)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button className="btn btn-dark" onClick={() => setStep(2)}>
                Almost there <ArrowRight size={17} />
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <form onSubmit={submit}>
            <span className="step-eyebrow">ONE LAST LITTLE THING</span>
            <h3 ref={heading} tabIndex={-1}>
              Your estimate is ready.
            </h3>
            <p className="calc-description">
              {selected.name} · {bedrooms} bed · {bathrooms} bath
            </p>
            <label className="form-field">
              Your name
              <input
                name="name"
                required
                autoComplete="name"
                maxLength={80}
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                placeholder="First and last name"
              />
            </label>
            <label className="form-field">
              Email address
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                maxLength={120}
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                placeholder="you@example.com"
              />
            </label>
            <label className="form-field">
              Phone / WhatsApp
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                maxLength={24}
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                placeholder="(432) 555-0123"
              />
            </label>
            <p className="privacy-note">
              <LockKeyhole size={14} /> Your quote, without the spam.
            </p>
            <p className="demo-notice">
              Interactive demo: use sample details. Nothing is sent or saved.
            </p>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <div className="calc-actions">
              <button
                type="button"
                className="back-button"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button className="btn btn-dark" type="submit">
                Reveal my estimate <Sparkles size={16} />
              </button>
            </div>
          </form>
        )}
        {step === 3 && (
          <div className="quote-result" aria-live="polite">
            <span className="success-ring">
              <Check size={26} />
            </span>
            <span className="step-eyebrow">HERE’S TO A FRESH START</span>
            <h3 ref={heading} tabIndex={-1}>
              Looking good, {lead.name.trim().split(" ")[0]}.
            </h3>
            <p className="calc-description">Your sample estimate, per visit</p>
            <div className="estimate-price">
              <small>USD</small>
              <strong>
                ${price.low}
                <span>–</span>${price.high}
              </strong>
            </div>
            <div className="result-summary">
              <span>{selected.name}</span>
              <span>
                {bedrooms} bed · {bathrooms} bath
              </span>
            </div>
            <p className="demo-notice">
              Illustrative pricing, not official TidyUp! rates. The team
              confirms your final quote and availability. No request has been
              sent.
            </p>
            <a className="btn btn-dark full" href="tel:+14327012112">
              Get an official quote <Phone size={16} />
            </a>
            <button
              className="back-button result-back"
              onClick={() => setStep(0)}
            >
              <RotateCcw size={14} /> Adjust my estimate
            </button>
          </div>
        )}
      </div>
      <div className="calc-footer">
        <LockKeyhole size={13} /> No payment. No commitment. Just a fresh start.
      </div>
    </div>
  );
}
function Counter({
  label,
  caption,
  icon,
  value,
  min,
  max,
  set,
}: {
  label: string;
  caption: string;
  icon: ReactNode;
  value: number;
  min: number;
  max: number;
  set: (n: number) => void;
}) {
  return (
    <div className="room-counter">
      <span className="room-icon">{icon}</span>
      <span className="room-label">
        <strong>{label}</strong>
        <small>{caption}</small>
      </span>
      <div className="counter-controls">
        <button
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => set(value - 1)}
        >
          <Minus size={15} />
        </button>
        <output
          aria-label={`Number of ${label.toLowerCase()}`}
          aria-live="polite"
        >
          {value}
        </output>
        <button
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => set(value + 1)}
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}
