"use client";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, MapPin } from "lucide-react";
import { Dialog } from "radix-ui";
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        <span>
          <MapPin size={12} /> A little more shine, right here in Midland, TX.
        </span>
        <a href="tel:+14327012112">Let’s talk: (432) 701-2112</a>
      </div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#" className="wordmark" aria-label="TidyUp! Midland home">
            tidyup<span>!</span>
            <small>MIDLAND, TEXAS</small>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#services">Our cleans</a>
            <a href="#how-it-works">How it works</a>
            <a href="#meet-tidy">
              Meet Tidy <span className="nav-new">NEW</span>
            </a>
            <a href="#faq">FAQs</a>
          </nav>
          <a href="#estimate" className="btn btn-dark header-cta">
            Get my estimate <ArrowUpRight size={16} />
          </a>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="mobile-menu icon-button"
              aria-label="Open navigation"
            >
              <Menu />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="dialog-overlay" />
              <Dialog.Content className="mobile-panel">
                <Dialog.Title className="wordmark">
                  tidyup<span>!</span>
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  Explore TidyUp! Midland
                </Dialog.Description>
                <Dialog.Close
                  className="menu-close icon-button"
                  aria-label="Close navigation"
                >
                  <X />
                </Dialog.Close>
                <nav aria-label="Mobile navigation">
                  {[
                    ["Our cleans", "#services"],
                    ["How it works", "#how-it-works"],
                    ["Meet Tidy", "#meet-tidy"],
                    ["FAQs", "#faq"],
                    ["Contact us", "#contact"],
                  ].map(([text, url]) => (
                    <a key={url} href={url} onClick={() => setOpen(false)}>
                      {text}
                      <ArrowUpRight size={23} />
                    </a>
                  ))}
                </nav>
                <a
                  href="#estimate"
                  className="btn btn-dark"
                  onClick={() => setOpen(false)}
                >
                  Get my estimate
                </a>
                <p>
                  Made for your home.
                  <br />
                  Right here in Midland.
                </p>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
    </>
  );
}
