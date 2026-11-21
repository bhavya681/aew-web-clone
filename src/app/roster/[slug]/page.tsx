import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  MapPin,
  Ruler,
  Swords,
  Trophy,
  Users,
  Weight,
  Zap,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { championships } from "@/data/championships";
import { matches } from "@/data/matches";
import { getWrestler, wrestlers, type Wrestler } from "@/data/wrestlers";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

type MoveSetSource = { finishers?: unknown; finisher?: unknown };

function finishersFor(wrestler: Wrestler): string[] {
  const source = wrestler as unknown as MoveSetSource;
  if (Array.isArray(source.finishers)) {
    return source.finishers.filter((move): move is string => typeof move === "string" && move.length > 0);
  }
  return typeof source.finisher === "string" && source.finisher.length > 0 ? [source.finisher] : [];
}

export function generateStaticParams() {
  return wrestlers.map((wrestler) => ({ slug: wrestler.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wrestler = getWrestler(slug);
  if (!wrestler) return { title: "Superstar not found" };

  return {
    title: `${wrestler.name} — AEW Roster`,
    description: wrestler.bio,
    openGraph: {
      title: `${wrestler.name} — AEW Roster`,
      description: wrestler.bio,
      images: [wrestler.image],
    },
  };
}

export default async function WrestlerPage({ params }: Props) {
  const { slug } = await params;
  const wrestler = getWrestler(slug);
  if (!wrestler) notFound();

  const finishers = finishersFor(wrestler);
  const socials = wrestler.socials ?? [];
  const related = [
    ...wrestlers.filter((item) => item.slug !== wrestler.slug && item.faction === wrestler.faction),
    ...wrestlers.filter(
      (item) =>
        item.slug !== wrestler.slug &&
        item.division === wrestler.division &&
        item.faction !== wrestler.faction,
    ),
  ].slice(0, 6);
  const relatedMatches = matches
    .filter(
      (match) =>
        match.wrestlerASlug === slug ||
        match.wrestlerBSlug === slug ||
        match.wrestlerA === wrestler.name ||
        match.wrestlerB === wrestler.name,
    )
    .slice(0, 3);
  const titleLinks = wrestler.championships.map((name) => ({
    name,
    slug: championships.find((title) => title.name === name || title.shortName === name)?.slug,
  }));
  const facts = [
    { label: "Height", value: wrestler.height, icon: Ruler },
    { label: "Weight", value: wrestler.weight, icon: Weight },
    { label: "Hometown", value: wrestler.hometown, icon: MapPin },
    { label: "Debut", value: wrestler.debut, icon: CalendarDays },
    { label: "Style", value: wrestler.style, icon: Zap },
    { label: "Faction", value: wrestler.faction, icon: Users },
  ];

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <SafeImage
            src={wrestler.image}
            alt={wrestler.name}
            priority
            sizes="100vw"
            position="center 15%"
            className="scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/50" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="shell relative z-10 flex min-h-[78vh] flex-col pb-14 pt-28">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Roster", href: "/roster" },
              { label: wrestler.name },
            ]}
          />
          <div className="mt-auto pt-14">
            <Reveal className="max-w-4xl">
              <p className="eyebrow flex flex-wrap items-center gap-3 text-gold-bright">
                <span className="h-px w-8 bg-gold" />
                {wrestler.division} · {wrestler.faction}
              </p>
              <h1 className="display mt-5 text-[clamp(3.5rem,11vw,10rem)] text-white">{wrestler.name}</h1>
              <p className="mt-3 font-display text-2xl uppercase tracking-wide text-gold sm:text-3xl">
                &ldquo;{wrestler.nickname}&rdquo;
              </p>
              {wrestler.champion ? (
                <div className="mt-7 inline-flex items-center gap-3 border border-gold/50 bg-gold/10 px-4 py-3">
                  <Trophy size={18} className="shrink-0 text-gold" />
                  <span>
                    <span className="eyebrow block text-gold">Current champion</span>
                    <span className="mt-1 block text-sm font-semibold text-white">
                      {wrestler.title ?? "Championship holder"}
                    </span>
                  </span>
                </div>
              ) : null}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/matches" className="btn-gold">
                  Watch the matches <ArrowRight size={16} />
                </Link>
                <Link href="/champions" className="btn-outline">
                  <Trophy size={15} /> Title history
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="min-w-0 space-y-12">
            <Reveal>
              <SectionHeading
                eyebrow="The profile"
                title={<>The <span className="text-gold">story.</span></>}
              />
              <div className="mt-7 space-y-5 text-sm leading-8 text-cream/65 sm:text-base">
                <p>{wrestler.bio}</p>
                <p>{wrestler.career}</p>
              </div>
            </Reveal>

            {finishers.length > 0 ? (
              <Reveal>
                <div className="relative overflow-hidden border border-gold/30 bg-panel p-6 sm:p-8">
                  <div className="pointer-events-none absolute -right-10 -top-12 size-48 rotate-12 border-[2.5rem] border-gold/5" />
                  <div className="relative flex items-center gap-3 text-gold">
                    <Swords size={17} />
                    <p className="eyebrow">Finisher</p>
                  </div>
                  <p className="display relative mt-4 text-3xl text-white sm:text-5xl">{finishers[0]}</p>
                  {finishers.length > 1 ? (
                    <p className="relative mt-4 text-sm text-cream/50">
                      Also uses <span className="text-cream/80">{finishers.slice(1).join(", ")}</span>
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ) : null}

            {wrestler.signatureMoves.length > 0 ? (
              <Reveal>
                <p className="eyebrow text-gold">Signature moves</p>
                <div className="mt-5 border-t border-white/10">
                  {wrestler.signatureMoves.map((move, index) => (
                    <div
                      key={`${move}-${index}`}
                      className="flex items-center gap-5 border-b border-white/10 py-4 transition hover:border-gold/40"
                    >
                      <span className="font-display text-lg text-gold/60">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-semibold text-cream/85 sm:text-base">{move}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}

            {titleLinks.length > 0 ? (
              <Reveal>
                <p className="eyebrow text-gold">Championships</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {titleLinks.map((title) =>
                    title.slug ? (
                      <Link
                        key={title.name}
                        href={`/championships/${title.slug}`}
                        className="group flex items-center justify-between gap-3 border border-white/10 bg-panel px-4 py-4 transition hover:border-gold/60"
                      >
                        <span className="text-sm font-semibold text-cream/85 group-hover:text-white">{title.name}</span>
                        <ArrowUpRight size={15} className="shrink-0 text-gold" />
                      </Link>
                    ) : (
                      <div key={title.name} className="border border-white/10 bg-panel/50 px-4 py-4 text-sm text-cream/60">
                        {title.name}
                      </div>
                    ),
                  )}
                </div>
              </Reveal>
            ) : null}
          </div>

          <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="border border-white/10 bg-panel p-6 sm:p-7">
              <p className="eyebrow text-gold">Quick facts</p>
              <dl className="mt-5 divide-y divide-white/10">
                {facts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label} className="flex items-start gap-3 py-3.5">
                      <Icon size={14} className="mt-1 shrink-0 text-gold" />
                      <div className="min-w-0">
                        <dt className="text-[10px] font-bold uppercase tracking-widest text-cream/35">{fact.label}</dt>
                        <dd className="mt-1 text-sm font-semibold text-white">{fact.value}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </div>

            {socials.length > 0 ? (
              <div className="border border-white/10 bg-panel/60 p-6 sm:p-7">
                <p className="eyebrow text-gold">Follow</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-cream/70 transition hover:border-gold hover:text-gold"
                    >
                      {social.label} <ExternalLink size={11} />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="border border-gold/30 bg-gold/5 p-6 sm:p-7">
              <p className="display text-2xl leading-tight text-white">More from the Universe</p>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">
                Follow this superstar into championship fights, rivalries, and defining nights.
              </p>
              <Link href="/matches" className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gold transition hover:text-gold-bright">
                Browse the archive <ArrowUpRight size={13} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-y border-white/10 bg-panel/30 py-16 sm:py-20">
          <div className="shell">
            <Reveal>
              <SectionHeading
                eyebrow="In good company"
                title={<>Same <span className="text-gold">company.</span></>}
                description={`Other names from ${wrestler.faction} and the ${wrestler.division} division.`}
                action={<Link href="/roster" className="btn-outline !py-3 !text-sm">Full roster <ArrowUpRight size={15} /></Link>}
              />
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={0.04 * index}>
                  <Link href={`/roster/${item.slug}`} className="group relative block aspect-[3/4] overflow-hidden border border-white/10 bg-panel">
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      sizes="(max-width: 640px) 50vw, 16vw"
                      position="center 18%"
                      className="grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="display text-sm leading-tight text-white group-hover:text-gold-bright">{item.name}</p>
                      <p className="mt-1 truncate text-[9px] uppercase tracking-widest text-cream/45">{item.division}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="shell py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="In the ring"
            title={<>Recent <span className="text-gold">bouts.</span></>}
            description="A closer look at the matches that shaped this career."
          />
        </Reveal>
        {relatedMatches.length > 0 ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedMatches.map((match, index) => (
              <Reveal key={match.slug} delay={0.06 * index}>
                <Link href={`/matches/${match.slug}`} className="group block border border-white/10 bg-panel transition hover:border-gold/60">
                  <span className="relative block aspect-video overflow-hidden bg-black">
                    <SafeImage
                      src={match.image}
                      alt={match.title}
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute left-3 top-3 border border-gold/40 bg-black/70 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-gold">
                      {match.matchType}
                    </span>
                  </span>
                  <span className="block p-5">
                    <span className="eyebrow text-gold">{match.event}</span>
                    <span className="display mt-2 block text-xl leading-tight text-white group-hover:text-gold-bright">
                      {match.title}
                    </span>
                    <span className="mt-3 flex items-center justify-between gap-3 text-[11px] text-cream/45">
                      <span>{match.result}</span>
                      <span className="flex items-center gap-1.5 text-gold">
                        Details <ArrowRight size={12} />
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-start gap-5 border border-white/10 bg-panel/60 p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-cream/55">
              No archived bouts are indexed for this competitor yet. The full match archive is always open.
            </p>
            <Link href="/matches" className="btn-outline !py-3 !text-sm shrink-0">
              Explore matches <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
