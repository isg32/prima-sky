// Earlier projects that Prima's current partners were associated with, taken from
// the brochures in public/previous/. Kept short on purpose — the page is an overview.

type L10n = { en: string; gu: string };

export type PreviousProject = {
  name: string;
  type: L10n;
  location: L10n;
  image: string;
  brochure: string; // path under /public
  downloadAs: string; // tidy filename for the download
  sizeMB: number;
  mapUrl?: string; // Google Maps pin, when supplied
};

const pdf = (file: string) => `/previous/${encodeURIComponent(file)}`;

export const previousProjects: PreviousProject[] = [
  {
    // Architect's drawing set (S Mevada Architects); the file name carries the client's
    // name, so the card and download use a neutral project name instead.
    name: "R17 Residence",
    type: { en: "3 & 4 BHK residential apartments", gu: "3 અને 4 BHK રહેણાંક એપાર્ટમેન્ટ" },
    location: { en: "Ognaj, Ahmedabad", gu: "ઓગણજ, અમદાવાદ" },
    image: "/previous/img/r17-ognaj.jpg",
    brochure: pdf("R17_PR_DIPAK BHAI OGNAJ_11-07-26.pdf"),
    downloadAs: "R17-Residence-Plans.pdf",
    sizeMB: 2,
    mapUrl: "https://www.google.com/maps?q=23.106139,72.519194",
  },
  {
    name: "Elite One13",
    type: { en: "3 BHK premium living", gu: "3 BHK પ્રીમિયમ રહેઠાણ" },
    location: { en: "Vande Mataram Road, Gota, Ahmedabad", gu: "વંદે માતરમ રોડ, ગોતા, અમદાવાદ" },
    image: "/previous/img/elite-one13.jpg",
    brochure: pdf("Elite One13_Brochure.pdf"),
    downloadAs: "Elite-One13-Brochure.pdf",
    sizeMB: 7.5,
  },
  {
    name: "Aniket Heights",
    type: { en: "2 & 3 BHK luxury apartments", gu: "2 અને 3 BHK લક્ઝરી એપાર્ટમેન્ટ" },
    location: { en: "S.P. Ring Road, Ognaj, Ahmedabad", gu: "એસ.પી. રિંગ રોડ, ઓગણજ, અમદાવાદ" },
    image: "/previous/img/aniket-heights.jpg",
    brochure: pdf("Aniket hight process file_.pdf"),
    downloadAs: "Aniket-Heights-Brochure.pdf",
    sizeMB: 9.3,
  },
  {
    name: "Ananya Allium",
    type: { en: "2 BHK homes & shops", gu: "2 BHK ઘર અને દુકાનો" },
    location: { en: "Near Swarnim Business Hub, Tragad, Ahmedabad", gu: "સ્વર્ણિમ બિઝનેસ હબ પાસે, ત્રાગડ, અમદાવાદ" },
    image: "/previous/img/ananya-allium.jpg",
    brochure: pdf("Ananya Allium.pdf"),
    downloadAs: "Ananya-Allium-Brochure.pdf",
    sizeMB: 12.5,
  },
  {
    name: "Akshar 42",
    type: { en: "2 BHK flats", gu: "2 BHK ફ્લેટ" },
    location: { en: "G.S.T. Crossing, New Ranip, Ahmedabad", gu: "જી.એસ.ટી. ક્રોસિંગ, ન્યુ રાણીપ, અમદાવાદ" },
    image: "/previous/img/akshar-42.jpg",
    brochure: pdf("AKSHAR 42 8-2-2021.pdf"),
    downloadAs: "Akshar-42-Brochure.pdf",
    sizeMB: 0.8,
  },
];
