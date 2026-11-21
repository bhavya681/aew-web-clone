import type { Metadata } from "next";
import { Crown, Flame, Info, Minus, TrendingDown, TrendingUp, Trophy } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { rankings, type Ranking } from "@/data/extras";
import { getWrestler } from "@/data/wrestlers";

export const metadata: Metadata = {
  title: "AEW Power Rankings",
  description:
    "The latest AEW power rankings with movement, records, momentum, championship status, and analyst notes.",
};

const momentumStyles: Record<Ranking["momentum"], string> = {
  Surging: "border-gold-bright/60 bg-gold/15 text-gold-bright",
  Strong: "border-gold/40 bg-gold/10 text-gold",
  Steady: "border-white/20 bg-white/5 text-cream/65",
  Slipping: "border-red-400/40 bg-red-500/10 text-red-300",
};

const methodItems = [
  {
    number: "01",
    title: "Results first",
    body: "Quality wins, title defenses, and performances on Dynamite and Collision carry the most weight.",
  },
  {
    number: "02",
    title: "Momentum matters",
    body: "Recent form, winning streaks, and the direction of a character's push shape the movement column.",
  },
  {
    number: "03",
    title: "Context applied",
    body: "Injuries, interference, faction support, and championship stakes are reviewed by the editorial desk.",
  },
];

function rankLabel(rank: number) {
  return rank.toString().padStart(2, "0");
}

function winRate(ranking: Ranking) {
  const total = ranking.wins + ranking.losses;
  return total ? Math.round((ranking.wins / total) * 100) : 0;
}

