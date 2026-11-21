import { GCS } from "./site";

export type VideoCategory =
  | "Latest Videos"
  | "Match Highlights"
  | "Full Matches"
  | "Interviews"
  | "Promos"
  | "Behind the Scenes"
  | "Event Recaps";

export type Video = {
  slug: string;
  title: string;
  category: VideoCategory;
  duration: string;
  thumbnail: string;
  youtubeId: string;
  date: string;
  description: string;
  featured?: boolean;
};

type Row = [
  slug: string,
  title: string,
  category: VideoCategory,
  duration: string,
  file: string,
  youtubeId: string,
  description: string,
  featured?: boolean,
];

const rows: Row[] = [
  ["toni-storm-tapes-trailer", "The Toni Storm Tapes | Official Trailer", "Promos", "01:42", "2026/11/20/9169284e-9656-4062-a244-093b6e655736.jpg", "tEPec7s_COg", "Five parts. One story. The tapes premiere November 27.", true],
  ["adam-cole-kyle-oreilly-full-match", "FULL MATCH: Adam Cole vs. Kyle O'Reilly | ROH World Title", "Full Matches", "22:18", "2026/11/20/43ededcd-1d19-4b23-9e63-2c206ca8b616.jpg", "WXxUDhWvQPc", "A classic rivalry renewed for the ROH World Championship."],
  ["hangman-page-bandido", "Hangman Page vs Bandido | Continental Classic", "Match Highlights", "12:45", "2026/11/19/f964a16f-f34c-4a1d-8527-091daf01003a.jpeg", "X1bTcp4UJM8", "Blue League action from AEW Dynamite."],
  ["samoa-joe-jack-perry", "Samoa Joe and Jungle Jack Perry Go One-on-One", "Match Highlights", "10:32", "2026/11/19/49f8d0d1-0b6f-4a61-9bcf-b9d6eee59b92.jpg", "i2nV4Abqems", "Two heavyweights collide on Dynamite."],
  ["don-callis-ilja-dragunov", "Did Don Callis Recruit Ilja Dragunov?", "Behind the Scenes", "06:20", "2026/11/19/965dc277-9d39-4a58-9ece-b5ae46fafad3.jpg", "DpfK3Bwfo1c", "The Family grows with a shocking new addition."],
  ["mjf-worlds-end-challenge", "MJF Issues a Massive Challenge for AEW Worlds End", "Promos", "04:18", "2026/11/19/0a24ac4e-e0d3-4bf1-a034-a1f6993fbfc4.jpg", "M23T4bv-dys", "The salt of the earth makes his demands known."],
  ["wrathlander-divine-dominion", "Wrathlander Interrupted by Billy Gunn", "Latest Videos", "05:44", "2026/11/19/86c5cdab-9c68-48fd-afd9-6ec5ea5f361f.jpg", "M23T4bv-dys", "Chaos erupts on Dynamite."],
  ["kasper-brothers-tag", "The Kasper Brothers Wreck the Competition", "Match Highlights", "08:12", "2026/11/19/32d8cf60-45b6-47d3-acb1-8e45a76220df.jpg", "i2nV4Abqems", "Tag team action with devastating results."],
  ["nick-wayne-mike-bailey", "Nick Wayne vs Speedball Mike Bailey in the Classic?", "Interviews", "07:05", "2026/11/19/edea1292-6c45-4176-a0fd-d341e3ccd5a4.jpg", "DpfK3Bwfo1c", "Two rising stars discuss the tournament."],
  ["moxley-cassidy-gold-league", "Jon Moxley vs Orange Cassidy | Gold League", "Match Highlights", "14:27", "2026/11/19/489bbf73-c271-49d0-9a58-8411daac2bcf.jpg", "X1bTcp4UJM8", "A brutal Gold League clash."],
  ["ospreay-fletcher-exclusive", "Will Ospreay Urges Kyle Fletcher to Find Himself", "Interviews", "09:36", "2026/11/19/dfc9b33b-2f9a-4176-9bdd-d7754ad4adca.jpg", "M23T4bv-dys", "An exclusive conversation at Full Gear."],
  ["great-muta-arashi-full-match", "FULL MATCH: Great Muta & Arashi vs The Prophecy", "Full Matches", "19:54", "2026/11/20/b8139774-3829-420c-a4f3-2d34fb71a768.jpg", "WXxUDhWvQPc", "A legendary tag team showdown from Final Battle 2003."],
  ["kyle-fletcher-andrade", "Kyle Fletcher Interrupts Andrade El Idolo", "Promos", "03:52", "2026/11/19/ea6001fb-4a02-4c8a-9142-b1cf1ff3f4af.jpg", "M23T4bv-dys", "Tensions boil over on Dynamite."],
  ["full-gear-recap", "AEW Full Gear 2026 | Official Event Recap", "Event Recaps", "03:20", "2026/11/17/35a814b9-7266-4d55-a114-d430c449cdfb.jpg", "tEPec7s_COg", "Every major moment from Full Gear."],
];

export const videos: Video[] = rows.map(
  ([slug, title, category, duration, file, youtubeId, description, featured], index) => ({
    slug,
    title,
    category,
    duration,
    thumbnail: `${GCS}/${file}`,
    youtubeId: index < 6 ? youtubeId : "",
    date: "2026-11-20",
    description,
    featured,
  }),
);

export const videoCategories: VideoCategory[] = [
  "Latest Videos",
  "Match Highlights",
  "Full Matches",
  "Interviews",
  "Promos",
  "Behind the Scenes",
  "Event Recaps",
];

export const featuredVideo = videos[0];

export const getVideo = (slug: string) =>
  videos.find((video) => video.slug === slug);

export const youtubeEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
