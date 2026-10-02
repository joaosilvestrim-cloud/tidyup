"use client";
import { useState, useEffect, useRef, type FormEvent } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { X, Send, ArrowUpRight, Sparkles, RotateCcw } from "lucide-react";
import { Mascot } from "./motion";
type Message = { role: "assistant" | "user"; text: string };
const greeting: Message = {
  role: "assistant",
  text: "Hey there! I’m Tidy, your little home-care helper. ✨ Looking for the right clean, a quick estimate, or a little guidance? You’re in the right place.",
};
function answer(input: string) {
  const text = input.toLowerCase();
  if (/price|cost|quote|estimate|much|budget/.test(text))
    return "A fresh start is just three steps away: tell us your room count, choose your clean, and enter your details to see a sample estimate. The calculator uses illustrative prices. Call the team for an official quote. Want to give it a try?";
  if (/\b(move|moving|move-in|move-out)\b/.test(text))
    return "New chapter? Moving Cleaning takes care of floors, bathrooms, surfaces, baseboards, cabinet interiors, and one empty refrigerator and oven. Extra appliances may cost more. You focus on the keys; the team handles the clean.";
  if (/deep|standard|compare|clean|first/.test(text))
    return "Here’s the simple version: Standard keeps the everyday fresh. Deep adds the details, like doors, blinds, fans, and inside the oven. Moving helps with a move-in or move-out, including cabinets and an empty refrigerator. The comparison on this page shows what’s included.";
  if (/area|where|midland|location|zip|address|cover/.test(text))
    return "Home is where the heart is — and ours is in Midland, TX. TidyUp! also serves surrounding areas. Call (432) 701-2112 to check your exact address with the team.";
  if (/book|schedule|time|hour|availab|appointment|tomorrow/.test(text))
    return "The team is available Monday–Friday, 8 AM–5 PM, at (432) 701-2112. I can help you explore the options anytime, but this demo doesn’t check the calendar or book a visit.";
  if (/hello|hi\b|hey|thanks|thank you/.test(text))
    return "A little wave and a little sparkle, just for you! ✨ I can help with services, estimates, and the Midland service area. What would make your day a little lighter?";
  if (/pet|supply|product|safe|allerg|insured|guarantee/.test(text))
    return "That’s an important detail to get right. Please ask the team about pets, cleaning products, specific surfaces, allergies, or service policies at (432) 701-2112. I don’t want to guess about your home.";
  return "I’m best at helping with cleaning options, sample estimates, and the service area. For anything more specific, the TidyUp! team is happy to help at (432) 701-2112. What would you like to explore?";
}
export function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [happy, setHappy] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const happyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const end = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("tidy:open", show);
    return () => {
      window.removeEventListener("tidy:open", show);
      if (timer.current) clearTimeout(timer.current);
      if (happyTimer.current) clearTimeout(happyTimer.current);
    };
  }, []);
  useEffect(() => {
    if (open)
      end.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [messages, thinking, open]);
  function send(value: string) {
    const text = value.trim().slice(0, 500);
    if (!text || thinking) return;
    setMessages((m) => [...m.slice(-29), { role: "user", text }]);
    setInput("");
    setThinking(true);
    setHappy(false);
    timer.current = setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", text: answer(text) }]);
      setThinking(false);
      setHappy(true);
      happyTimer.current = setTimeout(() => setHappy(false), 1400);
    }, 700);
  }
  function reset() {
    if (timer.current) clearTimeout(timer.current);
    if (happyTimer.current) clearTimeout(happyTimer.current);
    setThinking(false);
    setHappy(false);
    setMessages([greeting]);
    setInput("");
  }
  function startQuote() {
    setOpen(false);
    document.getElementById("estimate")?.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          ref={trigger}
          className="assistant-launcher"
          aria-label="Chat with Tidy, your virtual assistant"
        >
          <span className="launcher-label">
            <strong>Hi, I’m Tidy!</strong>
            <span>
              A little help? <Sparkles size={12} />
            </span>
          </span>
          <span className="launcher-avatar">
            <Image src="/tidy-mascot.png" alt="" width={95} height={95} />
            <span className="assistant-status" />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay assistant-overlay" />
        <Dialog.Content
          className="assistant-dialog"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            trigger.current?.focus({ preventScroll: true });
          }}
        >
          <div className="assistant-header">
            <div className="assistant-mini">
              <Mascot
                state={thinking ? "thinking" : happy ? "happy" : "idle"}
              />
            </div>
            <div>
              <Dialog.Title>Tidy, at your service.</Dialog.Title>
              <Dialog.Description>
                Your virtual home-care helper
              </Dialog.Description>
            </div>
            <Dialog.Close className="icon-button" aria-label="Close Tidy chat">
              <X size={21} />
            </Dialog.Close>
          </div>
          <div className="assistant-demo">
            <Sparkles size={12} /> A friendly demo · available to explore 24/7
          </div>
          <div
            className="conversation"
            role="log"
            aria-live="polite"
            aria-label="Conversation with Tidy"
          >
            {messages.map((m, i) => (
              <div className={`message ${m.role}`} key={i}>
                {m.role === "assistant" && (
                  <span className="message-label">TIDY</span>
                )}
                <p>{m.text}</p>
              </div>
            ))}
            {thinking && (
              <div
                className="typing"
                role="status"
                aria-label="Tidy is thinking"
              >
                <i />
                <i />
                <i />
                <span>Tidy is thinking…</span>
              </div>
            )}
            <div ref={end} />
          </div>
          <div className="quick-actions">
            {["Help me choose", "How much?", "Service area"].map((q) => (
              <button
                key={q}
                disabled={thinking}
                onClick={() =>
                  send(q === "Help me choose" ? "Compare cleaning services" : q)
                }
              >
                {q}
              </button>
            ))}
          </div>
          <button className="assistant-quote" onClick={startQuote}>
            Build my estimate <ArrowUpRight size={16} />
          </button>
          <form
            className="message-form"
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              aria-label="Message Tidy"
              placeholder="Ask Tidy something…"
            />
            <button
              aria-label="Send message"
              disabled={!input.trim() || thinking}
            >
              <Send size={18} />
            </button>
          </form>
          <div className="assistant-footer">
            <span>Simulated replies. No booking or data collection.</span>
            <button onClick={reset} aria-label="Reset conversation">
              <RotateCcw size={13} />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
