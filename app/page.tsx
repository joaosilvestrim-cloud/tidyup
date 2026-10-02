import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  House,
  KeyRound,
  MapPin,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Sun,
  Mail,
} from "lucide-react";
import { Header } from "@/components/header";
import { Motion, Mascot, AssistantLink } from "@/components/motion";
import { Assistant } from "@/components/assistant";
import { QuoteCalculator, ServiceButton } from "@/components/quote-calculator";
import { services, comparison, photos, faqs } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-star">✳</span> A BETTER KIND OF COMING HOME
            </p>
            <h1>
              A clean home.
              <br />A little more <em>life.</em>
            </h1>
            <p className="hero-description">
              Less on your to-do list.
              <br />
              More of what you love.
            </p>
            <p className="hero-detail">
              Thoughtful house cleaning for the life you’re busy living. Proudly
              serving Midland, Texas & beyond.
            </p>
            <div className="hero-actions">
              <a href="#estimate" className="btn btn-dark">
                Get my instant estimate <ArrowUpRight size={18} />
              </a>
              <a href="#services" className="text-link">
                Find your clean <ArrowRight size={16} />
              </a>
            </div>
            <div className="hero-assurances">
              <span>
                <Check size={14} /> No commitment
              </span>
              <span>
                <Check size={14} /> Made for your home
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <Image
                src={photos.living}
                alt="Sunlight filling a beautifully arranged living room with soft neutral furniture"
                fill
                sizes="(max-width: 800px) 100vw, 52vw"
                preload
              />
              <span className="image-label">MAKE ROOM FOR THE GOOD STUFF.</span>
            </div>
            <div className="hero-seal" aria-hidden="true">
              <Sun size={24} />
              <span>
                A FRESH
                <br />
                PERSPECTIVE
              </span>
            </div>
            <div className="hero-note">
              <span className="note-icon">
                <House size={23} />
              </span>
              <div>
                <span>YOUR NEW FAVORITE FEELING</span>
                <strong>Ahh. Home, sweet clean.</strong>
              </div>
              <Sparkles size={20} />
            </div>
          </div>
        </section>
        <div className="promise-strip">
          <div className="container">
            <span>
              Little details.
              <br />
              <strong>A big difference.</strong>
            </span>
            <p>
              <ShieldCheck /> Thoughtfully cared for
            </p>
            <p>
              <Clock3 /> More time for you
            </p>
            <p>
              <Heart /> A home that feels good
            </p>
            <span className="strip-spark" aria-hidden="true">
              ✳
            </span>
          </div>
        </div>

        <section className="section services-section container" id="services">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">01 / FIND YOUR FRESH START</p>
              <h2>
                Every home is different.
                <br />
                <em>So is every clean.</em>
              </h2>
            </div>
            <p>
              A little upkeep. A deeper refresh. A brand-new chapter.
              <br />
              There’s a TidyUp! clean for wherever life takes you.
            </p>
          </div>
          <div className="service-cards">
            {services.map((s) => (
              <article
                className={`service-card ${s.id}`}
                key={s.id}
                data-reveal
              >
                <div className="service-photo">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 700px) 100vw, 33vw"
                  />
                  <span>{s.number}</span>
                  {s.id === "deep" && <b>THE DETAIL-LOVER’S CLEAN</b>}
                </div>
                <div className="service-content">
                  <p className="eyebrow">{s.eyebrow}</p>
                  <h3>{s.name}</h3>
                  <p className="service-description">{s.description}</p>
                  <ul>
                    {s.features.map((f) => (
                      <li key={f}>
                        <Check size={15} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <ServiceButton id={s.id} className="service-cta">
                    {s.id === "standard"
                      ? "Keep it fresh"
                      : s.id === "deep"
                        ? "Go a little deeper"
                        : "Start a new chapter"}
                    <ArrowUpRight size={19} />
                  </ServiceButton>
                </div>
              </article>
            ))}
          </div>
          <details className="comparison-details">
            <summary>
              <span>
                <Plus size={17} /> The little details, side by side
              </span>
              <span>
                Compare our cleans <ChevronDown size={16} />
              </span>
            </summary>
            <div className="comparison-intro">
              <h3>A clear picture of your clean.</h3>
              <p>
                Scroll sideways on smaller screens to compare all three
                services.
              </p>
            </div>
            <div
              className="table-scroll"
              tabIndex={0}
              role="region"
              aria-label="Cleaning service comparison"
            >
              <table>
                <caption className="sr-only">
                  Included tasks by cleaning service
                </caption>
                <thead>
                  <tr>
                    <th scope="col">What’s included</th>
                    {services.map((s) => (
                      <th key={s.id} scope="col">
                        {s.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row[0]}>
                      <th scope="row">{row[0]}</th>
                      {row.slice(1).map((v, i) => (
                        <td key={i}>
                          {v ? (
                            <Check aria-label="Included" size={19} />
                          ) : (
                            <Minus aria-label="Not included" size={17} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="fine-print">
              ¹ One oven and one empty refrigerator are included in Moving
              Cleaning; additional appliances may cost extra. Based on TidyUp!’s
              published service checklists. Confirm your home’s exact scope with
              the team.
            </p>
          </details>
        </section>

        <section className="life-section" id="how-it-works">
          <div className="container life-grid">
            <div className="life-photo" data-reveal>
              <Image
                src={photos.bedroom}
                alt="A peaceful bedroom with fresh linens and soft natural light"
                fill
                sizes="(max-width: 800px) 100vw, 45vw"
              />
              <div className="photo-line">
                <span>
                  SLOW MORNINGS.
                  <br />
                  FRESH SHEETS.
                </span>
                <Sun size={30} />
              </div>
            </div>
            <div className="life-copy" data-reveal>
              <p className="eyebrow">02 / LESS TO DO. MORE TO ENJOY.</p>
              <h2>
                Life happens.
                <br />
                <em>We’ll handle the clean.</em>
              </h2>
              <p className="body-copy">
                The Sunday coffee. The family dinner. The
                doing-absolutely-nothing. A clean home makes room for all of it.
              </p>
              <div className="process-step">
                <span>01</span>
                <div>
                  <h3>Make it yours.</h3>
                  <p>Tell us about your home and choose your kind of clean.</p>
                </div>
              </div>
              <div className="process-step">
                <span>02</span>
                <div>
                  <h3>Let’s get the details right.</h3>
                  <p>Connect with the team to confirm your quote and visit.</p>
                </div>
              </div>
              <div className="process-step">
                <span>03</span>
                <div>
                  <h3>Come home to a little more ahh.</h3>
                  <p>Enjoy your space. You’ve got better things to do.</p>
                </div>
              </div>
              <a href="#estimate" className="text-link">
                Let’s start with your home <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="estimate-section section" id="estimate">
          <div className="container estimate-grid">
            <div className="estimate-copy" data-reveal>
              <p className="eyebrow">03 / YOUR HOME. YOUR CLEAN.</p>
              <h2>
                Your fresh start
                <br />
                is a few <em>clicks away.</em>
              </h2>
              <p>
                No long forms. No guesswork.
                <br />
                Just a little about your home and the kind of clean you have in
                mind.
              </p>
              <div className="estimate-benefits">
                <span>
                  <House size={19} /> Tailored to your space
                </span>
                <span>
                  <Sparkles size={19} /> Three thoughtful cleaning options
                </span>
                <span>
                  <LockIcon /> No payment required
                </span>
              </div>
              <div className="tidy-tip">
                <Mascot />
                <div>
                  <strong>A little tip from Tidy</strong>
                  <p>
                    Not sure where to start? Deep Cleaning is worth exploring
                    for a more detailed refresh.
                  </p>
                  <AssistantLink className="inline-link">
                    Help me choose <ArrowUpRight size={13} />
                  </AssistantLink>
                </div>
              </div>
            </div>
            <div data-reveal>
              <QuoteCalculator />
            </div>
          </div>
        </section>

        <section className="container assistant-section" id="meet-tidy">
          <div className="assistant-stage" data-reveal>
            <span className="orbit orbit-one" aria-hidden="true" />
            <span className="orbit orbit-two" aria-hidden="true" />
            <Sparkles className="stage-star star-one" size={28} />
            <Sparkles className="stage-star star-two" size={18} />
            <span className="stage-hello">Oh, hey there!</span>
            <Mascot className="stage-mascot" interactive />
            <span className="stage-caption">
              A LITTLE SPARKLE. A LOT OF HELP.
            </span>
          </div>
          <div className="assistant-intro" data-reveal>
            <p className="eyebrow">
              <Sparkles size={14} /> MEET YOUR NEW HOME-CARE SIDEKICK
            </p>
            <h2>
              Big questions?
              <br />
              <em>Little Tidy’s here.</em>
            </h2>
            <p>
              A friendly face for the little things. Tidy can walk you through
              our cleans, help you explore an estimate, or point you in the
              right direction.
            </p>
            <AssistantLink className="btn btn-lime">
              Say hello to Tidy <Sparkles size={17} />
            </AssistantLink>
            <span className="assistant-intro-note">
              An interactive assistant demo. Ready when you are.
            </span>
          </div>
        </section>

        <section className="section reviews-section container" id="kind-words">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">THE FEELING WE’RE HERE FOR</p>
              <h2>
                Clean homes.
                <br />
                <em>Happy little moments.</em>
              </h2>
            </div>
            <p className="sample-caption">
              Testimonial layout preview.
              <br />
              Sample copy below, not real customer reviews.
            </p>
          </div>
          <div className="review-grid">
            <article data-reveal>
              <span className="quote-mark">“</span>
              <blockquote>
                Coming home to a clean space means I can finally focus on being
                home. It’s the little reset my week needed.
              </blockquote>
              <div>
                <span className="review-avatar">A</span>
                <p>
                  Sample homeowner<small>Illustrative testimonial</small>
                </p>
                <House size={21} />
              </div>
            </article>
            <article data-reveal>
              <span className="quote-mark">“</span>
              <blockquote>
                One less thing on our moving list. One very fresh beginning.
                That feeling when everything is ready? Priceless.
              </blockquote>
              <div>
                <span className="review-avatar">B</span>
                <p>
                  Sample homeowner<small>Illustrative testimonial</small>
                </p>
                <KeyRound size={21} />
              </div>
            </article>
          </div>
        </section>

        <section className="faq-section container" id="faq">
          <div data-reveal>
            <p className="eyebrow">A LITTLE CLARITY</p>
            <h2>
              Good questions.
              <br />
              <em>Clear answers.</em>
            </h2>
            <p>Still wondering about something?</p>
            <AssistantLink className="text-link">
              Just ask Tidy <Sparkles size={16} />
            </AssistantLink>
          </div>
          <div className="faq-list" data-reveal>
            {faqs.map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="local-section" id="contact">
          <div className="container local-inner">
            <div data-reveal>
              <p className="eyebrow">
                <MapPin size={14} /> LOCAL ROOTS. THOUGHTFUL CARE.
              </p>
              <h2>
                Midland is home.
                <br />
                <em>Let’s make it shine.</em>
              </h2>
              <p>
                Residential cleaning in Midland, TX and surrounding areas.
                <br />A little care for your home. A little more room for your
                life.
              </p>
              <a href="#estimate" className="btn btn-lime">
                Find your fresh start <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="contact-card" data-reveal>
              <span className="eyebrow">REAL PEOPLE. RIGHT HERE.</span>
              <h3>Let’s talk clean.</h3>
              <a href="tel:+14327012112">
                <Phone size={19} />
                (432) 701-2112
                <ArrowUpRight size={16} />
              </a>
              <a href="mailto:info@tidyupmidland.com">
                <Mail size={19} />
                info@tidyupmidland.com
                <ArrowUpRight size={16} />
              </a>
              <p>Monday–Friday · 8 AM–5 PM</p>
              <span className="contact-location">
                <MapPin size={15} /> Midland, Texas & surrounding areas
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer container">
        <div className="footer-top">
          <div>
            <a className="wordmark" href="#">
              tidyup<span>!</span>
              <small>MIDLAND, TEXAS</small>
            </a>
            <p>Come home to calm.</p>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#services">Our cleans</a>
            <a href="#estimate">Your estimate</a>
            <a href="#meet-tidy">Meet Tidy</a>
            <a href="#contact">Get in touch</a>
          </nav>
          <a className="back-to-top" href="#" aria-label="Back to top">
            <ArrowUpRight size={23} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 TidyUp! Midland · Website concept</span>
          <span>
            Sample pricing & testimonials. No booking or data collection.
          </span>
          <a
            href="https://tidyupmidland.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the current website <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
      <Assistant />
      <Motion />
    </>
  );
}
function LockIcon() {
  return <ShieldCheck size={19} />;
}
