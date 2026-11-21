import { GCS } from "./site";

export type Match = {
  slug: string;
  title: string;
  wrestlerA: string;
  wrestlerB: string;
  wrestlerASlug?: string;
  wrestlerBSlug?: string;
  matchType: string;
  event: string;
  eventSlug: string;
  date: string;
  result: string;
  championship?: string;
  duration: string;
  image: string;
  youtubeId?: string;
};

const rows: [
  string, string, string, string, string | undefined, string | undefined,
  string, string, string, string, string, string | undefined, string, string, string | undefined,
][] = [
  ["page-moxley-worlds-end", "Adam Page vs Jon Moxley", "Adam Page", "Jon Moxley", "adam-page", "jon-moxley", "Singles", "AEW: Worlds End", "worlds-end", "2026-12-20", "Scheduled", "AEW World Championship", "—", "2026/10/19/48743d99-c65a-46c1-8b28-b4515004d919.jpg", undefined],
  ["page-bandido-classic", "Hangman Page vs Bandido", "Adam Page", "Bandido", "adam-page", "bandido", "Continental Classic", "AEW Dynamite", "dynamite-collision-omaha", "2026-11-18", "Win by pinfall", undefined, "18:42", "2026/11/19/f964a16f-f34c-4a1d-8527-091daf01003a.jpeg", "X1bTcp4UJM8"],
  ["moxley-cassidy-classic", "Jon Moxley vs Orange Cassidy", "Jon Moxley", "Orange Cassidy", "jon-moxley", undefined, "Continental Classic", "AEW Dynamite", "dynamite-collision-omaha", "2026-11-18", "Win by pinfall", undefined, "14:27", "2026/11/19/489bbf73-c271-49d0-9a58-8411daac2bcf.jpg", "X1bTcp4UJM8"],
  ["cole-oreilly-final-battle", "Adam Cole vs Kyle O'Reilly", "Adam Cole", "Kyle O'Reilly", "adam-cole", undefined, "Singles", "ROH: Final Battle", "roh-final-battle", "2016-12-02", "Win by pinfall", "ROH World Championship", "22:18", "2026/11/20/43ededcd-1d19-4b23-9e63-2c206ca8b616.jpg", "WXxUDhWvQPc"],
  ["samoa-joe-perry", "Samoa Joe vs Jungle Jack Perry", "Samoa Joe", "Jack Perry", undefined, "jack-perry", "Singles", "AEW Dynamite", "dynamite-collision-omaha", "2026-11-18", "No contest", undefined, "10:32", "2026/11/19/49f8d0d1-0b6f-4a61-9bcf-b9d6eee59b92.jpg", "i2nV4Abqems"],
  ["ftr-tag-title", "FTR vs The Elite", "FTR", "The Elite", "dax-harwood", "adam-page", "Tag Team", "AEW Full Gear", "full-gear-2026", "2026-11-14", "Retained", "AEW World Tag Team Championship", "21:08", "2026/11/17/35a814b9-7266-4d55-a114-d430c449cdfb.jpg", undefined],
  ["shida-women-title", "Hikaru Shida vs Athena", "Hikaru Shida", "Athena", "hikaru-shida", "athena", "Singles", "AEW Full Gear", "full-gear-2026", "2026-11-14", "Retained", "AEW Women's World Championship", "16:34", "2026/11/15/5c48b054-7891-4aff-955b-7de9fe092648.jpg", undefined],
  ["danielson-continental", "Bryan Danielson vs Claudio Castagnoli", "Bryan Danielson", "Claudio Castagnoli", "bryan-danielson", "claudio-castagnoli", "Singles", "AEW Dynamite", "dynamite-collision-omaha", "2026-09-27", "Retained", "AEW Continental Championship", "24:11", "2026/11/19/0a24ac4e-e0d3-4bf1-a034-a1f6993fbfc4.jpg", undefined],
  ["darby-king-hardcore", "Darby Allin vs Brody King", "Darby Allin", "Brody King", "darby-allin", "brody-king", "Hardcore", "AEW Collision", "blood-guts-2026", "2026-11-04", "Win by pinfall", undefined, "12:56", "2026/11/05/e9dfb4c9-bbdc-4801-afc0-e29f7663012f.jpg", undefined],
  ["elite-trios", "The Elite vs Bullet Club Gold", "The Elite", "Bullet Club Gold", "adam-page", "jack-perry", "Trios", "AEW Full Gear", "full-gear-2026", "2026-08-02", "Retained", "AEW World Trios Championship", "19:47", "2026/11/15/5c48b054-7891-4aff-955b-7de9fe092648.jpg", undefined],
];

export const matches: Match[] = rows.map(
  ([slug, title, wrestlerA, wrestlerB, wrestlerASlug, wrestlerBSlug, matchType, event, eventSlug, date, result, championship, duration, file, youtubeId]) => ({
    slug,
    title,
    wrestlerA,
    wrestlerB,
    wrestlerASlug,
    wrestlerBSlug,
    matchType,
    event,
    eventSlug,
    date,
    result,
    championship,
    duration,
    image: `${GCS}/${file}`,
    youtubeId,
  }),
);

export const getMatch = (slug: string) => matches.find((match) => match.slug === slug);
export const matchOfTheWeek = matches[1];
