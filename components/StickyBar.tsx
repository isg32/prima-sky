import Icon from "./ui/Icon";
import type { Dict } from "@/lib/i18n/en";
import { telLink, waLink } from "@/lib/links";

/** Mobile-only call / WhatsApp bar, as on the Elanza listing. */
export default function StickyBar({ t }: { t: Dict }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] grid grid-cols-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(11,27,46,0.18)] md:hidden">
      <a href={waLink(t)} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 bg-[#1f9d55] py-4 text-[15px] font-semibold text-white">
        <Icon name="whatsapp" size={18} /> {t.cta.whatsapp}
      </a>
      <a href={telLink} className="flex items-center justify-center gap-2 bg-blue-deep py-4 text-[15px] font-semibold text-white">
        <Icon name="phone" size={18} /> {t.cta.call}
      </a>
    </div>
  );
}
