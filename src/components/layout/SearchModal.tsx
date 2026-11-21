"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { articles } from "@/data/news";
import { videos } from "@/data/videos";
import { wrestlers } from "@/data/wrestlers";
import { events } from "@/data/events";
import { championships } from "@/data/championships";
import { useApp } from "./AppProviders";

type Result = {
  type: string;
  title: string;
  subtitle: string;
  href: string;
  image?: string;
};

const allResults: Result[] = [
  ...wrestlers.map((item) => ({ type: "Wrestler", title: item.name, subtitle: item.division, href: `/roster/${item.slug}`, image: item.image })),
  ...articles.map((item) => ({ type: "News", title: item.title, subtitle: item.category, href: `/news/${item.slug}`, image: item.image })),
  ...events.map((item) => ({ type: "Event", title: item.title, subtitle: item.dateLabel, href: `/events/${item.slug}`, image: item.poster })),
  ...videos.map((item) => ({ type: "Video", title: item.title, subtitle: item.category, href: `/videos?search=${encodeURIComponent(item.title)}`, image: item.thumbnail })),
  ...championships.map((item) => ({ type: "Championship", title: item.name, subtitle: `Champion: ${item.champion}`, href: `/championships/${item.slug}`, image: item.belt })),
];

export default function SearchModal() {
  const { searchOpen, setSearchOpen } = useApp();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return allResults.slice(0, 8);
    return allResults
      .filter((result) => `${result.title} ${result.subtitle} ${result.type}`.toLowerCase().includes(term))
      .slice(0, 12);
  }, [query]);

  const go = (result: Result) => {
    setSearchOpen(false);
    setQuery("");
    setActive(0);
    router.push(result.href);
  };

  const grouped = useMemo(() => {
    const groups = new Map<string, Result[]>();
    results.forEach((result) => {
      groups.set(result.type, [...(groups.get(result.type) || []), result]);
    });
    return [...groups.entries()];
  }, [results]);

  return (
    <AnimatePresence>
      {searchOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/85 px-4 pt-20 backdrop-blur-sm"
          onMouseDown={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="w-full max-w-2xl border border-white/15 bg-panel shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search size={19} className="text-gold" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setActive((current) => Math.min(current + 1, results.length - 1));
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setActive((current) => Math.max(current - 1, 0));
                  }
                  if (event.key === "Enter" && results[active]) go(results[active]);
                }}
                placeholder="Search wrestlers, news, events, videos..."
                aria-label="Global search"
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-cream/30"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="text-cream/45 transition hover:text-white">
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-3">
              {results.length ? (
                grouped.map(([type, items]) => (
                  <div key={type} className="mb-4">
                    <p className="eyebrow px-2 py-2 text-cream/35">{type}</p>
                    {items.map((result) => {
                      const index = results.indexOf(result);
                      return (
                        <button
                          key={`${result.type}-${result.title}`}
                          type="button"
                          onMouseEnter={() => setActive(index)}
                          onClick={() => go(result)}
                          className={`flex w-full items-center gap-3 px-2 py-2 text-left transition ${active === index ? "bg-white/10" : "hover:bg-white/5"}`}
                        >
                          <span className="relative size-11 shrink-0 overflow-hidden bg-black">
                            {result.image ? (
                              <Image src={result.image} alt="" fill sizes="44px" className="object-cover" />
                            ) : null}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-white">{result.title}</span>
                            <span className="block truncate text-[11px] text-cream/40">{result.subtitle}</span>
                          </span>
                          <ArrowRight size={14} className="text-gold" />
                        </button>
                      );
                    })}
                  </div>
                ))
              ) : (
                <div className="py-14 text-center">
                  <p className="display text-2xl text-white">No results found</p>
                  <p className="mt-2 text-sm text-cream/45">Try a different name or keyword.</p>
                </div>
              )}
            </div>
            <div className="border-t border-white/10 px-5 py-3 text-[10px] uppercase tracking-widest text-cream/30">
              ↑ ↓ Navigate · ↵ Select · Esc Close
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
