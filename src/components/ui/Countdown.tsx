"use client";

import { useEffect, useState } from "react";

type Remaining = { days: string; hours: string; minutes: string; seconds: string };

const EMPTY: Remaining = { days: "--", hours: "--", minutes: "--", seconds: "--" };

export default function Countdown({ target }: { target: string }) {
  const [remaining, setRemaining] = useState<Remaining>(EMPTY);

  useEffect(() => {
    const update = () => {
      const distance = new Date(target).getTime() - Date.now();
      if (distance <= 0) {
        setRemaining({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }
      const pad = (value: number) => String(value).padStart(2, "0");
      setRemaining({
        days: pad(Math.floor(distance / 86_400_000)),
        hours: pad(Math.floor((distance / 3_600_000) % 24)),
        minutes: pad(Math.floor((distance / 60_000) % 60)),
        seconds: pad(Math.floor((distance / 1000) % 60)),
      });
    };
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  const units: [keyof Remaining, string][] = [
    ["days", "Days"],
    ["hours", "Hrs"],
    ["minutes", "Min"],
    ["seconds", "Sec"],
  ];

  return (
    <div className="flex gap-3 sm:gap-5" aria-label="Countdown to event">
      {units.map(([key, label]) => (
        <div key={key} className="min-w-12 text-center">
          <div className="display border border-white/15 bg-black/60 px-2 py-2 text-2xl text-white sm:text-3xl">
            {remaining[key]}
          </div>
          <div className="eyebrow mt-2 text-[9px] text-cream/40">{label}</div>
        </div>
      ))}
    </div>
  );
}
