import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, CalendarDays, Clock3, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Countdown from "@/components/ui/Countdown";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { events, getEvent } from "@/data/events";

export const instant = false;

type PageProps = { params: Promise<{ slug: string }> };

const titleCase = (slug: string) =>
  slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) {
    return { title: "Event not found" };
  }

  return {
    title: event.title,
    description: `${event.description} ${event.dateLabel} at ${event.venue}, ${event.city}.`,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.poster],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEvent(slug);

  if (!event) {
    notFound();
  }

  const upcoming = event.status === "upcoming";
  const related = [
    ...events.filter((item) => item.status === event.status && item.slug !== event.slug),
    ...events.filter((item) => item.status !== event.status && item.slug !== event.slug),
  ].slice(0, 3);

  return (
    <>
      <section className="relative min-h-[36rem] overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <SafeImage
            src={event.poster}
            alt={event.title}
            priority
            sizes="100vw"
            position="center 25%"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50" />
        </div>
        <div className="shell relative flex min-h-[36rem] flex-col justify-end py-14 sm:py-20">
          <Reveal>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Events", href: "/events" },
                { label: event.title },
              ]}
            />
            <div className="mt-10 max-w-5xl">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                    upcoming ? "bg-gold text-black" : "border border-white/30 bg-black/70 text-cream"
                  }`}
                >
                  {upcoming ? "Upcoming event" : "Completed event"}
                </span>
                <p className="eyebrow text-gold">{event.dateLabel}</p>
              </div>
              <h1 className="display mt-6 break-words text-[clamp(3rem,8vw,7.5rem)] text-white">
                {event.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-cream/65">
                <span className="flex items-center gap-2">
                  <CalendarDays size={15} className="text-gold" /> {event.dateLabel}
                </span>
                <span className="flex items-center gap-2">
                  <Clock3 size={15} className="text-gold" /> {event.time}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={15} className="text-gold" /> {event.venue}, {event.city}
                </span>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                {upcoming && event.ticketUrl && event.ticketUrl !== "#" ? (
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    <Ticket size={17} /> Get tickets
                  </a>
                ) : null}
                <a href="#match-card" className="btn-outline">
                  {upcoming ? "View match card" : "View results"} <ArrowRight size={16} />
                </a>
                {upcoming ? <Countdown target={event.date} /> : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <Reveal>
            <div className="gold-rule h-0.5 w-24" />
            <p className="eyebrow mt-7 text-gold">Event overview</p>
            <h2 className="display mt-3 max-w-3xl text-3xl text-white sm:text-5xl">
              One night. One arena. <span className="text-gold">All elite.</span>
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-[1.85] text-cream/65 sm:text-lg">
              {event.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="border border-white/10 bg-panel p-6">
              <p className="eyebrow text-gold">Event details</p>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-cream/35">
                    Date
                  </dt>
                  <dd className="mt-1 font-semibold text-white">{event.dateLabel}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-cream/35">
                    Start time
                  </dt>
                  <dd className="mt-1 font-semibold text-white">{event.time}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-cream/35">
                    Venue
                  </dt>
                  <dd className="mt-1 font-semibold text-white">{event.venue}</dd>
                </div>
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-widest text-cream/35">
                    Location
                  </dt>
                  <dd className="mt-1 font-semibold text-white">{event.city}</dd>
                </div>
              </dl>
              <Link
                href="/events"
                className="mt-7 inline-flex items-center gap-2 border-t border-white/10 pt-5 text-[11px] font-black uppercase tracking-widest text-gold transition hover:text-gold-bright"
              >
                Full schedule <ArrowUpRight size={14} />
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      <section id="match-card" className="border-y border-white/10 bg-panel/30 py-16 sm:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow={upcoming ? "Announced card" : "Official results"}
              title={<>The <span className="text-gold">match card</span></>}
              description={
                upcoming
                  ? "The slate of bouts set for this event. More matches may be added as the show approaches."
                  : "How the night played out, bout by bout, from this completed AEW event."
              }
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9 overflow-x-auto border border-white/10 bg-black/40">
              <table className="w-full min-w-[640px] border-collapse text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="eyebrow px-5 py-4 text-cream/40">Matchup</th>
                    <th className="eyebrow px-5 py-4 text-cream/40">Type</th>
                    <th className="eyebrow px-5 py-4 text-cream/40">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {event.matchCard.map((match, index) => (
                    <tr
                      key={`${match.match}-${index}`}
                      className="border-t border-white/10 transition hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-5">
                        <span className="mr-3 text-xs font-black text-gold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm font-semibold text-white sm:text-base">
                          {match.match}
                        </span>
                      </td>
                      <td className="px-5 py-5 text-xs uppercase tracking-widest text-cream/50">
                        {match.type}
                      </td>
                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex border px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${
                            match.result
                              ? "border-gold/50 text-gold"
                              : "border-white/15 text-cream/40"
                          }`}
                        >
                          {match.result ?? "Scheduled"}
                        </span>
                      </td>
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
            eyebrow="In the spotlight"
            title={<>Featured <span className="text-gold">superstars</span></>}
            description="Names associated with this event across the AEW roster."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {event.featuredWrestlers.map((wrestler) => (
              <Link
                key={wrestler}
                href={`/roster/${wrestler}`}
                className="border border-white/15 bg-panel px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-cream/70 transition hover:border-gold hover:text-gold"
              >
                {titleCase(wrestler)}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="border-t border-white/10 bg-panel/30 py-16 sm:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="More dates"
              title={<>Keep the <span className="text-gold">momentum</span></>}
              description="Other events from the AEW calendar."
              action={
                <Link href="/events" className="btn-outline !py-3 !text-sm">
                  All events <ArrowUpRight size={15} />
                </Link>
              }
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.08}>
                <Link
                  href={`/events/${item.slug}`}
                  className="group block border border-white/10 bg-panel transition hover:-translate-y-1 hover:border-gold/60"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <SafeImage
                      src={item.poster}
                      alt={item.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute left-3 top-3 bg-black/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-gold">
                      {item.status === "upcoming" ? "Upcoming" : "Final"}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="eyebrow text-cream/35">{item.dateLabel}</p>
                    <h3 className="display mt-2 text-xl leading-tight text-white transition group-hover:text-gold-bright">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-cream/45">
                      <MapPin size={12} className="text-gold" /> {item.city}
                    </p>
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
