"use client";
import { useEffect, type ReactNode, useRef } from "react";
import Image from "next/image";
export function Motion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      el.classList.add("will-reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
export function Mascot({
  className = "",
  state = "idle",
  interactive = false,
}: {
  className?: string;
  state?: "idle" | "thinking" | "happy";
  interactive?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`mascot ${className} is-${state}`}
      onPointerMove={(e) => {
        if (
          !interactive ||
          e.pointerType !== "mouse" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        ref.current?.style.setProperty(
          "--tilt-x",
          `${(-(e.clientY - r.top - r.height / 2) / r.height) * 16}deg`,
        );
        ref.current?.style.setProperty(
          "--tilt-y",
          `${((e.clientX - r.left - r.width / 2) / r.width) * 22}deg`,
        );
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--tilt-x", "0deg");
        ref.current?.style.setProperty("--tilt-y", "0deg");
      }}
    >
      <div className="mascot-tilt">
        <div className="mascot-float">
          <Image
            src="/tidy-mascot-blue.png"
            alt="Tidy, a friendly cyan-blue water droplet mascot waving hello"
            width={460}
            height={460}
            loading="eager"
            sizes="(max-width: 600px) 240px, 400px"
          />
        </div>
      </div>
      <span className="mascot-shadow" aria-hidden="true" />
    </div>
  );
}
export function AssistantLink({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      className={className}
      onClick={() => window.dispatchEvent(new Event("tidy:open"))}
    >
      {children}
    </button>
  );
}
