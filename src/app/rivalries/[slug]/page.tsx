import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock, Swords } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { getRivalry, rivalries } from "@/data/extras";
import { getWrestler } from "@/data/wrestlers";

export const instant = false;

type RivalryPageProps = {
  params: Promise<{ slug: string }>;
};

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatDate(value: string) {
  const [year, month, day] = value.split("-");
  const monthIndex = Number(month) - 1;
  if (!year || !day || monthIndex < 0 || monthIndex > 11) return value;
  return `${months[monthIndex]} ${day}, ${year}`;
}

function WrestlerLink({ slug, name }: { slug: string; name: string }) {
  const profile = getWrestler(slug);

  if (!profile) {
    return (
      <div className="flex min-w-0 items-center gap-3 border border-white/15 bg-black/50 p-3">
        <span className="flex size-11 shrink-0 items-center justify-center border border-gold/30 bg-gold/10 font-display text-lg text-gold">
          {name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="display block truncate text-lg text-white">{name}</span>
          <span className="mt-1 block text-[9px] uppercase tracking-widest text-cream/35">
            Profile unavailable
          </span>
        </span>
      </div>
    );
  }

  return (
    <Link
      href={`/roster/${profile.slug}`}
      className="group flex min-w-0 items-center gap-3 border border-white/15 bg-black/50 p-3 transition hover:border-gold/60"
    >
      <span className="relative size-11 shrink-0 overflow-hidden border border-white/10 bg-black">
        <SafeImage src={profile.image} alt={name} sizes="44px" position="center 20%" />
      </span>
      <span className="min-w-0">
        <span className="display block truncate text-lg text-white transition group-hover:text-gold-bright">
          {name}
        </span>
        <span className="mt-1 flex items-center gap-1 text-[9px] uppercase tracking-widest text-gold">
          View profile <ArrowUpRight size={10} />
        </span>
      </span>
    </Link>
  );
}

export function generateStaticParams() {
  return rivalries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: RivalryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const rivalry = getRivalry(slug);

  if (!rivalry) {
    return {
      title: "Rivalry not found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: rivalry.title,
    description: rivalry.storyline,
    openGraph: {
      title: rivalry.title,
      description: rivalry.storyline,
      images: [rivalry.image],
    },
  };
}

export default async function RivalryDetailPage({ params }: RivalryPageProps) {
  const { slug } = await params;
  const rivalry = getRivalry(slug);

  if (!rivalry) notFound();

  const others = rivalries.filter((item) => item.slug !== rivalry.slug);

  return (
    <>
      <section className="relative min-h-[85vh] overflow-hidden border-b border-white/10 bg-black">
        <div className="absolute inset-0">
          <SafeImage
            src={rivalry.image}
            alt={rivalry.title}
            priority
            sizes="100vw"
            position="center 30%"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/70" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="shell relative flex min-h-[85vh] flex-col justify-end py-14 sm:py-20">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Rivalries", href: "/rivalries" },
              { label: rivalry.title },
            ]}
          />
          <div className="mt-12 max-w-5xl sm:mt-16">
            <p className="eyebrow flex items-center gap-3 text-gold-bright">
              <Swords size={15} /> Feud file
            </p>
            <h1 className="display mt-5 break-words text-[clamp(3rem,8vw,7.5rem)] leading-[0.86] text-white">
              {rivalry.wrestlerA}
              <span className="block text-gold">vs</span>
              {rivalry.wrestlerB}
            </h1>
            <p className="mt-7 max-w-3xl text-sm leading-relaxed text-cream/70 sm:text-base">
              {rivalry.storyline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex max-w-full items-center gap-2 border border-gold/50 bg-black/60 px-4 py-3 text-xs font-bold uppercase tracking-widest text-gold-bright backdrop-blur-sm">
                <CalendarDays size={15} className="shrink-0" />
                <span className="truncate">{rivalry.upcoming}</span>
              </div>
              <a href="#timeline" className="btn-gold">
                Follow the timeline <ArrowRight size={16} />
              </a>
            </div>
            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
              <WrestlerLink slug={rivalry.wrestlerASlug} name={rivalry.wrestlerA} />
              <WrestlerLink slug={rivalry.wrestlerBSlug} name={rivalry.wrestlerB} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/40 py-14 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold" /> The story so far
            </p>
            <h2 className="display mt-4 text-4xl text-white sm:text-5xl">
              It never stayed <span className="text-gold">personal.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="relative border-l-2 border-gold pl-6 sm:pl-8">
              <p className="text-base leading-relaxed text-cream/70 sm:text-lg">
                {rivalry.storyline}
              </p>
              <footer className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-widest text-cream/40">
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-gold" /> {rivalry.timeline.length} key moments
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={13} className="text-gold" /> {rivalry.upcoming}
                </span>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section id="timeline" className="shell scroll-mt-20 py-14 sm:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Blow by blow"
            title={<>The <span className="text-gold">timeline.</span></>}
            description="Every turn, twist, and result that brought this rivalry to its current flashpoint."
          />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 overflow-x-auto border border-white/10 bg-panel">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-black/50">
                  <th scope="col" className="eyebrow w-20 px-5 py-4 text-gold">No.</th>
                  <th scope="col" className="eyebrow px-5 py-4 text-gold">Date</th>
                  <th scope="col" className="eyebrow px-5 py-4 text-gold">Event</th>
                  <th scope="col" className="eyebrow px-5 py-4 text-gold">Result</th>
                </tr>
              </thead>
              <tbody>
                {rivalry.timeline.map((moment, index) => (
                  <tr
                    key={`${moment.date}-${moment.event}`}
                    className="border-b border-white/5 transition last:border-b-0 hover:bg-white/[0.035]"
                  >
                    <td className="px-5 py-5 align-middle">
                      <span className="display text-3xl text-gold/60">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-5 align-middle text-xs font-bold uppercase tracking-widest text-cream/55">
                      {formatDate(moment.date)}
                    </td>
                    <td className="px-5 py-5 align-middle">
                      <span className="display text-xl text-white">{moment.event}</span>
                    </td>
                    <td className="px-5 py-5 align-middle text-sm leading-relaxed text-cream/60">
                      {moment.result}
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
            <div className="flex flex-wrap items-end justify-between gap-5">
              <SectionHeading
                eyebrow="Keep following"
                title={<>Other <span className="text-gold">feuds.</span></>}
                description="There is always another score to settle in the AEW Universe."
              />
              <Link href="/rivalries" className="btn-outline !py-3 !text-sm">
                All rivalries <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {others.map((item, index) => (
              <Reveal key={item.slug} delay={0.08 * index}>
                <Link
                  href={`/rivalries/${item.slug}`}
                  className="group grid gap-0 border border-white/10 bg-black transition hover:border-gold/60 sm:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden sm:aspect-auto sm:min-h-44">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col p-5">
                    <p className="eyebrow text-gold">{item.upcoming}</p>
                    <p className="display mt-2 text-2xl leading-tight text-white transition group-hover:text-gold-bright">
                      {item.title}
                    </p>
                    <span className="mt-auto flex items-center gap-2 pt-5 text-[11px] font-black uppercase tracking-widest text-gold">
                      Open feud file <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
