import type { Metadata } from "next";
import { Ticket } from "lucide-react";
import { Suspense } from "react";
import { EventBrowser } from "@/components/pages/VideoBrowser";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import { events, featuredEvent, pastEvents, upcomingEvents } from "@/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Explore the AEW event schedule, find tickets for upcoming shows, and review results from past premium events.",
};

type EventStatus = "all" | "upcoming" | "past";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function BrowserSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-28 animate-pulse border border-white/10 bg-panel/70" />
      <div className="h-96 animate-pulse border border-white/10 bg-panel/40" />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-96 animate-pulse border border-white/10 bg-panel/40" />
        ))}
      </div>
    </div>
  );
}

async function EventContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestedStatus = firstValue(params.status);
  const initialStatus: EventStatus =
    requestedStatus === "upcoming" || requestedStatus === "past" ? requestedStatus : "all";
  const initialQuery = firstValue(params.q) ?? firstValue(params.search) ?? "";

  return (
    <EventBrowser
      events={events}
      featuredEvent={featuredEvent}
      initialStatus={initialStatus}
      initialQuery={initialQuery}
    />
  );
}

export default function EventsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-panel/40">
        <div className="pointer-events-none absolute -right-32 -top-40 size-[34rem] rotate-12 border-[4rem] border-gold/5" />
        <div className="pointer-events-none absolute -bottom-44 left-0 size-[28rem] rounded-full bg-gold/5 blur-3xl" />
        <div className="shell relative py-14 sm:py-20">
          <Reveal>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Events" }]} />
            <p className="eyebrow mt-9 flex items-center gap-3 text-gold">
              <span className="flex size-6 items-center justify-center bg-gold text-black">
                <Ticket size={11} />
              </span>
              Live from arena to arena
            </p>
            <h1 className="display mt-5 max-w-5xl break-words text-[clamp(3.5rem,10vw,8.5rem)] text-white">
              Event <span className="text-gold">Schedule</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/60 sm:text-lg">
              Dynamite, Collision, ROH, and premium events. Find your next live show, secure
              tickets, or revisit the results from recent AEW history.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-9 gap-y-3 border-t border-white/10 pt-6 text-[11px] font-bold uppercase tracking-widest text-cream/40">
              <span>
                <strong className="display mr-2 text-2xl text-gold">{upcomingEvents.length}</strong>
                Upcoming
              </span>
              <span>
                <strong className="display mr-2 text-2xl text-gold">{pastEvents.length}</strong>
                Completed
              </span>
              <span>North America &amp; beyond</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        <Suspense fallback={<BrowserSkeleton />}>
          <EventContent searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
