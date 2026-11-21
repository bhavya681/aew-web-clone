import type { Metadata } from "next";
import { ArrowUpRight, Check, Info, Radio, Swords, Trophy } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PollWidget from "@/components/ui/PollWidget";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { poll, rivalries } from "@/data/extras";

export const metadata: Metadata = {
  title: "AEW Fan Polls",
  description:
    "Vote in the latest AEW fan poll and see how the Universe is leaning on the biggest questions in wrestling.",
};

const votingNotes = [
  {
    title: "One vote per device",
    body: "Once you pick an option, the ballot locks. This is a demo poll, so a device can vote only once.",
  },
  {
    title: "Stored on this device",
    body: "Your choice is saved in this browser's local storage. It is not tied to an account or sent to a server.",
  },
  {
    title: "Results update instantly",
    body: "Percentages recalculate in the browser the moment you vote, so you see the local result right away.",
  },
];

const relatedLinks = [
  {
    href: "/rankings",
    eyebrow: "Power rankings",
    title: "Who is climbing?",
    body: "Movement, momentum, and the full top ten.",
    icon: Trophy,
  },
  {
    href: "/rivalries",
    eyebrow: "Feuds & fallout",
    title: "What comes next?",
    body: "Follow the stories setting up the next big match.",
    icon: Swords,
  },
];

export default function PollsPage() {
  const heroImage = poll.options[0].image ?? rivalries[0].image;

  return (
    <>
      <section className="relative min-h-[72vh] overflow-hidden border-b border-white/10 bg-black">
        <div className="absolute inset-0">
          <SafeImage
            src={heroImage}
            alt="AEW fan poll"
            priority
            sizes="100vw"
            position="center 25%"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="shell relative flex min-h-[72vh] flex-col justify-end py-14 sm:py-20">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Fan Polls" }]} />
          <div className="mt-12 max-w-4xl sm:mt-16">
            <p className="eyebrow flex items-center gap-3 text-gold-bright">
              <Radio size={15} /> The Universe speaks
            </p>
            <h1 className="display mt-5 text-[clamp(3.5rem,9vw,8rem)] text-white">
              You decide <span className="text-gold">what&apos;s next.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-cream/70 sm:text-base">
              Big questions deserve big answers. Cast your vote, see the percentages, and keep the
              conversation going across the AEW Universe.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#ballot" className="btn-gold">
                Cast your vote <ArrowUpRight size={16} />
              </a>
              <Link href="/rankings" className="btn-outline">
                Check the rankings <Trophy size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="ballot" className="shell scroll-mt-20 py-14 sm:py-20">
        <Reveal className="mb-10">
          <SectionHeading
            eyebrow="Live ballot"
            title={<>This week&apos;s <span className="text-gold">question.</span></>}
            description="Pick the competitor you want to see challenge for the AEW World Championship next."
          />
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <Reveal>
            <PollWidget full />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-white/10 bg-panel p-6 sm:p-8">
              <div className="flex items-center gap-2 text-gold">
                <Info size={16} />
                <p className="eyebrow">How voting works</p>
              </div>
              <h2 className="display mt-4 text-2xl text-white sm:text-3xl">
                Local to your <span className="text-gold">device.</span>
              </h2>
              <div className="mt-6 space-y-5">
                {votingNotes.map((note, index) => (
                  <div key={note.title} className="flex gap-3 border-t border-white/10 pt-5">
                    <span className="display shrink-0 text-xl text-gold/60">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">{note.title}</p>
                      <p className="mt-1.5 text-xs leading-relaxed text-cream/50">{note.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 flex items-start gap-2 border border-gold/25 bg-gold/5 p-3 text-[11px] leading-relaxed text-cream/55">
                <Check size={14} className="mt-0.5 shrink-0 text-gold" /> Clearing this site&apos;s local
                storage will reset your vote. No payment, account, or personal data is involved.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/40 py-14 sm:py-20">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Keep the debate going"
              title={<>More ways to <span className="text-gold">weigh in.</span></>}
              description="The poll is only the beginning. Follow the stories and standings shaping the conversation."
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {relatedLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.href} delay={0.08 * index}>
                  <Link
                    href={item.href}
                    className="group flex h-full items-start gap-5 border border-white/10 bg-black/40 p-6 transition hover:border-gold/60 sm:p-8"
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center border border-gold/40 bg-gold/10 text-gold">
                      <Icon size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="eyebrow text-gold">{item.eyebrow}</span>
                      <span className="display mt-2 block text-2xl text-white transition group-hover:text-gold-bright sm:text-3xl">
                        {item.title}
                      </span>
                      <span className="mt-2 block text-sm text-cream/55">{item.body}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      className="shrink-0 text-cream/35 transition group-hover:translate-x-1 group-hover:text-gold"
                    />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
