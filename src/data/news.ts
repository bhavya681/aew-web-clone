import { GCS } from "./site";

export type NewsCategory =
  | "Latest News"
  | "Results"
  | "Interviews"
  | "Announcements"
  | "Backstage"
  | "Championships";

export type Article = {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  dateLabel: string;
  image: string;
  author: string;
  excerpt: string;
  content: string[];
  href: string;
  featured?: boolean;
};

type Row = [
  slug: string,
  title: string,
  category: NewsCategory,
  date: string,
  file: string,
  excerpt: string,
  featured?: boolean,
];

const rows: Row[] = [
  ["the-toni-storm-tapes", "What Are The Toni Storm Tapes?", "Announcements", "2026-11-20", "2026/11/20/9169284e-9656-4062-a244-093b6e655736.jpg", "A five-part series premiering November 27 at 10am ET pulls back the curtain on one of AEW's most enigmatic stars.", true],
  ["dynamite-results-november-18", "AEW Dynamite Results: November 18, 2026", "Results", "2026-11-19", "2026/11/19/f510fc24-d2b1-479a-9286-16a98c75608d.jpg", "The Continental Classic kicked off with a pair of tournament bouts and a title picture turned upside down."],
  ["dynamite-preview-continental-classic", "AEW Dynamite Preview: The 2026 Continental Classic Begins", "Latest News", "2026-11-18", "2026/11/18/8d91a7d1-bda1-4011-9a3d-61a8600b8da9.jpg", "Twelve competitors. Two leagues. One road to Worlds End."],
  ["continental-classic-numbers", "The 2026 Continental Classic By the Numbers", "Latest News", "2026-11-18", "2026/11/18/ecb0519a-c726-4dbd-849f-365f3178e50f.jpg", "Every match, every point, and what the tournament math means heading into the final week."],
  ["full-gear-results", "AEW Full Gear Results: November 14, 2026", "Results", "2026-11-15", "2026/11/17/35a814b9-7266-4d55-a114-d430c449cdfb.jpg", "A chaotic night of championship wrestling delivered a new era for AEW."],
  ["full-gear-preview", "AEW Full Gear Preview: Match Card, Start Time, How to Watch", "Latest News", "2026-11-14", "2026/11/15/5c48b054-7891-4aff-955b-7de9fe092648.jpg", "Everything you need before the biggest pay-per-view of the fall."],
  ["dynamite-collision-results-november-11", "AEW Dynamite & Collision Results: November 11, 2026", "Results", "2026-11-11", "2026/11/12/850f98c9-ac7a-4d7f-a2ba-6a45c00fdc68.jpg", "Two shows, one week, and several statements made in the hunt for gold."],
  ["dynamite-collision-preview-november-11", "AEW Dynamite & Collision Preview: November 11, 2026", "Latest News", "2026-11-11", "2026/11/12/d6ea86b7-7af3-4e35-a75b-121c0161cbfc.jpg", "A packed double taping sets the stage for Full Gear."],
  ["ciampa-national-champion", "Tommaso Ciampa Wins the AEW National Championship", "Championships", "2026-11-10", "2026/11/08/f63d8c91-8883-4804-a6b7-f37a12a05938.jpg", "\"You can call me the History Maker\" after a brutal title victory."],
  ["collision-rager-results", "AEW Collision Rock 'N' Wrestling Rager Results", "Results", "2026-11-08", "2026/11/09/7c56222d-9c39-4563-8745-9f51fa70d639.jpg", "The Rager delivered music, mayhem, and a memorable main event."],
  ["collision-rager-preview", "AEW Collision Rock 'N' Wrestling Rager Preview", "Latest News", "2026-11-07", "2026/11/09/07ecc16b-f0c8-4ede-9ca0-c86c390264d5.png", "AEW Collision takes the show on the road with a special edition."],
  ["blood-and-guts-results", "AEW Dynamite Blood and Guts Results: November 4, 2026", "Results", "2026-11-05", "2026/11/05/e9dfb4c9-bbdc-4801-afc0-e29f7663012f.jpg", "The most violent structure in wrestling returned to AEW."],
  ["blood-and-guts-preview", "AEW Dynamite Blood and Guts Preview: November 4, 2026", "Latest News", "2026-11-04", "2026/11/05/2caa9075-61c0-41bc-8148-127550dc57f8.jpg", "Teams collide inside the cage with bragging rights on the line."],
  ["fright-night-results", "AEW Fright Night Collision Results: October 31, 2026", "Results", "2026-11-01", "2026/11/02/9ad9802c-daff-4a7a-9c8d-9fad89a5f426.jpg", "Halloween chaos, surprise appearances, and a haunting main event."],
  ["backstage-continental-classic", "Backstage: How the Continental Classic Changed the Locker Room", "Backstage", "2026-11-17", "2026/11/19/965dc277-9d39-4a58-9ece-b5ae46fafad3.jpg", "Competitors discuss the physical and mental toll of the tournament."],
  ["exclusive-ospreay-fletcher", "Full Gear EXCLUSIVE: Will Ospreay Urges Kyle Fletcher to Find Himself", "Interviews", "2026-11-19", "2026/11/19/dfc9b33b-2f9a-4176-9bdd-d7754ad4adca.jpg", "A candid conversation about mentorship, ambition, and the Don Callis Family."],
];

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const label = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return `${monthNames[month - 1]} ${day}, ${year}`;
};

const buildContent = (title: string, excerpt: string, category: NewsCategory) => [
  excerpt,
  `The action continues to build across AEW Dynamite and AEW Collision as the road to the next premium live event heats up. ${title} is the latest chapter in a story that has captivated the AEW Universe week after week.`,
  `Backstage, the stakes could not be higher. Superstars across every division are jockeying for position, and in AEW, opportunity is never handed out — it is taken. ${category === "Results" ? "The fallout from this event will be felt for weeks." : "All eyes now turn to what happens next."}`,
  `Stay locked in to All Elite Wrestling across TBS, TNT, and AEW Plus as we bring you every moment, every match, and every developing story from the world's premier wrestling promotion.`,
];

export const articles: Article[] = rows.map(
  ([slug, title, category, date, file, excerpt, featured]) => ({
    slug,
    title,
    category,
    date,
    dateLabel: label(date),
    image: `${GCS}/${file}`,
    author: category === "Results" ? "AEW Staff" : "All Elite Wrestling",
    excerpt,
    content: buildContent(title, excerpt, category),
    href: `/news/${slug}`,
    featured,
  }),
);

export const newsCategories: NewsCategory[] = [
  "Latest News",
  "Results",
  "Interviews",
  "Announcements",
  "Backstage",
  "Championships",
];

export const getArticle = (slug: string) =>
  articles.find((article) => article.slug === slug);

export const heroArticle = articles[0];
