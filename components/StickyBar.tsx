"use client";

import { useEffect, useState } from "react";
import Icon from "./ui/Icon";
import type { Dict } from "@/lib/i18n/en";
import { telLink, waLink } from "@/lib/links";

/**
 * Mobile-only call / WhatsApp bar, as on the Elanza listing. It stays out of the
 * way over the hero and the contact section, where the same actions are on screen.
 */
export default function StickyBar({ t }: { t: Dict }) {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const contact = document.getElementById("contact");
    const io = new IntersectionObserver(([e]) => setAtContact(e.isIntersecting), { rootMargin: "0px 0px -35% 0px" });
    if (contact) io.observe(contact);
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !atContact;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-[70] grid grid-cols-2 gap-2 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"
      }`}
    >
      <a
        href={waLink(t)}
        target="_blank"
        rel="noopener"
        tabIndex={show ? 0 : -1}
        className="flex items-center justify-center gap-2 rounded-full bg-[#1f9d55] py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_30px_-8px_rgba(11,27,46,0.45)]"
      >
        <Icon name="whatsapp" size={18} /> {t.cta.whatsapp}
      </a>
      <a
        href={telLink}
        tabIndex={show ? 0 : -1}
        className="flex items-center justify-center gap-2 rounded-full bg-blue-deep py-3.5 text-[15px] font-semibold text-white shadow-[0_12px_30px_-8px_rgba(11,27,46,0.45)]"
      >
        <Icon name="phone" size={18} /> {t.cta.call}
      </a>
    </div>
  );
}
