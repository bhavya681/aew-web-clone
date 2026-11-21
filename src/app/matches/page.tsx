import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, Search, Trophy } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { matchOfTheWeek, matches } from "@/data/matches";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const metadata: Metadata = {
  title: "Matches",
  description:
    "Explore AEW match archives: results, match types, championships, durations, and the nights that made history.",
};

function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function MatchesFallback() {
  return (
    <section className="shell py-14 sm:py-20">
      <div className="h-9 w-64 animate-pulse bg-white/10" />
      <div className="mt-8 h-14 w-full animate-pulse border border-white/10 bg-panel" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="aspect-[16/10] animate-pulse border border-white/10 bg-panel" />
        ))}
      </div>
    </section>
  );
}

async function MatchArchive({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q.trim() : "";
  const type = typeof params.type === "string" && params.type ? params.type : "all";
  const types = [...new Set(matches.map((match) => match.matchType))].sort();
  const term = query.toLowerCase();
  const results = matches.filter((match) => {
    if (type !== "all" && match.matchType !== type) return false;
    if (!term) return true;
    return [match.title, match.wrestlerA, match.wrestlerB, match.event, match.result, match.championship ?? ""]
      .some((value) => value.toLowerCase().includes(term));
  });

  const hrefFor = (nextType: string, nextQuery: string) => {
    const search = new URLSearchParams();
    if (nextQuery) search.set("q", nextQuery);
    if (nextType !== "all") search.set("type", nextType);
    const value = search.toString();
    return value ? `/matches?${value}` : "/matches";
  };

  return (
    <section className="shell py-14 sm:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="The archive"
          title={<>Find a <span className="text-gold">classic.</span></>}
          description="Search by superstar, event, or result. Filter by stipulation to revisit your favorite kind of match."
        />
      </Reveal>

      <form method="get" action="/matches" className="mt-9 flex flex-col gap-3 sm:flex-row">
        <input type="hidden" name="type" value={type === "all" ? "" : type} />
        <div className="relative min-w-0 flex-1">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search matches, wrestlers, events"
            aria-label="Search matches"
            className="h-14 w-full border border-white/15 bg-panel pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-cream/30 focus:border-gold"
          />
        </div>
        <button type="submit" className="btn-gold h-14 shrink-0">Search</button>
      </form>

      <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto pb-1">
        <Link
          href={hrefFor("all", query)}
          className={`shrink-0 border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition ${
            type === "all" ? "border-gold bg-gold text-black" : "border-white/15 text-cream/55 hover:border-gold hover:text-gold"
          }`}
        >
          All matches
        </Link>
        {types.map((item) => (
          <Link
            key={item}
            href={hrefFor(item, query)}
            className={`shrink-0 border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition ${
              type === item ? "border-gold bg-gold text-black" : "border-white/15 text-cream/55 hover:border-gold hover:text-gold"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-cream/45">
          <span className="text-gold">{results.length}</span> of {matches.length} matches
          {type !== "all" ? <span className="hidden sm:inline"> · {type}</span> : null}
        </p>
        {query || type !== "all" ? (
          <Link href="/matches" className="text-[11px] font-bold uppercase tracking-widest text-cream/45 transition hover:text-gold">
            Clear filters
          </Link>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 border border-white/10 bg-panel/60 px-6 py-16 text-center">
          <Search size={30} className="mx-auto text-gold" />
          <h3 className="display mt-5 text-3xl text-white">No matches found</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/50">
            That search did not turn up a bout. Try another superstar, event, or match type.
          </p>
          <Link href="/matches" className="btn-outline mt-7">Reset search</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((match, index) => (
            <Reveal key={match.slug} delay={0.04 * (index % 6)}>
              <Link
                href={`/matches/${match.slug}`}
                className="group block h-full border border-white/10 bg-panel transition hover:border-gold/60"
              >
                <span className="relative block aspect-video overflow-hidden bg-black">
                  <SafeImage
                    src={match.image}
                    alt={match.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <span className="absolute left-3 top-3 border border-gold/40 bg-black/70 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-gold">
                    {match.matchType}
                  </span>
                  {match.championship ? (
                    <span className="absolute right-3 top-3 flex size-7 items-center justify-center bg-gold text-black" title="Title match">
                      <Trophy size={12} />
                    </span>
                  ) : null}
                </span>
                <span className="block p-5">
                  <span className="eyebrow text-gold">{match.event} · {formatDate(match.date)}</span>
                  <span className="display mt-2 block text-2xl leading-tight text-white transition group-hover:text-gold-bright">
                    {match.title}
                  </span>
                  <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/10 pt-3 text-[11px] text-cream/45">
                    <span className="min-w-0">{match.wrestlerA} vs {match.wrestlerB}</span>
                    <span className="flex items-center gap-1.5 text-cream/60"><Clock size={12} className="text-gold" /> {match.duration}</span>
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-3">
                    <span className="truncate text-xs text-cream/55">{match.result}</span>
                    <ArrowUpRight size={15} className="shrink-0 text-gold" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

export default function MatchesPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <SafeImage
            src={matchOfTheWeek.image}
            alt={matchOfTheWeek.title}
            priority
            sizes="100vw"
            position="center 35%"
            className="scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/55" />
        </div>
        <div className="shell relative z-10 flex min-h-[70vh] flex-col pb-14 pt-28">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Matches" }]} />
          <div className="mt-auto pt-14">
            <Reveal className="max-w-3xl">
              <p className="eyebrow flex flex-wrap items-center gap-3 text-gold-bright">
                <span className="inline-block size-2 animate-pulse bg-gold" />
                Match of the week · {matchOfTheWeek.matchType}
              </p>
              <h1 className="display mt-5 text-[clamp(3.25rem,9vw,8.5rem)] text-white">
                Moments that <span className="text-gold">matter.</span>
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-cream/65 sm:text-base">
                {matchOfTheWeek.title} · {matchOfTheWeek.event} · {formatDate(matchOfTheWeek.date)}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/50">
                Results, stipulations, title changes, and the matches that keep the Universe talking.
              </p>
              <Link href={`/matches/${matchOfTheWeek.slug}`} className="btn-gold mt-8">
                Explore this match <ArrowUpRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-panel/40">
        <div className="shell grid gap-3 py-8 sm:grid-cols-3">
          <div className="flex items-center gap-4 border border-white/10 bg-panel px-5 py-5">
            <Trophy size={18} className="shrink-0 text-gold" />
            <div>
              <p className="display text-2xl leading-none text-white">{matches.filter((match) => match.championship).length}</p>
              <p className="eyebrow mt-2 text-cream/40">Title matches</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-white/10 bg-panel px-5 py-5">
            <CalendarDays size={18} className="shrink-0 text-gold" />
            <div>
              <p className="display text-2xl leading-none text-white">{new Set(matches.map((match) => match.event)).size}</p>
              <p className="eyebrow mt-2 text-cream/40">Events covered</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border border-white/10 bg-panel px-5 py-5">
            <Clock size={18} className="shrink-0 text-gold" />
            <div>
              <p className="display text-2xl leading-none text-white">{new Set(matches.map((match) => match.matchType)).size}</p>
              <p className="eyebrow mt-2 text-cream/40">Match types</p>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<MatchesFallback />}>
        <MatchArchive searchParams={searchParams} />
      </Suspense>
    </>
  );
}
