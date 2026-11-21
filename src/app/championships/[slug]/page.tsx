import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CalendarDays, Trophy, Zap } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { championships, getChampionship } from "@/data/championships";
import { matches } from "@/data/matches";
import { getWrestler } from "@/data/wrestlers";

export const instant = false;

type Props = { params: Promise<{ slug: string }> };

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

export function generateStaticParams() {
  return championships.map((title) => ({ slug: title.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = getChampionship(slug);
  if (!title) return { title: "Championship not found" };

  return {
    title: `${title.name} — AEW Championships`,
    description: `${title.champion} holds the ${title.name}. ${title.description}`,
    openGraph: {
      title: title.name,
      description: `Current champion: ${title.champion}. Reign of ${title.reignDays} days with ${title.defenses} defenses.`,
      images: [title.belt],
    },
  };
}

export default async function ChampionshipPage({ params }: Props) {
  const { slug } = await params;
  const title = getChampionship(slug);
  if (!title) notFound();

  const champion = title.championSlug ? getWrestler(title.championSlug) : undefined;
  const otherTitles = championships.filter((item) => item.slug !== title.slug).slice(0, 4);
  const titleMatches = matches.filter((match) => match.championship === title.name).slice(0, 3);
  const championPortrait = champion?.image ?? title.championImage;

  return (
    <>
      <section className="relative min-h-[72vh] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <SafeImage
            src={title.belt}
            alt={title.name}
            priority
            sizes="100vw"
            position="center 40%"
            className="opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/50" />
        </div>
        <div className="shell relative z-10 flex min-h-[72vh] flex-col pb-14 pt-28">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Champions", href: "/champions" },
              { label: title.shortName },
            ]}
          />
          <div className="mt-auto grid gap-8 pt-12 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <Reveal className="min-w-0">
              <p className="eyebrow flex items-center gap-3 text-gold-bright">
                <span className="h-px w-8 bg-gold" />
                Current champion
              </p>
              <h1 className="display mt-5 text-[clamp(3rem,8vw,7.5rem)] text-white">{title.name}</h1>
              {champion ? (
                <Link
                  href={`/roster/${champion.slug}`}
                  className="group mt-7 inline-flex max-w-full items-center gap-3 border border-gold/40 bg-black/60 p-2 pr-5 transition hover:border-gold"
                >
                  <span className="relative size-14 shrink-0 overflow-hidden bg-panel">
                    <SafeImage
                      src={championPortrait ?? title.belt}
                      alt={title.champion}
                      sizes="56px"
                      position="center 18%"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block text-gold">Title holder</span>
                    <span className="display mt-1 block truncate text-xl text-white transition group-hover:text-gold-bright">
                      {title.champion}
                    </span>
                  </span>
                  <ArrowUpRight size={15} className="shrink-0 text-gold" />
                </Link>
              ) : (
                <div className="mt-7 inline-flex max-w-full items-center gap-3 border border-white/15 bg-black/60 p-2 pr-5">
                  <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden bg-panel text-gold">
                    {championPortrait ? (
                      <SafeImage src={championPortrait} alt={title.champion} sizes="56px" position="center 18%" />
                    ) : (
                      <Trophy size={20} />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block text-cream/40">Title holder</span>
                    <span className="display mt-1 block truncate text-xl text-white">{title.champion}</span>
                  </span>
                </div>
              )}
            </Reveal>

            <Reveal delay={0.1} className="min-w-0">
              <div className="grid grid-cols-3 border border-white/15 bg-black/60 backdrop-blur-sm">
                <div className="border-r border-white/15 px-3 py-5 sm:px-5">
                  <CalendarDays size={15} className="text-gold" />
                  <p className="display mt-3 text-2xl text-white sm:text-3xl">{formatDate(title.won)}</p>
                  <p className="eyebrow mt-2 text-[9px] text-cream/40">Won</p>
                </div>
                <div className="border-r border-white/15 px-3 py-5 sm:px-5">
                  <Trophy size={15} className="text-gold" />
                  <p className="display mt-3 text-2xl text-white sm:text-3xl">{title.reignDays}</p>
                  <p className="eyebrow mt-2 text-[9px] text-cream/40">Days reigning</p>
                </div>
                <div className="px-3 py-5 sm:px-5">
                  <Zap size={15} className="text-gold" />
                  <p className="display mt-3 text-2xl text-white sm:text-3xl">{title.defenses}</p>
                  <p className="eyebrow mt-2 text-[9px] text-cream/40">Defenses</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="The legacy"
              title={<>More than <span className="text-gold">gold.</span></>}
            />
            <p className="mt-6 text-sm leading-8 text-cream/65 sm:text-base">{title.description}</p>
            {titleMatches.length > 0 ? (
              <div className="mt-9">
                <p className="eyebrow text-gold">Title matches in the archive</p>
                <div className="mt-5 border-t border-white/10">
                  {titleMatches.map((match) => (
                    <Link
                      key={match.slug}
                      href={`/matches/${match.slug}`}
                      className="group flex items-center justify-between gap-4 border-b border-white/10 py-4 transition hover:border-gold/50"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-cream/85 group-hover:text-white">
                          {match.title}
                        </span>
                        <span className="mt-1 block text-[11px] text-cream/40">
                          {match.event} · {formatDate(match.date)}
                        </span>
                      </span>
                      <ArrowUpRight size={15} className="shrink-0 text-gold" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border border-white/10 bg-panel p-6 sm:p-8">
              <p className="eyebrow text-gold">Reign summary</p>
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cream/35">Champion</p>
                  <p className="mt-2 text-sm font-semibold text-white">{title.champion}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cream/35">Division</p>
                  <p className="mt-2 text-sm font-semibold text-white">{title.shortName}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cream/35">Reign begins</p>
                  <p className="mt-2 text-sm font-semibold text-white">{formatDate(title.won)}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-cream/35">Status</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    <span className="size-1.5 animate-pulse bg-gold" /> Active reign
                  </p>
                </div>
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                <Link href="/champions" className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gold transition hover:text-gold-bright">
                  All championships <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/30 py-16 sm:py-20">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-gold">History</p>
            <h2 className="display mt-3 text-3xl text-white sm:text-4xl">Notable reigns</h2>
            <div className="mt-6 overflow-x-auto border border-white/10">
              <table className="w-full min-w-[380px] text-left text-sm">
                <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-cream/45">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Champion</th>
                    <th scope="col" className="px-4 py-3 font-bold">Days</th>
                    <th scope="col" className="px-4 py-3 font-bold">Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {title.history.map((entry, index) => (
                    <tr key={`${entry.name}-${index}`} className="transition hover:bg-white/[0.03]">
                      <td className="px-4 py-3.5 font-semibold text-white">{entry.name.trim() || "Unknown"}</td>
                      <td className="px-4 py-3.5 text-gold">{entry.days}</td>
                      <td className="px-4 py-3.5 text-cream/55">{entry.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="eyebrow text-gold">Recent defenses</p>
            <h2 className="display mt-3 text-3xl text-white sm:text-4xl">Inside the ring</h2>
            <div className="mt-6 overflow-x-auto border border-white/10">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="bg-white/5 text-[10px] uppercase tracking-widest text-cream/45">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Opponent</th>
                    <th scope="col" className="px-4 py-3 font-bold">Result</th>
                    <th scope="col" className="px-4 py-3 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {title.recentMatches.map((match, index) => (
                    <tr key={`${match.opponent}-${index}`} className="transition hover:bg-white/[0.03]">
                      <td className="px-4 py-3.5 font-semibold text-white">{match.opponent.trim()}</td>
                      <td className="px-4 py-3.5 text-gold">{match.result}</td>
                      <td className="px-4 py-3.5 text-cream/55">{formatDate(match.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="More gold"
            title={<>Other <span className="text-gold">titles.</span></>}
            description="The rest of the championship landscape is only a click away."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {otherTitles.map((item, index) => (
            <Reveal key={item.slug} delay={0.05 * index}>
              <Link
                href={`/championships/${item.slug}`}
                className="group block border border-white/10 bg-panel transition hover:border-gold/60"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-black">
                  <SafeImage
                    src={item.belt}
                    alt={item.name}
                    sizes="(max-width: 640px) 50vw, 25vw"
                    position="center 40%"
                    className="transition duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </span>
                <span className="block p-4">
                  <span className="eyebrow text-gold">{item.shortName}</span>
                  <span className="display mt-2 block text-xl leading-tight text-white group-hover:text-gold-bright">
                    {item.champion}
                  </span>
                  <span className="mt-3 block text-[11px] text-cream/40">{item.reignDays} days · {item.defenses} defenses</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
