"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Play,
  RotateCcw,
  Search,
  SearchX,
  SlidersHorizontal,
  Ticket,
  VideoOff,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import Countdown from "@/components/ui/Countdown";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import type { Event } from "@/data/events";
import type { Article } from "@/data/news";
import type { Video } from "@/data/videos";

type NewsBrowserProps = {
  articles: Article[];
  categories: string[];
  initialCategory?: string;
  initialQuery?: string;
};

type VideoBrowserProps = {
  videos: Video[];
  categories: string[];
  featuredVideo: Video;
  initialCategory?: string;
  initialQuery?: string;
};

type EventStatus = "all" | "upcoming" | "past";

type EventBrowserProps = {
  events: Event[];
  featuredEvent: Event;
  initialStatus?: EventStatus;
  initialQuery?: string;
};

const normalize = (value: string) => value.trim().toLowerCase();

const chipClass = (active: boolean) =>
  active
    ? "border-gold bg-gold text-black"
    : "border-white/15 bg-black/40 text-cream/60 hover:border-gold/70 hover:text-white";

function SearchField({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <label className="relative block w-full sm:max-w-sm">
      <span className="sr-only">{label}</span>
      <Search
        size={16}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full border border-white/15 bg-black/60 py-3 pl-11 pr-10 text-sm text-white outline-none transition placeholder:text-cream/30 focus:border-gold"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 transition hover:text-white"
        >
          <X size={15} />
        </button>
      ) : null}
    </label>
  );
}

