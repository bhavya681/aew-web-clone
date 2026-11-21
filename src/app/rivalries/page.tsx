import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, CalendarDays, Swords } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { rivalries } from "@/data/extras";

export const metadata: Metadata = {
  title: "AEW Rivalries",
  description:
    "Follow the defining AEW rivalries, the storylines behind them, and every moment that raised the stakes.",
};

const escalation = [
  {
    number: "01",
    title: "The spark",
    body: "A confrontation, a stolen win, or a title that suddenly means more than the belt itself.",
  },
  {
    number: "02",
    title: "The escalation",
    body: "Promos turn personal. Interference becomes routine. Every match feels like a reckoning.",
  },
  {
    number: "03",
    title: "The reckoning",
    body: "The feud finally reaches a stage where the only answer is one more match.",
  },
];

export default function RivalriesPage() {
  const totalMoments = rivalries.reduce((sum, rivalry) => sum + rivalry.timeline.length, 0);

  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden border-b border-white/10 bg-black">
        <div className="absolute inset-0">
          <SafeImage
            src={rivalries[0].image}
            alt={rivalries[0].title}
            priority
            sizes="100vw"
            position="center 30%"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/55" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="shell relative flex min-h-[78vh] flex-col justify-end py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Rivalries" }]} />
          <div className="mt-12 max-w-4xl sm:mt-16">
            <p className="eyebrow flex items-center gap-3 text-gold-bright">
              <Swords size={15} /> Feuds & fallout
            </p>
            <h1 className="display mt-5 text-[clamp(3.5rem,9vw,8.5rem)] text-white">
              Bad blood.
              <br />
              <span className="text-gold">Big stakes.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-cream/70 sm:text-base">
              Every great match starts with a story. Track the grudges, betrayals, and unfinished
              business driving the AEW Universe forward.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#feuds" className="btn-gold">
                Explore the feuds <ArrowRight size={16} />
              </a>
              <Link href="/rankings" className="btn-outline">
                See the rankings <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="mt-14 grid gap-5 border-t border-white/20 pt-6 sm:grid-cols-3">
            <div>
              <p className="display text-3xl text-gold-bright">{rivalries.length}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-cream/45">Active feuds</p>
            </div>
            <div>
              <p className="display text-3xl text-gold-bright">{totalMoments}</p>
              <p className="mt-1 text-[10px] uppercase tracking-widest text-cream/45">Timeline moments</p>
            </div>
            <div className="min-w-0">
              <p className="eyebrow text-gold-bright">Next collision</p>
              <p className="mt-2 truncate text-xs font-bold uppercase tracking-widest text-white">
                {rivalries[0].upcoming}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="feuds" className="shell scroll-mt-20 py-14 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="The front burners"
            title={<>Feuds worth <span className="text-gold">watching.</span></>}
            description="Choose a rivalry to follow the full storyline, key moments, and what comes next."
          />
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {rivalries.map((rivalry, index) => (
            <Reveal key={rivalry.slug} delay={0.08 * index}>
              <Link
                href={`/rivalries/${rivalry.slug}`}
                className="group flex h-full flex-col border border-white/10 bg-panel transition duration-300 hover:border-gold/60"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <SafeImage
                    src={rivalry.image}
                    alt={rivalry.title}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel via-black/20 to-transparent" />
                  <span className="absolute left-3 top-3 flex max-w-[85%] items-center gap-2 border border-gold/40 bg-black/75 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-widest text-gold backdrop-blur-sm">
                    <CalendarDays size={12} className="shrink-0" />
                    <span className="truncate">{rivalry.upcoming}</span>
                  </span>
                  <span className="absolute bottom-3 right-3 flex size-9 items-center justify-center border border-white/30 bg-black/60 text-white transition group-hover:border-gold group-hover:text-gold">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="eyebrow text-gold">Feud file · {rivalry.timeline.length} moments</p>
                  <h3 className="display mt-3 text-3xl leading-tight text-white transition group-hover:text-gold-bright">
                    {rivalry.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-widest text-cream/55">
                    <span>{rivalry.wrestlerA}</span>
                    <span className="display text-gold">VS</span>
                    <span>{rivalry.wrestlerB}</span>
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-cream/55">
                    {rivalry.storyline}
                  </p>
                  <span className="mt-auto flex items-center gap-2 border-t border-white/10 pt-5 text-[11px] font-black uppercase tracking-widest text-gold">
                    Read the full feud <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/40 py-14 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Anatomy of a feud"
              title={<>From words to <span className="text-gold">war.</span></>}
              description="Rivalries in AEW rarely stay contained. Here is how a dispute becomes can't-miss television."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-3">
              {escalation.map((item) => (
                <div key={item.number} className="border border-white/10 bg-black/40 p-5">
                  <p className="display text-3xl text-gold/60">{item.number}</p>
                  <p className="display mt-4 text-xl text-white">{item.title}</p>
                  <p className="mt-3 text-xs leading-relaxed text-cream/50">{item.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell py-14 sm:py-20">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border border-gold/30 bg-gradient-to-r from-gold/15 to-transparent p-6 sm:flex-row sm:items-center sm:p-9">
            <div className="min-w-0">
              <p className="eyebrow text-gold-bright">Have a take?</p>
              <p className="display mt-2 text-3xl text-white sm:text-4xl">
                Decide who gets the next title shot.
              </p>
              <p className="mt-3 text-sm text-cream/60">
                Cast your vote in the latest fan poll and see how the Universe is leaning.
              </p>
            </div>
            <Link href="/polls" className="btn-gold shrink-0">
              Vote now <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
