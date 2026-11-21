export type Ranking = {
  rank: number;
  previous: number;
  wrestlerSlug: string;
  name: string;
  wins: number;
  losses: number;
  momentum: "Surging" | "Strong" | "Steady" | "Slipping";
  champion: boolean;
  note: string;
};

export const rankings: Ranking[] = [
  { rank: 1, previous: 2, wrestlerSlug: "adam-page", name: "Adam Page", wins: 14, losses: 2, momentum: "Surging", champion: true, note: "The World Champion continues to dominate every stage." },
  { rank: 2, previous: 1, wrestlerSlug: "jon-moxley", name: "Jon Moxley", wins: 12, losses: 3, momentum: "Strong", champion: false, note: "A brutal run through the Continental Classic." },
  { rank: 3, previous: 4, wrestlerSlug: "bryan-danielson", name: "Bryan Danielson", wins: 11, losses: 2, momentum: "Surging", champion: true, note: "Technical mastery on display week after week." },
  { rank: 4, previous: 3, wrestlerSlug: "mjf", name: "MJF", wins: 10, losses: 4, momentum: "Steady", champion: false, note: "Still the most dangerous mouth in the business." },
  { rank: 5, previous: 6, wrestlerSlug: "darby-allin", name: "Darby Allin", wins: 9, losses: 5, momentum: "Strong", champion: false, note: "Fearless as ever in hardcore competition." },
  { rank: 6, previous: 5, wrestlerSlug: "jack-perry", name: "Jack Perry", wins: 9, losses: 4, momentum: "Steady", champion: true, note: "Capitalizing on every opportunity in Bullet Club Gold." },
  { rank: 7, previous: 9, wrestlerSlug: "hikaru-shida", name: "Hikaru Shida", wins: 8, losses: 2, momentum: "Surging", champion: true, note: "A dominant reign as Women's World Champion." },
  { rank: 8, previous: 7, wrestlerSlug: "jay-white", name: "Jay White", wins: 8, losses: 5, momentum: "Slipping", champion: false, note: "Looking to reboot after a controversial loss." },
  { rank: 9, previous: 8, wrestlerSlug: "bandido", name: "Bandido", wins: 7, losses: 3, momentum: "Strong", champion: false, note: "High-flying offense continues to wow fans." },
  { rank: 10, previous: 12, wrestlerSlug: "ilja-dragunov", name: "Ilja Dragunov", wins: 7, losses: 4, momentum: "Surging", champion: false, note: "An explosive arrival on the AEW roster." },
];

export type Rivalry = {
  slug: string;
  title: string;
  wrestlerA: string;
  wrestlerB: string;
  wrestlerASlug: string;
  wrestlerBSlug: string;
  storyline: string;
  image: string;
  upcoming: string;
  timeline: { date: string; event: string; result: string }[];
};

const gcs = "https://storage.googleapis.com/allelitewrestling-com-prod";

export const rivalries: Rivalry[] = [
  {
    slug: "page-vs-moxley",
    title: "Adam Page vs Jon Moxley",
    wrestlerA: "Adam Page",
    wrestlerB: "Jon Moxley",
    wrestlerASlug: "adam-page",
    wrestlerBSlug: "jon-moxley",
    storyline: "Two former allies. One championship. A rivalry that has escalated from respect to outright hatred, setting the stage for a defining match at Worlds End.",
    image: `${gcs}/2026/10/19/48743d99-c65a-46c1-8b28-b4515004d919.jpg`,
    upcoming: "AEW: Worlds End — December 20, 2026",
    timeline: [
      { date: "2026-11-18", event: "AEW Dynamite", result: "Page wins Continental Classic opener" },
      { date: "2026-11-14", event: "AEW Full Gear", result: "Moxley costs Page a tag match" },
      { date: "2026-10-25", event: "AEW Dynamite", result: "Face-to-face confrontation" },
    ],
  },
  {
    slug: "fps-vs-ftr",
    title: "The Elite vs FTR",
    wrestlerA: "The Elite",
    wrestlerB: "FTR",
    wrestlerASlug: "adam-page",
    wrestlerBSlug: "dax-harwood",
    storyline: "A rivalry built on mutual respect and competing philosophies. Both teams believe they are the greatest tag team in AEW — and both are willing to prove it.",
    image: `${gcs}/2026/11/17/35a814b9-7266-4d55-a114-d430c449cdfb.jpg`,
    upcoming: "AEW Dynamite — December 3, 2026",
    timeline: [
      { date: "2026-11-14", event: "AEW Full Gear", result: "FTR retains the titles" },
      { date: "2026-10-25", event: "AEW Collision", result: "FTR defeats The Elite by DQ" },
      { date: "2026-09-27", event: "AEW Dynamite", result: "The Elite win a warmup tag match" },
    ],
  },
  {
    slug: "shida-vs-athena",
    title: "Hikaru Shida vs Athena",
    wrestlerA: "Hikaru Shida",
    wrestlerB: "Athena",
    wrestlerASlug: "hikaru-shida",
    wrestlerBSlug: "athena",
    storyline: "The Women's World Championship has become the centerpiece of a fierce rivalry between two of AEW's most decorated competitors.",
    image: `${gcs}/2026/11/15/5c48b054-7891-4aff-955b-7de9fe092648.jpg`,
    upcoming: "AEW Worlds End — December 20, 2026",
    timeline: [
      { date: "2026-11-14", event: "AEW Full Gear", result: "Shida retains" },
      { date: "2026-10-10", event: "AEW Collision", result: "Athena earns a title shot" },
      { date: "2026-09-05", event: "AEW Dynamite", result: "Shida wins the championship" },
    ],
  },
];

export const getRivalry = (slug: string) =>
  rivalries.find((rivalry) => rivalry.slug === slug);

export type Poll = {
  id: string;
  question: string;
  options: { id: string; label: string; image?: string }[];
};

export const poll: Poll = {
  id: "next-challenger",
  question: "Who should challenge for the AEW World Championship next?",
  options: [
    { id: "moxley", label: "Jon Moxley", image: `${gcs}/2026/10/27/26d4cb1b-1c80-4b61-8b3e-ff249b7188c9.jpg` },
    { id: "mjf", label: "MJF", image: `${gcs}/2026/08/21/c1dcc270-cf43-4163-8f0c-bd0bc35d7bb8.jpg` },
    { id: "bandido", label: "Bandido", image: `${gcs}/2026/08/21/235f34f4-c8d4-47d7-81b8-5e145650a5b2.jpg` },
    { id: "ospreay", label: "Will Ospreay", image: `${gcs}/2026/08/21/0a56041d-8de2-4a89-b8ee-7658f68ecc7e.jpg` },
  ],
};
