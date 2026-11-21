import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Layers, Trophy, Users, Zap } from "lucide-react";
import RosterBrowser from "@/components/pages/RosterBrowser";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { divisions, factions, featuredWrestler, wrestlers } from "@/data/wrestlers";

export const metadata: Metadata = {
  title: "Roster",
  description:
    "Explore the full AEW roster: superstars, divisions, factions, champions, finishers, and career profiles.",
};

export default function RosterPage() {
  const champions = wrestlers.filter((wrestler) => wrestler.champion).length;

  return (
    <>
      <section className="relative min-h-[60vh] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <SafeImage
            src={featuredWrestler.image}
            alt={featuredWrestler.name}
            priority
            sizes="100vw"
            position="center 18%"
            className="scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/55" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>
        <div className="shell relative z-10 flex min-h-[60vh] flex-col pb-14 pt-28">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Roster" }]} />
          <div className="mt-auto pt-14">
            <Reveal className="max-w-3xl">
              <p className="eyebrow flex items-center gap-3 text-gold-bright">
                <span className="inline-block size-2 animate-pulse bg-gold" />
                All Elite Wrestling
              </p>
              <h1 className="display mt-5 text-[clamp(3.5rem,10vw,9rem)] text-white">
                The <span className="text-gold">Roster</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
                Legends, rising stars, and the competitors rewriting the sport.
                Search, filter, and explore every name that steps into an AEW ring.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/champions" className="btn-gold">
                  <Trophy size={16} /> See the champions
                </Link>
                <Link href="/matches" className="btn-outline">
                  Classic matches <ArrowUpRight size={15} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-panel/40">
        <div className="shell grid gap-3 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, value: wrestlers.length, label: "Superstars" },
            { icon: Layers, value: divisions.length, label: "Divisions" },
            { icon: Zap, value: factions.length, label: "Factions" },
            { icon: Trophy, value: champions, label: "Champions" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex items-center gap-4 border border-white/10 bg-panel px-5 py-5">
                <span className="flex size-10 shrink-0 items-center justify-center border border-gold/40 text-gold">
                  <Icon size={17} />
                </span>
                <span>
                  <span className="display block text-3xl leading-none text-white">{stat.value}</span>
                  <span className="eyebrow mt-2 block text-cream/40">{stat.label}</span>
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Browse the locker room"
            title={<>Find your <span className="text-gold">favorite.</span></>}
            description="Use the filters to zero in on a division, faction, or champion. Every profile opens the full story."
          />
        </Reveal>
        <RosterBrowser wrestlers={wrestlers} divisions={divisions} factions={factions} />
      </section>
    </>
  );
}