function CategoryFilter({
  categories,
  category,
  onCategoryChange,
}: {
  categories: string[];
  category: string;
  onCategoryChange: (value: string) => void;
}) {
  return (
    <div className="no-scrollbar -mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1">
      <button
        type="button"
        onClick={() => onCategoryChange("All")}
        aria-pressed={category === "All"}
        className={`shrink-0 border px-3.5 py-2 text-[10px] font-black uppercase tracking-widest transition ${chipClass(category === "All")}`}
      >
        All
      </button>
      {categories.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onCategoryChange(item)}
          aria-pressed={category === item}
          className={`shrink-0 border px-3.5 py-2 text-[10px] font-black uppercase tracking-widest transition ${chipClass(category === item)}`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function FilterPanel({
  query,
  onQueryChange,
  placeholder,
  searchLabel,
  resultLabel,
  hasFilters,
  onReset,
  children,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder: string;
  searchLabel: string;
  resultLabel: string;
  hasFilters: boolean;
  onReset: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="relative z-20 border border-white/10 bg-panel/85 p-4 shadow-[0_24px_70px_-50px_rgba(0,0,0,0.95)] backdrop-blur sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchField
            value={query}
            onChange={onQueryChange}
            placeholder={placeholder}
            label={searchLabel}
          />
          <p className="flex items-center gap-2 whitespace-nowrap text-[11px] font-bold uppercase tracking-widest text-cream/40">
            <SlidersHorizontal size={14} className="text-gold" />
            {resultLabel}
          </p>
        </div>
        {hasFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 self-start border border-white/15 px-4 py-2.5 text-[11px] font-black uppercase tracking-widest text-cream/60 transition hover:border-gold hover:text-gold"
          >
            <RotateCcw size={13} /> Clear filters
          </button>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function EmptyState({
  title,
  description,
  onReset,
}: {
  title: string;
  description: string;
  onReset: () => void;
}) {
  return (
    <div className="border border-dashed border-white/15 bg-panel/40 px-6 py-20 text-center">
      <SearchX size={30} className="mx-auto text-gold" />
      <h2 className="display mt-5 text-3xl text-white sm:text-4xl">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/50">
        {description}
      </p>
      <button type="button" onClick={onReset} className="btn-outline mt-7 !py-3 !text-sm">
        <RotateCcw size={14} /> Reset filters
      </button>
    </div>
  );
}

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Reveal>
      <article className="group relative grid overflow-hidden border border-white/10 bg-panel transition hover:border-gold/50 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[300px] overflow-hidden bg-black sm:min-h-[420px] lg:min-h-[520px]">
          <SafeImage
            src={article.image}
            alt={article.title}
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent lg:bg-gradient-to-r" />
          <span className="absolute left-5 top-5 bg-gold px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-black">
            Lead story
          </span>
        </div>
        <div className="relative flex flex-col justify-center p-6 sm:p-10">
          <p className="eyebrow text-gold">
            {article.category} <span className="mx-2 text-cream/25">/</span> {article.dateLabel}
          </p>
          <h2 className="display mt-4 text-4xl leading-none text-white transition group-hover:text-gold-bright sm:text-5xl lg:text-6xl">
            {article.title}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-cream/60 sm:text-base">
            {article.excerpt}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
            <span className="text-[11px] uppercase tracking-widest text-cream/40">
              By {article.author}
            </span>
            <Link href={`/news/${article.slug}`} className="btn-gold !px-5 !py-3 !text-sm">
              Read story <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex h-full flex-col border border-white/10 bg-panel transition duration-300 hover:-translate-y-1 hover:border-gold/60"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        <SafeImage
          src={article.image}
          alt={article.title}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span className="absolute left-3 top-3 border border-gold/50 bg-black/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-gold">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-cream/35">{article.dateLabel}</p>
        <h3 className="display mt-2 text-2xl leading-tight text-white transition group-hover:text-gold-bright">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-cream/55">
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-[10px] uppercase tracking-widest text-cream/40">
          <span className="truncate">{article.author}</span>
          <ArrowUpRight size={15} className="shrink-0 text-gold transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}

export function NewsBrowser({
  articles,
  categories,
  initialCategory = "All",
  initialQuery = "",
}: NewsBrowserProps) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const hasFilters = category !== "All" || query.trim().length > 0;

  const filtered = useMemo(() => {
    const term = normalize(query);
    return articles.filter((article) => {
      const matchesCategory = category === "All" || article.category === category;
      const matchesQuery =
        !term ||
        [article.title, article.excerpt, article.category, article.author, article.dateLabel]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  const reset = () => {
    setCategory("All");
    setQuery("");
  };

  const showHero = !hasFilters && articles.length > 0;
  const gridArticles = showHero ? filtered.slice(1) : filtered;

  return (
    <div className="space-y-8">
      <FilterPanel
        query={query}
        onQueryChange={setQuery}
        placeholder="Search stories, results, interviews..."
        searchLabel="Search news"
        resultLabel={`${filtered.length} ${filtered.length === 1 ? "story" : "stories"}`}
        hasFilters={hasFilters}
        onReset={reset}
      >
        <CategoryFilter
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
        />
      </FilterPanel>

      {filtered.length === 0 ? (
        <EmptyState
          title="No stories found"
          description="That search did not turn up any coverage. Try a broader keyword or switch categories."
          onReset={reset}
        />
      ) : (
        <div className="space-y-8">
          {showHero ? <FeaturedArticle article={articles[0]} /> : null}
          {gridArticles.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {gridArticles.map((article, index) => (
                <Reveal key={article.slug} delay={Math.min(index * 0.05, 0.35)}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function VideoVisual({ video, featured = false }: { video: Video; featured?: boolean }) {
  return (
    <>
      <SafeImage
        src={video.thumbnail}
        alt={video.title}
        priority={featured}
        sizes={featured ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"}
        className="transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <span className="absolute left-3 top-3 border border-gold/50 bg-black/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-gold">
        {video.category}
      </span>
      <span className="absolute right-3 top-3 flex items-center gap-1.5 border border-white/25 bg-black/75 px-2.5 py-1 text-[10px] font-bold text-white">
        <Clock3 size={11} className="text-gold" /> {video.duration}
      </span>
    </>
  );
}

function UnavailableOverlay() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 px-4 text-center">
      <VideoOff size={26} className="text-gold" />
      <p className="display mt-3 max-w-xs text-lg text-white sm:text-xl">
        Full video unavailable in this demo
      </p>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-cream/45">
        Thumbnail preview only
      </p>
    </div>
  );
}

function VideoFeature({
  video,
  onPlay,
}: {
  video: Video;
  onPlay: (video: Video) => void;
}) {
  const available = Boolean(video.youtubeId.trim());

  return (
    <Reveal>
      <section className="group overflow-hidden border border-gold/30 bg-panel">
        <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative aspect-video overflow-hidden bg-black">
            {available ? (
              <button
                type="button"
                onClick={() => onPlay(video)}
                aria-label={`Play ${video.title}`}
                className="block size-full"
              >
                <VideoVisual video={video} featured />
                <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gold text-black transition duration-300 group-hover:scale-110">
                  <Play size={30} fill="currentColor" />
                </span>
              </button>
            ) : (
              <div className="relative size-full" aria-disabled="true">
                <VideoVisual video={video} featured />
                <UnavailableOverlay />
              </div>
            )}
          </div>
          <div className="relative flex flex-col justify-center border-l border-white/10 p-6 sm:p-10">
            <p className="eyebrow text-gold">Featured film</p>
            <h2 className="display mt-3 text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
              {video.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-cream/60">{video.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-[11px] uppercase tracking-widest text-cream/40">
              <span className="flex items-center gap-1.5">
                <CalendarDays size={13} className="text-gold" /> {video.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 size={13} className="text-gold" /> {video.duration}
              </span>
            </div>
            {available ? (
              <button
                type="button"
                onClick={() => onPlay(video)}
                className="btn-gold mt-7 !py-3 !text-sm"
              >
                <Play size={14} fill="currentColor" /> Play featured video
              </button>
            ) : (
              <p className="mt-7 text-[11px] uppercase tracking-widest text-cream/35">
                Playback unavailable in this demo
              </p>
            )}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function VideoCard({
  video,
  onPlay,
}: {
  video: Video;
  onPlay: (video: Video) => void;
}) {
  const available = Boolean(video.youtubeId.trim());

  return (
    <article className="group flex h-full flex-col border border-white/10 bg-panel transition duration-300 hover:border-gold/50">
      {available ? (
        <button
          type="button"
          onClick={() => onPlay(video)}
          aria-label={`Play ${video.title}`}
          className="relative block aspect-video w-full overflow-hidden bg-black"
        >
          <VideoVisual video={video} />
          <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gold text-black transition duration-300 group-hover:scale-110">
            <Play size={22} fill="currentColor" />
          </span>
        </button>
      ) : (
        <div className="relative block aspect-video w-full overflow-hidden bg-black" aria-disabled="true">
          <VideoVisual video={video} />
          <UnavailableOverlay />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-cream/35">{video.date}</p>
        <h3 className="display mt-2 text-xl leading-tight text-white transition group-hover:text-gold-bright sm:text-2xl">
          {video.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cream/55">
          {video.description}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/10 pt-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-cream/40">
            {video.category}
          </span>
          <span
            className={`text-[10px] font-black uppercase tracking-widest ${
              available ? "text-gold" : "text-cream/30"
            }`}
          >
            {available ? "Watch now" : "Unavailable"}
          </span>
        </div>
      </div>
    </article>
  );
}

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`Playing ${video.title}`}
      onMouseDown={onClose}
    >
      <div className="w-full max-w-5xl" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 pb-4">
          <div className="min-w-0">
            <p className="eyebrow text-gold">Now playing</p>
            <h2 className="display mt-1 truncate text-2xl text-white sm:text-4xl">
              {video.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="flex size-10 shrink-0 items-center justify-center border border-white/20 text-cream/70 transition hover:border-gold hover:text-gold"
          >
            <X size={19} />
          </button>
        </div>
        <div className="relative aspect-video w-full overflow-hidden border border-white/15 bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-cream/45">{video.description}</p>
      </div>
    </div>
  );
}

export default function VideoBrowser({
  videos,
  categories,
  featuredVideo,
  initialCategory = "All",
  initialQuery = "",
}: VideoBrowserProps) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const hasFilters = category !== "All" || query.trim().length > 0;

  useEffect(() => {
    if (!activeVideo) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveVideo(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeVideo]);

  const filtered = useMemo(() => {
    const term = normalize(query);
    return videos.filter((video) => {
      const matchesCategory = category === "All" || video.category === category;
      const matchesQuery =
        !term ||
        [video.title, video.description, video.category, video.duration]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesCategory && matchesQuery;
    });
  }, [videos, category, query]);

  const reset = () => {
    setCategory("All");
    setQuery("");
  };

  const showFeatured = !hasFilters;
  const gridVideos = showFeatured
    ? filtered.filter((video) => video.slug !== featuredVideo.slug)
    : filtered;

  return (
    <>
      <FilterPanel
        query={query}
        onQueryChange={setQuery}
        placeholder="Search videos, matches, superstars..."
        searchLabel="Search videos"
        resultLabel={`${filtered.length} ${filtered.length === 1 ? "video" : "videos"}`}
        hasFilters={hasFilters}
        onReset={reset}
      >
        <CategoryFilter
          categories={categories}
          category={category}
          onCategoryChange={setCategory}
        />
      </FilterPanel>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <EmptyState
            title="Nothing in the vault"
            description="No videos match those filters. Clear the search or browse another category."
            onReset={reset}
          />
        ) : (
          <div className="space-y-8">
            {showFeatured ? (
              <VideoFeature video={featuredVideo} onPlay={setActiveVideo} />
            ) : null}
            {gridVideos.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {gridVideos.map((video, index) => (
                  <Reveal key={video.slug} delay={Math.min(index * 0.05, 0.35)}>
                    <VideoCard video={video} onPlay={setActiveVideo} />
                  </Reveal>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>

      {activeVideo ? (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      ) : null}
    </>
  );
}

function EventSpotlight({ event }: { event: Event }) {
  return (
    <Reveal>
      <section className="relative overflow-hidden border border-gold/30 bg-panel">
        <div className="absolute inset-0">
          <SafeImage
            src={event.poster}
            alt=""
            priority
            sizes="100vw"
            className="scale-105 opacity-25 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="eyebrow text-gold">
              Featured event <span className="mx-2 text-cream/25">/</span> {event.dateLabel}
            </p>
            <h2 className="display mt-4 max-w-3xl text-4xl text-white sm:text-6xl">
              {event.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/60">
              {event.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-cream/50">
              <span className="flex items-center gap-1.5">
                <Clock3 size={13} className="text-gold" /> {event.time}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={13} className="text-gold" /> {event.venue}, {event.city}
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/events/${event.slug}`} className="btn-outline !py-3 !text-sm">
                Event details <ArrowRight size={15} />
              </Link>
              {event.ticketUrl && event.ticketUrl !== "#" ? (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold !py-3 !text-sm"
                >
                  <Ticket size={15} /> Get tickets
                </a>
              ) : null}
            </div>
          </div>
          <Countdown target={event.date} />
        </div>
      </section>
    </Reveal>
  );
}

function EventCard({ event }: { event: Event }) {
  const upcoming = event.status === "upcoming";

  return (
    <article className="group flex h-full flex-col border border-white/10 bg-panel transition duration-300 hover:border-gold/50">
      <Link
        href={`/events/${event.slug}`}
        aria-label={`View ${event.title}`}
        className="relative block aspect-[16/10] overflow-hidden bg-black"
      >
        <SafeImage
          src={event.poster}
          alt={event.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
        <span
          className={`absolute left-3 top-3 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${
            upcoming ? "bg-gold text-black" : "border border-white/30 bg-black/75 text-cream"
          }`}
        >
          {upcoming ? "Upcoming" : "Final"}
        </span>
        <span className="absolute bottom-3 left-3 eyebrow text-gold-bright">
          {event.dateLabel}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/events/${event.slug}`}>
          <h3 className="display text-2xl leading-tight text-white transition group-hover:text-gold-bright">
            {event.title}
          </h3>
        </Link>
        <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-cream/50">
          <MapPin size={13} className="mt-0.5 shrink-0 text-gold" /> {event.venue}, {event.city}
        </p>
        <p className="mt-1.5 flex items-center gap-2 text-xs text-cream/40">
          <Clock3 size={13} className="text-gold" /> {event.time}
        </p>

        {!upcoming ? (
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="eyebrow mb-2 text-gold">Results</p>
            <ul className="space-y-1.5">
              {event.matchCard.map((match, index) => (
                <li
                  key={`${match.match}-${index}`}
                  className="flex items-start justify-between gap-3 text-[11px] leading-snug"
                >
                  <span className="line-clamp-2 text-cream/55">{match.match}</span>
                  <span className="shrink-0 font-bold uppercase tracking-wide text-gold">
                    {match.result}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-cream/70 transition hover:text-gold"
          >
            Details <ArrowUpRight size={14} />
          </Link>
          {upcoming && event.ticketUrl && event.ticketUrl !== "#" ? (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gold transition hover:text-gold-bright"
            >
              <Ticket size={14} /> Tickets
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function EventBrowser({
  events,
  featuredEvent,
  initialStatus = "all",
  initialQuery = "",
}: EventBrowserProps) {
  const [status, setStatus] = useState<EventStatus>(initialStatus);
  const [query, setQuery] = useState(initialQuery);
  const hasFilters = status !== "all" || query.trim().length > 0;

  const counts = useMemo<Record<EventStatus, number>>(
    () => ({
      all: events.length,
      upcoming: events.filter((event) => event.status === "upcoming").length,
      past: events.filter((event) => event.status === "past").length,
    }),
    [events],
  );

  const filtered = useMemo(() => {
    const term = normalize(query);
    return events.filter((event) => {
      const matchesStatus = status === "all" || event.status === status;
      const matchesQuery =
        !term ||
        [
          event.title,
          event.city,
          event.venue,
          event.dateLabel,
          event.description,
          event.status,
          ...event.matchCard.map((match) => `${match.match} ${match.type} ${match.result ?? ""}`),
        ]
          .join(" ")
          .toLowerCase()
          .includes(term);
      return matchesStatus && matchesQuery;
    });
  }, [events, status, query]);

  const reset = () => {
    setStatus("all");
    setQuery("");
  };

  const showSpotlight =
    status !== "past" && featuredEvent.status === "upcoming" && !query.trim();
  const gridEvents = showSpotlight
    ? filtered.filter((event) => event.slug !== featuredEvent.slug)
    : filtered;

  const tabs: { value: EventStatus; label: string }[] = [
    { value: "all", label: "All events" },
    { value: "upcoming", label: "Upcoming" },
    { value: "past", label: "Past" },
  ];

  return (
    <div className="space-y-8">
      <div className="border border-white/10 bg-panel/85 p-4 backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Event status">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={status === tab.value}
                onClick={() => setStatus(tab.value)}
                className={`flex shrink-0 items-center gap-2 border px-4 py-2.5 text-[11px] font-black uppercase tracking-widest transition ${chipClass(status === tab.value)}`}
              >
                {tab.label}
                <span className="opacity-60">{counts[tab.value]}</span>
              </button>
            ))}
          </div>
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Search events, cities, venues..."
            label="Search events"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cream/40">
            <CalendarDays size={14} className="text-gold" />
            {filtered.length} {filtered.length === 1 ? "event" : "events"} found
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-cream/50 transition hover:text-gold"
            >
              <RotateCcw size={13} /> Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No events found"
          description="Try another city, venue, or switch between upcoming and past events."
          onReset={reset}
        />
      ) : (
        <div className="space-y-8" role="tabpanel">
          {showSpotlight ? <EventSpotlight event={featuredEvent} /> : null}
          {gridEvents.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {gridEvents.map((event, index) => (
                <Reveal key={event.slug} delay={Math.min(index * 0.05, 0.35)}>
                  <EventCard event={event} />
                </Reveal>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
