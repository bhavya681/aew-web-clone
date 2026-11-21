import { GCS } from "./site";

export type Championship = {
  slug: string;
  name: string;
  shortName: string;
  belt: string;
  champion: string;
  championSlug?: string;
  championImage?: string;
  won: string;
  reignDays: number;
  defenses: number;
  description: string;
  history: { name: string; days: number; year: string }[];
  recentMatches: { opponent: string; result: string; date: string }[];
};

type Row = [
  slug: string,
  name: string,
  short: string,
  file: string,
  champion: string,
  championSlug: string | undefined,
  won: string,
  reignDays: number,
  defenses: number,
];

const rows: Row[] = [
  ["aew-world-championship", "AEW World Championship", "World", "2026/11/06/fb818f21-8556-4de3-a6ee-dd2166c0ef6e.jpg", "Adam Page", "adam-page", "2026-07-12", 132, 4],
  ["aew-womens-world-championship", "AEW Women's World Championship", "Women's World", "2026/11/06/f8e6efae-f3c6-4310-ab99-9ba0e041c261.jpg", "Hikaru Shida", "hikaru-shida", "2026-09-05", 77, 2],
  ["aew-world-tag-team-championship", "AEW World Tag Team Championship", "World Tag", "2026/11/06/3870adde-3354-40e8-9e69-70419fcca683.jpg", "FTR", "dax-harwood", "2026-08-16", 97, 3],
  ["aew-womens-world-tag-team-championship", "AEW Women's World Tag Team Championship", "Women's Tag", "2026/11/06/5d574a8c-e99a-45d1-a58f-6daf33fb55db.jpg", "Brawling Birds", "brawling-birds", "2026-10-10", 42, 1],
  ["aew-national-championship", "AEW National Championship", "National", "2026/11/06/3a791c9d-3006-4c56-a429-db2058e169c0.jpg", "Tommaso Ciampa", undefined, "2026-11-10", 11, 0],
  ["aew-international-championship", "AEW International Championship", "International", "2026/11/06/cc96833f-5e1d-4460-b42a-293fdca0df28.jpg", "Kenny Omega", "kenny-omega", "2026-06-21", 153, 5],
  ["tnt-championship", "TNT Championship", "TNT", "2026/11/06/1bcea168-bead-48dc-905d-7262cde61627.jpg", "Jack Perry", "jack-perry", "2026-10-01", 51, 2],
  ["tbs-championship", "TBS Championship", "TBS", "2026/11/06/713f0a60-84f3-4c83-bfe4-c70de35d08c4.jpg", "Athena", "athena", "2026-05-17", 188, 6],
  ["aew-continental-championship", "AEW Continental Championship", "Continental", "2026/11/06/452a46f2-ae94-4d57-b49d-c1c9c730c46f.jpg", "Bryan Danielson", "bryan-danielson", "2026-09-27", 55, 2],
  ["aew-world-trios-championship", "AEW World Trios Championship", "Trios", "2026/11/06/95a27322-c195-445f-93e6-7426bd72dc1e.jpg", "The Elite", "adam-page", "2026-08-02", 111, 3],
];

export const championships: Championship[] = rows.map(
  ([slug, name, shortName, file, champion, championSlug, won, reignDays, defenses]) => ({
    slug,
    name,
    shortName,
    belt: `${GCS}/${file}`,
    champion,
    championSlug,
    won,
    reignDays,
    defenses,
    description: `The ${name} is one of the most prestigious prizes in All Elite Wrestling. defended on Dynamite, Collision, and AEW pay-per-views, it represents the highest level of achievement in the promotion.`,
    history: [
      { name: champion, days: reignDays, year: won.slice(0, 4) },
      { name: "Previous Champion", days: 126, year: "2025" },
      { name: " inaugural Champion", days: 204, year: "2024" },
    ],
    recentMatches: [
      { opponent: "Challenger", result: "Retained", date: "2026-11-18" },
      { opponent: "Former Champion", result: "Retained", date: "2026-10-25" },
      { opponent: "Contender", result: "Retained", date: "2026-09-27" },
    ],
  }),
);

export const getChampionship = (slug: string) =>
  championships.find((championship) => championship.slug === slug);

export const featuredChampionship = championships[0];
