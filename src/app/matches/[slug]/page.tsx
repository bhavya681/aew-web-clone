import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock,
  ExternalLink,
  Play,
  Trophy,
  Zap,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { championships } from "@/data/championships";
import { getMatch, matches } from "@/data/matches";
import { getWrestler, type Wrestler } from "@/data/wrestlers";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parsed);
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function CompetitorCard({ name, profile }: { name: string; profile?: Wrestler }) {
  const content = (
    <>
      <span className="relative block aspect-[3/4] overflow-hidden bg-panel">
        {profile ? (
          <SafeImage
            src={profile.image}
            alt={name}
            sizes="(max-width: 640px) 50vw, 25vw"
            position="center 18%"
            className="grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-panel to-black">
            <span className="display text-7xl text-white/10">{initials(name)}</span>
          </span>
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <span className="absolute left-3 top-3 border border-gold/40 bg-black/70 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-gold">
          {profile ? "Roster profile" : "Competitor"}
        </span>
      </span>
      <span className="block border border-t-0 border-white/10 bg-panel p-5">
        <span className="eyebrow text-gold">{profile?.division ?? "AEW Universe"}</span>
        <span className="display mt-2 block text-2xl leading-tight text-white transition group-hover:text-gold-bright">
          {name}
        </span>
        {profile ? (
          <span className="mt-2 block text-xs text-cream/45">{profile.faction}</span>
        ) : null}
        <span className="mt-4 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gold">
          {profile ? "View profile" : "Profile unavailable"}
          {profile ? <ArrowUpRight size={13} /> : null}
        </span>
      </span>
    </>
  );

  return profile ? (
    <Link href={`/roster/${profile.slug}`} className="group block">
      {content}
    </Link>
  ) : (
    <div className="group block">{content}</div>
  );
}

export function generateStaticParams() {
  return matches.map((match) => ({ slug: match.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const match = getMatch(slug);
  if (!match) return { title: "Match not found" };

  return {
    title: `${match.title} — AEW Matches`,
    description: `${match.title} at ${match.event}. ${match.matchType} match, result: ${match.result}.`,
    openGraph: {
      title: match.title,
      description: `${match.event} · ${formatDate(match.date)} · ${match.result}`,
      images: [match.image],
    },
  };
}

export default async function MatchPage({ params }: Props) {
  const { slug } = await params;
  const match = getMatch(slug);
  if (!match) notFound();

  const wrestlerA = match.wrestlerASlug ? getWrestler(match.wrestlerASlug) : undefined;
  const wrestlerB = match.wrestlerBSlug ? getWrestler(match.wrestlerBSlug) : undefined;
  const championship = match.championship
    ? championships.find(
        (title) => title.name === match.championship || title.shortName === match.championship,
      )
    : undefined;
  const related = matches
    .filter(
      (item) =>
        item.slug !== match.slug &&
        (item.eventSlug === match.eventSlug || item.matchType === match.matchType),
    )
    .slice(0, 3);

  return (
    <>
      <section className="relative min-h-[68vh] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <SafeImage
            src={match.image}
            alt={match.title}
            priority
            sizes="100vw"
            position="center 35%"
            className="scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/55" />
        </div>
        <div className="shell relative z-10 flex min-h-[68vh] flex-col pb-14 pt-28">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Matches", href: "/matches" },
              { label: match.title },
            ]}
          />
          <div className="mt-auto pt-14">
            <Reveal className="max-w-4xl">
              <p className="eyebrow flex flex-wrap items-center gap-3 text-gold-bright">
                <span className="h-px w-8 bg-gold" />
                {match.matchType} · {match.event}
              </p>
              <h1 className="display mt-5 text-[clamp(3.25rem,9vw,8.5rem)] text-white">{match.title}</h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider text-cream/55">
                <span className="flex items-center gap-2"><CalendarDays size={14} className="text-gold" /> {formatDate(match.date)}</span>
                <span className="flex items-center gap-2"><Clock size={14} className="text-gold" /> {match.duration}</span>
                <span className="flex items-center gap-2 text-gold"><Trophy size={14} /> {match.result}</span>
              </div>
              {match.championship ? (
                championship ? (
                  <Link
                    href={`/championships/${championship.slug}`}
                    className="mt-7 inline-flex items-center gap-2 border border-gold/50 bg-gold/10 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gold transition hover:bg-gold hover:text-black"
                  >
                    <Trophy size={15} /> {match.championship} <ArrowUpRight size={13} />
                  </Link>
                ) : (
                  <div className="mt-7 inline-flex items-center gap-2 border border-gold/40 bg-black/60 px-4 py-3 text-xs font-bold uppercase tracking-wider text-gold">
                    <Trophy size={15} /> {match.championship}
                  </div>
                )
              ) : null}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="The competitors"
            title={<>Two paths. <span className="text-gold">One ring.</span></>}
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:mx-auto lg:max-w-3xl">
          <CompetitorCard name={match.wrestlerA} profile={wrestlerA} />
          <CompetitorCard name={match.wrestlerB} profile={wrestlerB} />
        </div>
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold/50" />
          <span className="display text-xl text-gold">Vs</span>
          <span className="h-px w-12 bg-gold/50" />
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/30 py-16 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-gold">Match file</p>
            <h2 className="display mt-3 text-3xl text-white sm:text-4xl">The details</h2>
            <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {[
                { label: "Match type", value: match.matchType },
                { label: "Event", value: match.event },
                { label: "Date", value: formatDate(match.date) },
                { label: "Result", value: match.result },
                { label: "Duration", value: match.duration },
                { label: "Championship", value: match.championship ?? "Not on the line" },
              ].map((detail) => (
                <div key={detail.label} className="flex items-start justify-between gap-4 py-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cream/35">{detail.label}</span>
                  <span className="max-w-[65%] text-right text-sm font-semibold text-white">{detail.value}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            <p className="eyebrow text-gold">From the vault</p>
            <h2 className="display mt-3 text-3xl text-white sm:text-4xl">Watch the action</h2>
            <div className="mt-6">
              {match.youtubeId ? (
                <>
                  <div className="relative aspect-video overflow-hidden border border-white/10 bg-black">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(match.youtubeId)}`}
                      title={`${match.title} video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="absolute inset-0 size-full border-0"
                    />
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${encodeURIComponent(match.youtubeId)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gold transition hover:text-gold-bright"
                  >
                    Watch on YouTube <ExternalLink size={12} />
                  </a>
                </>
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center border border-white/10 bg-panel px-6 text-center">
                  <span className="flex size-14 items-center justify-center border border-gold/40 text-gold">
                    <Play size={22} />
                  </span>
                  <p className="display mt-5 text-2xl text-white sm:text-3xl">Full match footage unavailable</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/50">
                    No video is embedded for this bout. Explore the archive for more matchups and highlights.
                  </p>
                  <Link href="/matches" className="btn-outline mt-6 !py-3 !text-sm">
                    Browse the archive <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Keep watching"
            title={<>More from <span className="text-gold">the night.</span></>}
            description="Other bouts from the same event and stipulation."
            action={<Link href="/matches" className="btn-outline !py-3 !text-sm">All matches <ArrowUpRight size={15} /></Link>}
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item, index) => (
            <Reveal key={item.slug} delay={0.06 * index}>
              <Link
                href={`/matches/${item.slug}`}
                className="group block h-full border border-white/10 bg-panel transition hover:border-gold/60"
              >
                <span className="relative block aspect-video overflow-hidden bg-black">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute left-3 top-3 flex items-center gap-1.5 border border-gold/40 bg-black/70 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-gold">
                    <Zap size={10} /> {item.matchType}
                  </span>
                </span>
                <span className="block p-5">
                  <span className="eyebrow text-gold">{item.event}</span>
                  <span className="display mt-2 block text-xl leading-tight text-white group-hover:text-gold-bright">
                    {item.title}
                  </span>
                  <span className="mt-3 flex items-center justify-between gap-3 border-t border-white/10 pt-3 text-[11px] text-cream/45">
                    <span>{item.result}</span>
                    <span className="flex items-center gap-1.5 text-gold">
                      Details <ArrowRight size={12} />
                    </span>
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        {related.length === 0 ? (
          <div className="mt-10 border border-white/10 bg-panel/60 p-8 text-sm leading-relaxed text-cream/55">
            No other bouts from this event are indexed yet. Browse the full match archive for more.
          </div>
        ) : null}
      </section>
    </>
  );
}
