import type { Metadata } from "next";
import { ArrowRight, House, Newspaper, Ticket, Users } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page not found",
  description: "The page you are looking for is not part of the AEW Universe.",
};

const escapeLinks = [
  { href: "/", label: "Home", detail: "Back to the main event", icon: House },
  { href: "/news", label: "News", detail: "Latest AEW stories", icon: Newspaper },
  { href: "/roster", label: "Roster", detail: "Meet the competitors", icon: Users },
  { href: "/events", label: "Events", detail: "Find the next show", icon: Ticket },
];

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden bg-black">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 size-[30rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -right-40 -top-32 size-[34rem] rotate-12 border-[4rem] border-gold/5" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-panel to-transparent" />
        <div className="absolute left-8 right-8 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="shell relative py-16 sm:py-24">
        <p className="eyebrow flex items-center gap-3 text-gold-bright">
          <span className="h-px w-8 bg-gold" /> Wrong turn in the ring
        </p>

        <div className="relative mt-5">
          <p
            aria-hidden="true"
            className="display pointer-events-none absolute -top-12 -left-2 text-[clamp(9rem,28vw,22rem)] leading-none text-gold/10 sm:-top-20"
          >
            404
          </p>
          <h1 className="display relative max-w-5xl text-[clamp(4rem,11vw,10rem)] leading-[0.85] text-white">
            This match <span className="text-gold">never happened.</span>
          </h1>
        </div>

        <p className="mt-8 max-w-xl text-sm leading-relaxed text-cream/60 sm:text-base">
          The page you were looking for has left the building. Take a breath, reset the
          championship, and get back to the action.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn-gold">
            <House size={16} /> Back to home
          </Link>
          <Link href="/events" className="btn-outline">
            See upcoming events <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-16 border-t border-white/15 pt-8">
          <p className="eyebrow text-cream/35">Get back in the action</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {escapeLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group border border-white/10 bg-panel/70 p-4 transition hover:border-gold/60 hover:bg-panel"
                >
                  <div className="flex items-center justify-between gap-3">
                    <Icon size={18} className="text-gold" />
                    <ArrowRight
                      size={15}
                      className="text-cream/25 transition group-hover:translate-x-1 group-hover:text-gold"
                    />
                  </div>
                  <p className="display mt-5 text-2xl text-white transition group-hover:text-gold-bright">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-cream/40">
                    {item.detail}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
