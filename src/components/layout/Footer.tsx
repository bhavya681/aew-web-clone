"use client";

import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { footerGroups, legalLinks, socialLinks } from "@/data/site";
import AEWLogo from "../ui/AEWLogo";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setStatus(/^\S+@\S+\.\S+$/.test(email) ? "success" : "error");
  };

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="shell py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <AEWLogo />
            <p className="display mt-6 max-w-xs text-3xl leading-tight text-white">
              All Elite. <span className="text-gold">All In.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/45">
              A new era of professional wrestling. Home to the most electrifying
              athletes, the biggest matches, and the most passionate fans in the world.
            </p>
            <form onSubmit={submit} className="mt-8 max-w-sm">
              <label htmlFor="newsletter" className="eyebrow text-cream/45">
                Join the AEW Insider list
              </label>
              <div className="mt-3 flex border border-white/20 focus-within:border-gold">
                <div className="flex items-center pl-3 text-cream/40">
                  <Mail size={16} />
                </div>
                <input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setStatus("idle");
                  }}
                  placeholder="you@email.com"
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-cream/30"
                />
                <button type="submit" aria-label="Subscribe" className="bg-gold px-4 text-black transition hover:bg-gold-bright">
                  <ArrowRight size={18} />
                </button>
              </div>
              {status === "success" ? (
                <p className="mt-2 text-xs font-semibold text-gold">You’re on the list. Welcome to the Universe.</p>
              ) : null}
              {status === "error" ? (
                <p className="mt-2 text-xs font-semibold text-red-400">Enter a valid email address.</p>
              ) : null}
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p className="eyebrow text-gold">{group.title}</p>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-cream/55 transition hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-black tracking-widest text-cream/45 transition hover:text-gold"
              >
                {social.label}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 text-[11px] text-cream/35">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-cream">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-6 text-[11px] text-cream/25">
          © 2019–2026 All Elite Wrestling, LLC. All Rights Reserved. This is an independent design study.
        </p>
      </div>
    </footer>
  );
}
