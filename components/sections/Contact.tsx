"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Heading from "../ui/Heading";
import Icon from "../ui/Icon";
import Lotus from "../brand/Lotus";
import PrimaMark from "../brand/PrimaMark";
import { useReveal } from "../motion/useReveal";
import type { Dict } from "@/lib/i18n/en";
import { mailLink, telLink, waLink } from "@/lib/links";
import { brochureDownloadAs, brochureUrl, contact, renders } from "@/lib/project";
import { route } from "@/lib/routes";

type Status = "idle" | "sending" | "ok" | "error" | "notConfigured" | "invalid";

export default function Contact({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const baseOptions = t.contact.form.options;
  const [interest, setInterest] = useState(baseOptions[0]);
  const [status, setStatus] = useState<Status>("idle");
  useReveal(ref);
  const c = t.contact;
  const f = c.form;

  // shops / plans preselect what the visitor is asking about
  useEffect(() => {
    const on = (e: Event) => {
      const v = (e as CustomEvent<{ interest: string }>).detail.interest;
      setInterest(v);
    };
    window.addEventListener("prima:enquire", on);
    return () => window.removeEventListener("prima:enquire", on);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const phone = (data.phone ?? "").replace(/\D/g, "").slice(-10);
    if (!data.name?.trim() || phone.length !== 10) {
      setStatus("invalid");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phone, lang: t.locale, page: window.location.href }),
      });
      if (res.status === 503) return setStatus("notConfigured");
      if (!res.ok) return setStatus("error");
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  const msg: Partial<Record<Status, string>> = {
    ok: f.success,
    error: f.error,
    notConfigured: f.notConfigured,
    invalid: f.invalid,
  };
  const options = baseOptions.includes(interest) ? baseOptions : [interest, ...baseOptions];
  const field =
    "peer w-full border-0 border-b border-white/25 bg-transparent px-0 pt-6 pb-2.5 text-[16px] text-white placeholder-transparent transition-colors focus:border-sky focus:ring-0 focus:outline-none";
  const label =
    "pointer-events-none absolute top-0 left-0 text-[11px] font-semibold tracking-[0.14em] text-white/55 uppercase transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-[15px] peer-placeholder-shown:font-normal peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-0 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:tracking-[0.14em] peer-focus:text-sky peer-focus:uppercase";

  return (
    <>
      {/* brochure download */}
      <section className="relative overflow-hidden bg-white">
        <div className="wrap grid grid-cols-[minmax(0,1fr)] items-center gap-10 py-[clamp(70px,9vw,120px)] md:grid-cols-[auto_minmax(0,1fr)_auto]">
          <div data-fade className="relative aspect-[666/986] w-36 rotate-[-4deg] shadow-[0_30px_60px_-20px_rgba(11,27,46,0.4)] max-md:mx-auto md:w-48">
            <div className="paper absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
              <Lotus className="w-16" />
              <span className="text-center text-[15px] leading-none font-bold tracking-wide text-blue">
                PRIMA <span className="text-charcoal">SKY</span>
              </span>
            </div>
          </div>
          <div>
            <p data-fade className="eyebrow mb-4">
              {t.brochure.eyebrow}
            </p>
            <h2 data-split className="display display-sm !font-bold">
              {t.brochure.t}
            </h2>
            <p data-fade className="lede mt-4">
              {t.brochure.b}
            </p>
          </div>
          <a data-fade href={brochureUrl} download={brochureDownloadAs} className="btn btn-primary flex-wrap justify-center gap-y-1 max-md:w-full max-md:whitespace-normal md:justify-self-start">
            <Icon name="download" /> {t.cta.brochure}
            <span className="mono text-[10px] font-normal tracking-wider opacity-70">{t.brochure.size}</span>
          </a>
        </div>
      </section>

      <section ref={ref} id="contact" className="on-dark relative isolate overflow-hidden bg-night text-white">
        <div className="absolute inset-0 -z-10 opacity-30">
          <Image src={renders.dusk} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/90 to-night" />

        <div className="wrap section grid grid-cols-[minmax(0,1fr)] gap-16 lg:grid-cols-2">
          <div>
            <Heading eyebrow={c.eyebrow} light={c.light} bold={c.bold} size="display-md" />
            <p data-fade className="lede mt-8">
              {c.body}
            </p>

            <p data-fade className="eyebrow mt-12 mb-5">
              {c.reach}
            </p>
            <div data-stagger className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <a href={waLink(t)} target="_blank" rel="noopener" className="btn btn-wa col-span-2 justify-center">
                <Icon name="whatsapp" /> {t.cta.whatsapp}
              </a>
              <a href={telLink} className="btn btn-white justify-center max-sm:!px-3">
                <Icon name="phone" /> {contact.phoneDisplay}
              </a>
              <a href={mailLink()} className="btn btn-ghost justify-center max-sm:!px-3">
                <Icon name="mail" /> {t.cta.email}
              </a>
              <Link href={route(t.locale, "previous")} className="btn btn-ghost col-span-2 justify-center">
                {t.previousLink.cta} <Icon name="arrow" />
              </Link>
            </div>
            <p data-fade className="mt-3 text-[11px] text-white/40">
              {t.previousLink.note}
            </p>

            <dl data-stagger className="mt-12 grid gap-8 text-[14.5px] sm:grid-cols-2">
              <div>
                <dt className="mono mb-2 text-[10.5px] tracking-[0.16em] text-sky-soft uppercase">{c.address}</dt>
                <dd className="leading-relaxed text-white/85">
                  {c.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
              <div className="space-y-5">
                <div>
                  <dt className="mono mb-2 text-[10.5px] tracking-[0.16em] text-sky-soft uppercase">{c.developer}</dt>
                  <dd className="font-semibold">{c.developerName}</dd>
                </div>
                <div>
                  <dt className="mono mb-2 text-[10.5px] tracking-[0.16em] text-sky-soft uppercase">{c.rera}</dt>
                  <dd className="text-white/85">{contact.rera ?? c.reraPending}</dd>
                </div>
              </div>
              <div className="sm:col-span-2">
                <dt className="mono mb-2 text-[10.5px] tracking-[0.16em] text-sky-soft uppercase">Email</dt>
                <dd>
                  <a href={mailLink()} className="text-white/85 underline decoration-white/30 underline-offset-4 [overflow-wrap:anywhere] hover:text-white">
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <form data-fade onSubmit={submit} noValidate className="self-start border border-white/15 bg-white/[0.04] p-[clamp(22px,4vw,44px)] backdrop-blur-sm">
            <div className="grid gap-7">
              <div className="relative">
                <input id="f-name" name="name" required autoComplete="name" placeholder=" " className={field} />
                <label htmlFor="f-name" className={label}>
                  {f.name} *
                </label>
              </div>
              <div className="relative">
                <input id="f-phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder=" " className={field} />
                <label htmlFor="f-phone" className={label}>
                  {f.phone} *
                </label>
              </div>
              <div className="relative">
                <input id="f-email" name="email" type="email" autoComplete="email" placeholder=" " className={field} />
                <label htmlFor="f-email" className={label}>
                  {f.email}
                </label>
              </div>
              <div className="relative">
                <label htmlFor="f-interest" className="text-[11px] font-semibold tracking-[0.14em] text-white/55 uppercase">
                  {f.interest}
                </label>
                <select
                  id="f-interest"
                  name="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="mt-1 w-full border-0 border-b border-white/25 bg-transparent px-0 py-2.5 text-[16px] text-white focus:border-sky focus:ring-0 focus:outline-none [&>option]:text-ink"
                >
                  {options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <textarea id="f-msg" name="message" rows={3} placeholder=" " className={`${field} resize-none`} />
                <label htmlFor="f-msg" className={label}>
                  {f.message}
                </label>
              </div>
              {/* honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <button type="submit" disabled={status === "sending"} className="btn btn-white justify-center disabled:opacity-60">
                {status === "sending" ? f.sending : f.submit} <Icon name="arrow" />
              </button>
              <p role="status" aria-live="polite" className={`min-h-[1.5em] text-[14px] ${status === "ok" ? "text-sky-soft" : "text-[#ffb59c]"}`}>
                {msg[status] ?? ""}
              </p>
            </div>
          </form>
        </div>

        <footer className="wrap pb-28 md:pb-12">
          <details className="group border-t border-white/15 py-6">
            <summary className="mono flex cursor-pointer list-none items-center justify-between text-[11px] tracking-[0.16em] text-white/60 uppercase">
              {c.disclaimerTitle}
              <span className="transition-transform group-open:rotate-45">+</span>
            </summary>
            <ul className="mt-4 grid gap-2 text-[12.5px] leading-relaxed text-white/55 md:grid-cols-2 md:gap-x-10">
              {c.disclaimer.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          </details>
          <div className="flex flex-col gap-6 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
            <PrimaMark tone="white" className="text-[18px]" />
            <p className="mono text-[10.5px] tracking-[0.14em] text-white/50 uppercase">
              © {new Date().getFullYear()} {c.rights}
            </p>
          </div>
        </footer>
      </section>
    </>
  );
}
