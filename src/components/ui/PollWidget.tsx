"use client";

import { Check, Radio } from "lucide-react";
import Image from "next/image";
import { useSyncExternalStore } from "react";
import { poll } from "@/data/extras";

const KEY = `aew-poll-${poll.id}`;
const EVENT = "aew-poll-change";
const BASE_VOTES = [428, 356, 291, 274];

const subscribe = (callback: () => void) => {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const getSnapshot = () => window.localStorage.getItem(KEY) || "";
const getServerSnapshot = () => "";

export default function PollWidget({ full = false }: { full?: boolean }) {
  const voted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const total = BASE_VOTES.reduce((sum, count) => sum + count, 0) + (voted ? 1 : 0);

  const vote = (id: string) => {
    if (voted) return;
    window.localStorage.setItem(KEY, id);
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <div className={full ? "border border-white/10 bg-panel p-6 sm:p-10" : "border border-white/10 bg-panel/70 p-6"}>
      <div className="flex items-center gap-2 text-gold">
        <Radio size={15} />
        <span className="eyebrow">Fan poll</span>
      </div>
      <h2 className="display mt-4 text-2xl text-white sm:text-3xl">{poll.question}</h2>
      <div className={`mt-6 grid gap-3 ${full ? "sm:grid-cols-2" : ""}`}>
        {poll.options.map((option, index) => {
          const count = BASE_VOTES[index] + (voted === option.id ? 1 : 0);
          const percent = Math.round((count / total) * 100);
          const selected = voted === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => vote(option.id)}
              disabled={Boolean(voted)}
              className={`group relative overflow-hidden border px-4 py-3 text-left transition ${
                selected ? "border-gold" : "border-white/10 hover:border-white/30"
              } ${voted ? "cursor-default" : "cursor-pointer"}`}
            >
              {voted ? (
                <span className="absolute inset-y-0 left-0 bg-gold/15" style={{ width: `${percent}%` }} />
              ) : null}
              <span className="relative flex items-center gap-3">
                {option.image ? (
                  <span className="relative size-10 shrink-0 overflow-hidden bg-black">
                    <Image src={option.image} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                ) : null}
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">{option.label}</span>
                {selected ? <Check size={15} className="text-gold" /> : null}
                {voted ? <span className="text-xs text-gold">{percent}%</span> : null}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-[11px] text-cream/35">
        {voted ? "Vote recorded on this device. Thanks for being part of the Universe." : `${total.toLocaleString()} votes cast · One vote per device`}
      </p>
    </div>
  );
}
