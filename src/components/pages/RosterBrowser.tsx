"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, RotateCcw, Search, SearchX, SlidersHorizontal, Trophy, X } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";
import type { Division, Wrestler } from "@/data/wrestlers";

type Props = {
  wrestlers: Wrestler[];
  divisions: Division[];
  factions: string[];
};

type Sort = "name" | "division";

const PAGE_SIZE = 18;
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const selectClass =
  "h-11 w-full min-w-0 appearance-none border border-white/15 bg-panel px-3 pr-8 text-xs font-bold uppercase tracking-wider text-cream outline-none transition focus:border-gold";

export default function RosterBrowser({ wrestlers, divisions, factions }: Props) {
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState("all");
  const [faction, setFaction] = useState("all");
  const [gender, setGender] = useState("all");
  const [championsOnly, setChampionsOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("name");
  const [letter, setLetter] = useState("all");
  const filterKey = [query, division, faction, gender, championsOnly, sort, letter].join("|");
  const [pageState, setPageState] = useState({ key: filterKey, count: PAGE_SIZE });
  const visible = pageState.key === filterKey ? pageState.count : PAGE_SIZE;
  const setVisible = (next: number | ((current: number) => number)) => {
    setPageState((state) => {
      const current = state.key === filterKey ? state.count : PAGE_SIZE;
      return { key: filterKey, count: typeof next === "function" ? next(current) : next };
    });
  };

  const baseResults = useMemo(() => {
    const term = query.trim().toLowerCase();
    return wrestlers.filter((wrestler) => {
      if (championsOnly && !wrestler.champion) return false;
      if (division !== "all" && wrestler.division !== division) return false;
      if (faction !== "all" && wrestler.faction !== faction) return false;
      if (gender !== "all" && wrestler.gender !== gender) return false;
      if (!term) return true;
      return [wrestler.name, wrestler.nickname, wrestler.division, wrestler.faction, wrestler.title ?? ""]
        .some((value) => value.toLowerCase().includes(term));
    });
  }, [wrestlers, query, division, faction, gender, championsOnly]);

  const availableLetters = useMemo(
    () => new Set(baseResults.map((wrestler) => wrestler.name.trim().charAt(0).toUpperCase() || "#")),
    [baseResults],
  );

  const results = useMemo(() => {
    const filtered = letter === "all"
      ? baseResults
      : baseResults.filter((wrestler) => wrestler.name.trim().charAt(0).toUpperCase() === letter);
    return [...filtered].sort((a, b) =>
      sort === "division"
        ? a.division.localeCompare(b.division) || a.name.localeCompare(b.name)
        : a.name.localeCompare(b.name),
    );
  }, [baseResults, letter, sort]);

  const reset = () => {
    setQuery("");
    setDivision("all");
    setFaction("all");
    setGender("all");
    setChampionsOnly(false);
    setSort("name");
    setLetter("all");
    setVisible(PAGE_SIZE);
  };

  const shown = results.slice(0, visible);
  const activeFilters = [query.trim(), division !== "all", faction !== "all", gender !== "all", championsOnly, letter !== "all"]
    .filter(Boolean).length;

  return (
    <div className="mt-10">
      <div className="sticky top-20 z-30 -mx-4 border-y border-white/10 bg-black/90 px-4 py-4 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[190px] flex-1 sm:max-w-xs">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search superstars"
              aria-label="Search superstars"
              className="h-11 w-full border border-white/15 bg-panel pl-9 pr-9 text-sm text-white outline-none transition placeholder:text-cream/30 focus:border-gold"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center text-cream/40 transition hover:text-gold"
              >
                <X size={14} />
              </button>
            ) : null}
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-1">
            <label className="relative block min-w-0 sm:w-36">
              <span className="sr-only">Filter by division</span>
              <select value={division} onChange={(event) => setDivision(event.target.value)} className={selectClass}>
                <option value="all">All divisions</option>
                {divisions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gold" />
            </label>

            <label className="relative block min-w-0 sm:w-40">
              <span className="sr-only">Filter by faction</span>
              <select value={faction} onChange={(event) => setFaction(event.target.value)} className={selectClass}>
                <option value="all">All factions</option>
                {factions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gold" />
            </label>

            <label className="relative block min-w-0 sm:w-32">
              <span className="sr-only">Filter by gender</span>
              <select value={gender} onChange={(event) => setGender(event.target.value)} className={selectClass}>
                <option value="all">All genders</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Team">Team</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gold" />
            </label>

            <label className="relative block min-w-0 sm:w-32">
              <span className="sr-only">Sort roster</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as Sort)}
                className={selectClass}
              >
                <option value="name">Sort: A-Z</option>
                <option value="division">Sort: Division</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gold" />
            </label>
          </div>

          <button
            type="button"
            aria-pressed={championsOnly}
            onClick={() => setChampionsOnly((value) => !value)}
            className={`flex h-11 shrink-0 items-center gap-2 border px-4 text-xs font-bold uppercase tracking-wider transition ${
              championsOnly
                ? "border-gold bg-gold text-black"
                : "border-white/15 bg-panel text-cream/70 hover:border-gold hover:text-white"
            }`}
          >
            <Trophy size={14} /> Champions
          </button>
        </div>

        <div className="no-scrollbar mt-4 flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="mr-1 flex shrink-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-cream/35">
            <SlidersHorizontal size={12} /> Jump
          </span>
          <button
            type="button"
            onClick={() => setLetter("all")}
            className={`h-8 shrink-0 border px-3 text-[11px] font-bold transition ${
              letter === "all" ? "border-gold bg-gold text-black" : "border-white/15 text-cream/55 hover:border-gold hover:text-gold"
            }`}
          >
            All
          </button>
          {LETTERS.map((item) => {
            const available = availableLetters.has(item);
            return (
              <button
                key={item}
                type="button"
                disabled={!available}
                onClick={() => setLetter(item)}
                className={`h-8 w-8 shrink-0 border text-[11px] font-bold transition ${
                  letter === item
                    ? "border-gold bg-gold text-black"
                    : available
                      ? "border-white/15 text-cream/55 hover:border-gold hover:text-gold"
                      : "cursor-not-allowed border-white/5 text-cream/15"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-cream/45">
          Showing <span className="text-gold">{shown.length}</span> of{" "}
          <span className="text-white">{results.length}</span> matching superstars
          <span className="hidden sm:inline"> · {wrestlers.length} total</span>
        </p>
        {activeFilters > 0 ? (
          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cream/45 transition hover:text-gold"
          >
            <RotateCcw size={13} /> Clear filters
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="mt-6 border border-white/10 bg-panel/60 px-6 py-20 text-center">
          <SearchX size={32} className="mx-auto text-gold" />
          <h3 className="display mt-5 text-3xl text-white sm:text-4xl">No superstars found</h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/50">
            Nothing matches that combination. Try another name or clear a filter to see the whole locker room.
          </p>
          <button type="button" onClick={reset} className="btn-outline mt-7">
            <RotateCcw size={14} /> Reset filters
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shown.map((wrestler) => (
              <Link
                key={wrestler.slug}
                href={`/roster/${wrestler.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden border border-white/10 bg-panel"
              >
                <SafeImage
                  src={wrestler.image}
                  alt={wrestler.name}
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  position="center 18%"
                  className="grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
                  <span className="eyebrow text-[9px] text-gold-bright/80">{wrestler.division}</span>
                  {wrestler.champion ? (
                    <span className="flex size-6 shrink-0 items-center justify-center bg-gold text-black" title="Champion">
                      <Trophy size={12} />
                    </span>
                  ) : null}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <h3 className="display text-lg leading-none text-white transition group-hover:text-gold-bright sm:text-xl">
                    {wrestler.name}
                  </h3>
                  <p className="mt-2 truncate text-[9px] font-semibold uppercase tracking-widest text-cream/45">
                    {wrestler.faction}
                  </p>
                  {wrestler.champion && wrestler.title ? (
                    <p className="mt-2 truncate text-[10px] font-semibold text-gold">{wrestler.title}</p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>

          {visible < results.length ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((value) => value + PAGE_SIZE)}
                className="btn-outline"
              >
                <ArrowRight size={16} /> Load more · {results.length - visible} left
              </button>
            </div>
          ) : results.length > PAGE_SIZE ? (
            <p className="mt-10 text-center text-[10px] font-bold uppercase tracking-widest text-cream/30">
              You have reached the end of the roster
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
