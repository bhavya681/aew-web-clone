import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Trophy, Zap } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { championships, featuredChampionship } from "@/data/championships";

export const metadata: Metadata = {
  title: "Champions",
  description:
    "Every AEW championship, every current titleholder, reign length, defense count, and the legacy behind the gold.",
};

export default function ChampionsPage() {
  const longestReign = championships.reduce(
    (longest, title) => (title.reignDays > longest.reignDays ? title : longest),
    championships[0],
  );
  const totalDefenses = championships.reduce((total, title) => total + title.defenses, 0);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-ink">
        <div className="pointer-events-none absolute -left-40 top-0 size-[36rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 right-0 size-[30rem] rotate-12 border-[4rem] border-gold/5" />
        <div className="shell relative z-10 pb-14 pt-28">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Champions" }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <Reveal>
              <p className="eyebrow flex items-center gap-3 text-gold-bright">
                <span className="inline-block size-2 animate-pulse bg-gold" />
                The gold standard
              </p>
              <h1 className="display mt-5 text-[clamp(3.5rem,9vw,8.5rem)] text-white">
                Champions <span className="text-gold">of AEW.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
                Ten belts. Ten legacies. Discover who carries the gold, how long they have held it,
                and the history written into every championship.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/championships/${featuredChampionship.slug}`} className="btn-gold">
                  Featured title <ArrowUpRight size={16} />
                </Link>
                <Link href="/matches" className="btn-outline">
                  Title matches <ArrowUpRight size={15} />
                </Link>
              </div>
              <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6">
                <div>
                  <p className="display text-3xl text-white">{championships.length}</p>
                  <p className="eyebrow mt-2 text-cream/35">Championships</p>
                </div>
                <div>
                  <p className="display text-3xl text-white">{longestReign.reignDays}</p>
                  <p className="eyebrow mt-2 text-cream/35">Longest reign</p>
                </div>
                <div>
                  <p className="display text-3xl text-white">{totalDefenses}</p>
                  <p className="eyebrow mt-2 text-cream/35">Defenses</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <Link
                href={`/championships/${featuredChampionship.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden border border-gold/30 bg-panel"
              >
                <SafeImage
                  src={featuredChampionship.belt}
                  alt={featuredChampionship.name}
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  position="center 40%"
                  className="transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/25" />
                <div className="absolute inset-x-0 top-0 flex justify-between gap-3 p-5">
                  <span className="eyebrow border border-gold/50 bg-black/70 px-3 py-1.5 text-gold">
                    Featured title
                  </span>
                  <span className="flex size-9 items-center justify-center bg-gold text-black">
                    <Trophy size={16} />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <p className="eyebrow text-gold-bright">Current champion</p>
                  <h2 className="display mt-2 text-3xl leading-none text-white transition group-hover:text-gold-bright sm:text-4xl">
                    {featuredChampionship.champion}
                  </h2>
                  <p className="mt-3 text-sm text-cream/60">{featuredChampionship.name}</p>
                  <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/15 pt-4 text-[11px] font-semibold uppercase tracking-wider text-cream/45">
                    <span className="flex items-center gap-1.5"><CalendarDays size={12} className="text-gold" /> {featuredChampionship.reignDays} days</span>
                    <span className="flex items-center gap-1.5"><Zap size={12} className="text-gold" /> {featuredChampionship.defenses} defenses</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-panel/40">
        <div className="shell grid gap-6 py-8 sm:grid-cols-3">
          <div className="flex items-start gap-4">
            <Trophy size={18} className="mt-1 shrink-0 text-gold" />
            <div>
              <p className="display text-2xl text-white">Gold on every show</p>
              <p className="mt-2 text-xs leading-relaxed text-cream/45">
                Titles defended on Dynamite, Collision, and every premium event.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <CalendarDays size={18} className="mt-1 shrink-0 text-gold" />
            <div>
              <p className="display text-2xl text-white">Longest active reign</p>
              <p className="mt-2 text-xs leading-relaxed text-cream/45">
                {longestReign.champion} · {longestReign.reignDays} days with the {longestReign.shortName} title.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Zap size={18} className="mt-1 shrink-0 text-gold" />
            <div>
              <p className="display text-2xl text-white">Defended with pride</p>
              <p className="mt-2 text-xs leading-relaxed text-cream/45">
                {totalDefenses} successful title defenses across the current championships.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="The full collection"
            title={<>Every <span className="text-gold">belt.</span></>}
            description="Select a championship for its current reign, historic title changes, and recent defenses."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {championships.map((title, index) => (
            <Reveal key={title.slug} delay={0.04 * index}>
              <Link
                href={`/championships/${title.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden border border-white/10 bg-panel"
              >
                <SafeImage
                  src={title.belt}
                  alt={title.name}
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 20vw"
                  position="center 40%"
                  className="transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
                  <span className="eyebrow text-[9px] text-gold-bright">{title.shortName}</span>
                  <span className="flex size-6 shrink-0 items-center justify-center bg-gold/90 text-black">
                    <Trophy size={11} />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <p className="eyebrow text-[9px] text-cream/40">Champion</p>
                  <h3 className="display mt-1 text-lg leading-tight text-white transition group-hover:text-gold-bright sm:text-xl">
                    {title.champion}
                  </h3>
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-white/15 pt-3 text-[10px] font-semibold uppercase tracking-wider text-cream/45">
                    <span>{title.reignDays} days</span>
                    <span className="text-gold">{title.defenses} defenses</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
