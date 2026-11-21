import { GCS } from "./site";

export type Event = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  time: string;
  venue: string;
  city: string;
  poster: string;
  status: "upcoming" | "past";
  featured: boolean;
  description: string;
  ticketUrl: string;
  matchCard: { match: string; type: string; result?: string }[];
  featuredWrestlers: string[];
};

type Row = [
  slug: string,
  title: string,
  date: string,
  time: string,
  venue: string,
  city: string,
  file: string,
  status: "upcoming" | "past",
  featured?: boolean,
];

const rows: Row[] = [
  ["worlds-end", "AEW: Worlds End", "2026-12-20T20:00:00-06:00", "8:00 PM CT", "Target Center", "Minneapolis, MN", "2026/10/19/48743d99-c65a-46c1-8b28-b4515004d919.jpg", "upcoming", true],
  ["collision-green-bay", "AEW Collision: Green Bay", "2026-11-22T18:00:00-06:00", "6:00 PM CT", "Resch Center", "Green Bay, WI", "2026/09/14/9c2ca201-66bf-4ea2-80e3-b8f179ff7dd0.jpg", "upcoming"],
  ["dynamite-collision-omaha", "AEW Dynamite/Collision: Omaha", "2026-11-26T18:00:00-06:00", "6:00 PM CT", "LFCU Arena", "Ralston, NE", "2026/10/19/c429de7c-ebb5-4b1a-9831-9604ba2c445d.jpg", "upcoming"],
  ["dynamite-laredo", "AEW Dynamite: Laredo", "2026-12-03T18:00:00-06:00", "6:00 PM CT", "Sames Auto Arena", "Laredo, TX", "2026/10/19/df978e4b-a684-46eb-9ca2-dfb1b52bc370.jpg", "upcoming"],
  ["roh-final-battle", "ROH: Final Battle", "2026-12-05T19:00:00-06:00", "7:00 PM CT", "Boeing Center at Tech Port", "San Antonio, TX", "2026/10/19/81bde985-34ab-452c-b18c-4af43dabe5cb.jpg", "upcoming"],
  ["collision-san-antonio", "AEW Collision: San Antonio", "2026-12-06T18:00:00-06:00", "6:00 PM CT", "Boeing Center at Tech Port", "San Antonio, TX", "2026/10/19/057468d6-8240-4c39-ac96-8c039550bb0a.jpg", "upcoming"],
  ["winter-is-coming", "AEW Dynamite/Collision: Winter Is Coming", "2026-12-10T18:00:00-06:00", "6:00 PM CT", "Arena Monterrey", "Monterrey, MX", "2026/10/19/0c46a6d0-40d6-4252-9baa-5023800df48b.jpg", "upcoming"],
  ["oklahoma-city", "AEW Dynamite/Collision: Oklahoma City", "2026-12-17T18:00:00-06:00", "6:00 PM CT", "OG&E Coliseum", "Oklahoma City, OK", "2026/10/26/163589ff-4c25-4eaa-baa9-76fd18c5f04e.jpg", "upcoming"],
  ["holiday-bash", "AEW Dynamite/Collision: Holiday Bash", "2026-12-24T18:00:00-06:00", "6:00 PM CT", "Wintrust Arena", "Chicago, IL", "2026/10/19/0cd77dc5-e1ba-4883-84ab-7ef028989371.jpg", "upcoming"],
  ["new-years-smash", "AEW Dynamite: New Year's Smash", "2027-01-01T19:00:00-05:00", "7:00 PM ET", "Gateway Arena", "Atlanta, GA", "2026/10/23/a506473d-e9dc-4144-8cf3-e81f951550a7.jpg", "upcoming"],
  ["cedar-park", "AEW Dynamite: Cedar Park", "2027-01-07T18:00:00-06:00", "6:00 PM CT", "H-E-B Center", "Cedar Park, TX", "2026/11/16/d744cc55-22e1-4a7b-8331-cdbbf7d3e927.jpg", "upcoming"],
  ["full-gear-2026", "AEW Full Gear", "2026-11-14T19:00:00-05:00", "7:00 PM ET", "Prudential Center", "Newark, NJ", "2026/11/15/5c48b054-7891-4aff-955b-7de9fe092648.jpg", "past"],
  ["blood-guts-2026", "AEW Blood and Guts", "2026-11-04T19:00:00-05:00", "7:00 PM ET", "Daily's Place", "Jacksonville, FL", "2026/11/05/e9dfb4c9-bbdc-4801-afc0-e29f7663012f.jpg", "past"],
  ["fright-night-2026", "AEW Fright Night Collision", "2026-10-31T19:00:00-04:00", "7:00 PM ET", "Daily's Place", "Jacksonville, FL", "2026/11/02/9ad9802c-daff-4a7a-9c8d-9fad89a5f426.jpg", "past"],
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const cardFor = (title: string, status: "upcoming" | "past") =>
  status === "upcoming"
    ? [
        { match: "AEW World Championship", type: "Singles", result: undefined },
        { match: "Continental Classic League Match", type: "Tournament", result: undefined },
        { match: "Women's World Championship", type: "Singles", result: undefined },
      ]
    : [
        { match: "AEW World Championship", type: "Singles", result: "Retained" },
        { match: "Continental Classic League Match", type: "Tournament", result: "Decision" },
        { match: "Women's World Championship", type: "Singles", result: "Retained" },
      ];

export const events: Event[] = rows.map(
  ([slug, title, date, time, venue, city, file, status, featured]) => ({
    slug,
    title,
    date,
    dateLabel: formatDate(date),
    time,
    venue,
    city,
    poster: `${GCS}/${file}`,
    status,
    featured: Boolean(featured),
    description: `${title} comes to ${venue} in ${city}. Expect world-class athletic competition, unforgettable moments, and the spectacle that only All Elite Wrestling can deliver.`,
    ticketUrl: status === "upcoming" ? "https://www.axs.com/events/1629349/aew-world-s-end-tickets" : "#",
    matchCard: cardFor(title, status),
    featuredWrestlers: ["adam-page", "jon-moxley", "hikaru-shida", "bryan-danielson"],
  }),
);

export const upcomingEvents = events.filter((event) => event.status === "upcoming");
export const pastEvents = events.filter((event) => event.status === "past");
export const featuredEvent = events[0];

export const getEvent = (slug: string) =>
  events.find((event) => event.slug === slug);
