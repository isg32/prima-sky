import type { Dict } from "./i18n/en";
import { contact } from "./project";

export const waLink = (t: Dict, text?: string) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text ?? t.whatsappMessage)}`;
export const telLink = `tel:${contact.phoneIntl}`;
export const mailLink = (subject = "Prima Sky enquiry") =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;

/** Opens the contact form with an interest preselected (used by shops & plans). */
export function enquire(interest: string) {
  window.dispatchEvent(new CustomEvent("prima:enquire", { detail: { interest } }));
}