function Movement({ ranking }: { ranking: Ranking }) {
  const delta = ranking.previous - ranking.rank;
  const Icon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
  const label = delta > 0 ? `Up ${delta}` : delta < 0 ? `Down ${Math.abs(delta)}` : "Holding";
  const tone = delta > 0 ? "text-emerald-400" : delta < 0 ? "text-red-400" : "text-cream/40";

  return (
    <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${tone}`}>
      <Icon size={15} /> {label}
    </span>
  );
}

function Competitor({ ranking, compact = false }: { ranking: Ranking; compact?: boolean }) {
  const profile = getWrestler(ranking.wrestlerSlug);
  const name = profile?.name ?? ranking.name;

  return (
    <div className="flex min-w-0 items-center gap-3">
      {profile ? (
        <Link
          href={`/roster/${profile.slug}`}
          className={`relative shrink-0 overflow-hidden border border-white/10 bg-black transition hover:border-gold ${compact ? "size-14" : "size-16"}`}
        >
          <SafeImage src={profile.image} alt={name} sizes="80px" position="center 20%" />
        </Link>
      ) : (
        <span className={`flex shrink-0 items-center justify-center border border-gold/30 bg-gold/10 font-display text-gold ${compact ? "size-14 text-lg" : "size-16 text-xl"}`}>
          {name.charAt(0)}
        </span>
      )}
      <div className="min-w-0">
        {profile ? (
          <Link
            href={`/roster/${profile.slug}`}
            className={`display block truncate text-white transition hover:text-gold-bright ${compact ? "text-xl" : "text-2xl"}`}
          >
            {name}
          </Link>
        ) : (
          <p className={`display truncate text-white ${compact ? "text-xl" : "text-2xl"}`}>{name}</p>
        )}
        <p className="mt-1 truncate text-[10px] uppercase tracking-widest text-cream/40">
          {profile ? profile.faction : "Independent"}
        </p>
        {ranking.champion ? (
          <p className="mt-2 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-gold">
            <Crown size={12} /> Champion
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function RankingsPage() {
  const leader = rankings[0];
  const leaderProfile = getWrestler(leader.wrestlerSlug);
  const surging = rankings.filter((entry) => entry.momentum === "Surging").slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-black">
        <div className="absolute inset-0">
          {leaderProfile ? (
            <SafeImage
              src={leaderProfile.image}
              alt={leaderProfile.name}
              priority
              sizes="100vw"
              position="center 20%"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
        </div>
        <div className="shell relative py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Power Rankings" }]} />
          <div className="mt-12 max-w-3xl sm:mt-16">
            <p className="eyebrow flex items-center gap-3 text-gold-bright">
              <span className="h-px w-8 bg-gold" /> Editorial power rankings
            </p>
            <h1 className="display mt-5 text-[clamp(3.5rem,9vw,8rem)] text-white">
              The pecking <span className="text-gold">order.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-cream/65 sm:text-base">
              Ten competitors. One list. Every win, loss, title reign, and statement tracked by the
              AEW editorial desk. See who is climbing and who is sliding.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#board" className="btn-gold">
                View the board <TrendingUp size={16} />
              </a>
              <Link href="/rivalries" className="btn-outline">
                Explore rivalries <Trophy size={16} />
              </Link>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-white/15 pt-6">
            <p className="eyebrow text-cream/40">Current leader</p>
            <p className="display text-2xl text-gold-bright sm:text-3xl">{leader.name}</p>
            <p className="text-xs uppercase tracking-widest text-cream/45">
              {leader.wins}–{leader.losses} · {leader.momentum}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/50">
        <div className="shell grid gap-8 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="The methodology"
              title={<>How the board <span className="text-gold">moves.</span></>}
              description="These are editorial rankings, not official AEW standings. Each cycle is reviewed after the major events on the calendar."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-white/10 bg-black/50 p-5 sm:p-7">
              <div className="flex items-start gap-3 border-b border-white/10 pb-5">
                <Info size={18} className="mt-0.5 shrink-0 text-gold" />
                <p className="text-sm leading-relaxed text-cream/65">
                  Movement compares this edition with the previous one. A lower rank number means
                  a competitor climbed the board.
                </p>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {methodItems.map((item) => (
                  <div key={item.number}>
                    <p className="display text-2xl text-gold/70">{item.number}</p>
                    <p className="mt-2 text-sm font-bold text-white">{item.title}</p>
                    <p className="mt-2 text-xs leading-relaxed text-cream/45">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="board" className="shell scroll-mt-20 py-14 sm:py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              eyebrow="Top ten"
              title={<>Current <span className="text-gold">rankings.</span></>}
              description="Form, momentum, and championship pedigree across the AEW roster."
            />
            <p className="eyebrow text-cream/35">Updated after each pay-per-view cycle</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:hidden">
          {rankings.map((ranking, index) => (
            <Reveal key={ranking.wrestlerSlug} delay={Math.min(index, 6) * 0.04}>
              <article className="border border-white/10 bg-panel p-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="display text-4xl leading-none text-gold/70">{rankLabel(ranking.rank)}</span>
                  <Movement ranking={ranking} />
                </div>
                <div className="mt-4">
                  <Competitor ranking={ranking} compact />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-cream/60">{ranking.note}</p>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
                  <span className="border border-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-cream/60">
                    {ranking.wins}–{ranking.losses} · {winRate(ranking)}%
                  </span>
                  <span className={`border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${momentumStyles[ranking.momentum]}`}>
                    {ranking.momentum}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08} className="mt-10 hidden md:block">
          <div className="overflow-x-auto border border-white/10 bg-panel">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-black/50">
                  <th scope="col" className="eyebrow px-5 py-4 text-gold">Rank</th>
                  <th scope="col" className="eyebrow px-5 py-4 text-gold">Competitor</th>
                  <th scope="col" className="eyebrow px-5 py-4 text-gold">Movement</th>
                  <th scope="col" className="eyebrow px-5 py-4 text-gold">Record</th>
                  <th scope="col" className="eyebrow px-5 py-4 text-gold">Momentum</th>
                  <th scope="col" className="eyebrow px-5 py-4 text-gold">Analyst note</th>
                </tr>
              </thead>
              <tbody>
                {rankings.map((ranking) => (
                  <tr
                    key={ranking.wrestlerSlug}
                    className="border-b border-white/5 transition last:border-b-0 hover:bg-white/[0.035]"
                  >
                    <td className="px-5 py-5 align-middle">
                      <span className="display text-4xl text-gold/70">{rankLabel(ranking.rank)}</span>
                    </td>
                    <td className="px-5 py-5 align-middle">
                      <Competitor ranking={ranking} />
                    </td>
                    <td className="px-5 py-5 align-middle">
                      <Movement ranking={ranking} />
                    </td>
                    <td className="px-5 py-5 align-middle">
                      <p className="display text-xl text-white">{ranking.wins}–{ranking.losses}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-widest text-cream/35">
                        {winRate(ranking)}% win rate
                      </p>
                    </td>
                    <td className="px-5 py-5 align-middle">
                      <span className={`inline-flex border px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${momentumStyles[ranking.momentum]}`}>
                        {ranking.momentum}
                      </span>
                    </td>
                    <td className="max-w-sm px-5 py-5 align-middle text-sm leading-relaxed text-cream/55">
                      {ranking.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <section className="border-t border-white/10 bg-panel/40 py-14 sm:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Momentum watch"
              title={<>Trending <span className="text-gold">up.</span></>}
              description="The competitors whose stock is rising fastest heading into the next major event."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {surging.map((ranking, index) => {
              const profile = getWrestler(ranking.wrestlerSlug);
              return (
                <Reveal key={ranking.wrestlerSlug} delay={0.07 * index}>
                  <article className="group relative overflow-hidden border border-white/10 bg-black">
                    <div className="relative aspect-[4/5]">
                      {profile ? (
                        <SafeImage
                          src={profile.image}
                          alt={profile.name}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          position="center 20%"
                          className="transition duration-700 group-hover:scale-105"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <span className="absolute right-3 top-3 flex items-center gap-1.5 bg-gold px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                        <Flame size={12} /> {ranking.momentum}
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <p className="eyebrow text-gold-bright">No. {rankLabel(ranking.rank)}</p>
                        <p className="display mt-2 text-3xl text-white">{ranking.name}</p>
                        <p className="mt-2 text-xs leading-relaxed text-cream/55">{ranking.note}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
