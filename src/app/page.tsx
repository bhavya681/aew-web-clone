import { ArrowRight, ArrowUpRight, CalendarDays, MapPin, Play, Ticket, Trophy } from "lucide-react";
import Link from "next/link";
import Countdown from "@/components/ui/Countdown";
import PollWidget from "@/components/ui/PollWidget";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { championships } from "@/data/championships";
import { featuredEvent, upcomingEvents } from "@/data/events";
import { matchOfTheWeek } from "@/data/matches";
import { articles, heroArticle } from "@/data/news";
import { products } from "@/data/products";
import { featuredVideo } from "@/data/videos";
import { featuredWrestler, wrestlers } from "@/data/wrestlers";

export default function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[calc(100vh-5rem)] items-end overflow-hidden">
        <div className="absolute inset-0">
          <SafeImage
            src={featuredWrestler.image}
            alt={featuredWrestler.name}
            priority
            sizes="100vw"
            position="center 25%"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/40" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="shell relative z-10 pb-20 pt-32 sm:pb-28">
          <Reveal className="max-w-3xl">
            <p className="eyebrow flex items-center gap-3 text-gold-bright">
              <span className="inline-block size-2 animate-pulse bg-gold" />
              The home of All Elite Wrestling
            </p>
            <h1 className="display mt-5 text-[clamp(3.5rem,10vw,9rem)] text-white">
              The Universe
              <br />
              <span className="text-gold">Is Watching.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/70 sm:text-lg">
              Every Wednesday night on TBS. Every Saturday night on TNT. The
              athletes, the stories, and the moments that make AEW the most
              electrifying promotion in professional wrestling.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/events" className="btn-gold">
                <Ticket size={17} /> Get tickets
              </Link>
              <Link href="/roster" className="btn-outline">
                Meet the roster <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-14 flex flex-col gap-5 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-cream/40">Next premium event</p>
              <p className="display mt-2 text-3xl text-white sm:text-4xl">{featuredEvent.title}</p>
              <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cream/55">
                <span className="flex items-center gap-1.5"><CalendarDays size={13} className="text-gold" /> {featuredEvent.dateLabel}</span>
                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-gold" /> {featuredEvent.city}</span>
              </p>
            </div>
            <Countdown target={featuredEvent.date} />
          </Reveal>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-gold py-3">
        <div className="flex w-max animate-[ticker_28s_linear_infinite] gap-10 whitespace-nowrap">
          {[0, 1].map((group) => (
            <div key={group} className="flex gap-10">
              {["Wednesday Nights 8ET on TBS", "Collision Saturdays 8ET on TNT", "The Continental Classic Is Underway", "Road to Worlds End", "All Elite. All In."].map((text) => (
                <span key={text} className="display flex items-center gap-10 text-sm text-black sm:text-base">
                  {text} <span className="text-lg">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="shell py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Latest from AEW"
            title={<>News that hits <span className="text-gold">different.</span></>}
            description="Breaking stories, results, exclusive interviews, and everything happening across the AEW Universe."
            action={<Link href="/news" className="btn-outline !py-3 !text-sm">View all news <ArrowUpRight size={15} /></Link>}
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <Link href={`/news/${heroArticle.slug}`} className="group relative block aspect-[16/10] overflow-hidden border border-white/10 bg-panel">
              <SafeImage src={heroArticle.image} alt={heroArticle.title} sizes="(max-width:1024px) 100vw, 60vw" className="transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <span className="eyebrow text-gold-bright">{heroArticle.category} · {heroArticle.dateLabel}</span>
                <h3 className="display mt-3 max-w-2xl text-2xl text-white transition group-hover:text-gold-bright sm:text-4xl">{heroArticle.title}</h3>
                <p className="mt-3 hidden max-w-xl text-sm text-cream/65 sm:block">{heroArticle.excerpt}</p>
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {articles.slice(1, 5).map((article, index) => (
              <Reveal key={article.slug} delay={0.08 * index}>
                <Link href={`/news/${article.slug}`} className="group flex h-full gap-4 border border-white/10 bg-panel p-3 transition hover:border-gold/60">
                  <span className="relative size-24 shrink-0 overflow-hidden bg-black sm:size-28 lg:size-24">
                    <SafeImage src={article.image} alt="" sizes="112px" className="transition duration-500 group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 py-1">
                    <span className="eyebrow text-gold">{article.category}</span>
                    <span className="mt-2 block text-sm font-bold leading-snug text-white transition group-hover:text-gold-bright">{article.title}</span>
                    <span className="mt-2 block text-[11px] text-cream/40">{article.dateLabel}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/40 py-20 sm:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Gold on the line"
              title={<>Champions of <span className="text-gold">AEW</span></>}
              description="Every belt. Every reign. Every legacy. Discover who is holding the gold right now."
              action={<Link href="/champions" className="btn-outline !py-3 !text-sm">All championships <ArrowUpRight size={15} /></Link>}
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {championships.slice(0, 4).map((title, index) => (
              <Reveal key={title.slug} delay={0.07 * index}>
                <Link href={`/championships/${title.slug}`} className="group relative block aspect-[4/5] overflow-hidden border border-white/10 bg-black">
                  <SafeImage src={title.belt} alt={title.name} sizes="(max-width:640px) 50vw, 25vw" className="transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="eyebrow text-gold">{title.shortName}</p>
                    <p className="display mt-1 text-lg leading-tight text-white">{title.champion}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="The roster"
            title={<>Legends. Rising stars. <span className="text-gold">Icons.</span></>}
            description="The most talented roster in professional wrestling, from established main eventers to the next generation of superstars."
            action={<Link href="/roster" className="btn-outline !py-3 !text-sm">Full roster <ArrowUpRight size={15} /></Link>}
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {wrestlers.slice(0, 8).map((wrestler, index) => (
            <Reveal key={wrestler.slug} delay={0.04 * index}>
              <Link href={`/roster/${wrestler.slug}`} className="group relative block aspect-[3/4] overflow-hidden border border-white/10 bg-panel">
                <SafeImage src={wrestler.image} alt={wrestler.name} sizes="(max-width:640px) 50vw, 12vw" className="grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                {wrestler.champion ? <span className="absolute right-2 top-2 bg-gold p-1 text-black"><Trophy size={11} /></span> : null}
                <div className="absolute inset-x-0 bottom-0 p-2">
                  <p className="display text-sm leading-tight text-white">{wrestler.name}</p>
                  <p className="mt-0.5 truncate text-[9px] uppercase tracking-widest text-gold">{wrestler.division}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/40 py-20 sm:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-gold">Watch now</p>
            <h2 className="display mt-3 text-4xl text-white sm:text-6xl">From the <span className="text-gold">vault.</span></h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-cream/60 sm:text-base">{featuredVideo.description}</p>
            <Link href="/videos" className="btn-outline mt-7 !py-3 !text-sm">Browse all videos <ArrowUpRight size={15} /></Link>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={`https://www.youtube.com/watch?v=${featuredVideo.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-video overflow-hidden border border-white/10 bg-black"
            >
              <SafeImage src={featuredVideo.thumbnail} alt={featuredVideo.title} sizes="(max-width:1024px) 100vw, 50vw" className="transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/35 transition group-hover:bg-black/20" />
              <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gold text-black transition group-hover:scale-110">
                <Play size={24} fill="currentColor" />
              </span>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black to-transparent p-5">
                <span className="display text-lg text-white sm:text-2xl">{featuredVideo.title}</span>
                <span className="shrink-0 border border-white/30 px-2 py-1 text-[10px] font-bold text-white">{featuredVideo.duration}</span>
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Don't miss a moment"
            title={<>Upcoming <span className="text-gold">events.</span></>}
            description="Live from arenas across the world. Find the next show near you."
            action={<Link href="/events" className="btn-outline !py-3 !text-sm">Full schedule <ArrowUpRight size={15} /></Link>}
          />
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {upcomingEvents.slice(0, 3).map((event, index) => (
            <Reveal key={event.slug} delay={0.08 * index}>
              <Link href={`/events/${event.slug}`} className="group block border border-white/10 bg-panel transition hover:border-gold/60">
                <span className="relative block aspect-video overflow-hidden">
                  <SafeImage src={event.poster} alt={event.title} sizes="(max-width:768px) 100vw, 33vw" className="transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-panel to-transparent" />
                </span>
                <span className="block p-5">
                  <span className="eyebrow text-gold">{event.dateLabel}</span>
                  <span className="display mt-2 block text-2xl leading-tight text-white">{event.title}</span>
                  <span className="mt-3 flex items-center gap-1.5 text-xs text-cream/45"><MapPin size={12} /> {event.venue}, {event.city}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-panel/40 py-20 sm:py-28">
        <div className="shell grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="eyebrow text-gold">Match of the week</p>
            <div className="relative mt-4 aspect-[16/9] overflow-hidden border border-white/10 bg-black">
              <SafeImage src={matchOfTheWeek.image} alt={matchOfTheWeek.title} sizes="(max-width:1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="eyebrow text-gold-bright">{matchOfTheWeek.matchType} · {matchOfTheWeek.event}</p>
                <h2 className="display mt-2 text-3xl text-white sm:text-4xl">{matchOfTheWeek.title}</h2>
              </div>
            </div>
            <Link href={`/matches/${matchOfTheWeek.slug}`} className="btn-outline mt-5 !py-3 !text-sm">Match details <ArrowUpRight size={15} /></Link>
          </Reveal>
          <Reveal delay={0.1}>
            <PollWidget />
          </Reveal>
        </div>
      </section>

      <section className="shell py-20 sm:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Wear the gold"
            title={<>Official <span className="text-gold">AEW Shop.</span></>}
            description="Replica titles, tees, hoodies, and collectibles for the true translation."
            action={<Link href="/shop" className="btn-outline !py-3 !text-sm">Shop all <ArrowUpRight size={15} /></Link>}
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.slice(0, 4).map((product, index) => (
            <Reveal key={product.id} delay={0.06 * index}>
              <Link href={`/shop?product=${product.id}`} className="group block border border-white/10 bg-panel transition hover:border-gold/60">
                <span className="relative block aspect-square overflow-hidden bg-black">
                  <SafeImage src={product.image} alt={product.name} sizes="(max-width:640px) 50vw, 25vw" className="transition duration-700 group-hover:scale-105" />
                  {product.badge ? <span className="absolute left-2 top-2 bg-gold px-2 py-1 text-[9px] font-black uppercase tracking-widest text-black">{product.badge}</span> : null}
                </span>
                <span className="block p-4">
                  <span className="block text-sm font-semibold leading-snug text-white">{product.name}</span>
                  <span className="mt-2 block text-sm text-gold">${product.price.toFixed(2)}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 bg-gold py-20 text-black sm:py-28">
        <div className="shell relative z-10 text-center">
          <Reveal>
            <p className="eyebrow">Join the universe</p>
            <h2 className="display mx-auto mt-4 max-w-4xl text-5xl leading-none sm:text-7xl lg:text-8xl">
              This is <span className="text-white">AEW.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm font-medium leading-relaxed text-black/70 sm:text-base">
              New episodes of Dynamite every Wednesday and Collision every Saturday.
              Follow the stories, watch the matches, and be part of the most passionate fanbase in wrestling.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/events" className="inline-flex items-center gap-2 bg-black px-7 py-4 font-display text-base font-extrabold uppercase tracking-wide text-gold transition hover:bg-panel">
                Find an event <ArrowRight size={16} />
              </Link>
              <Link href="/news" className="inline-flex items-center gap-2 border border-black px-7 py-4 font-display text-base font-extrabold uppercase tracking-wide text-black transition hover:bg-black hover:text-gold">
                Latest stories <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
        <div className="pointer-events-none absolute -right-20 -top-32 size-[28rem] rotate-12 border-[3rem] border-black/5" />
      </section>

      <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </>
  );
}
