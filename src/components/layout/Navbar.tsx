"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Search, ShoppingBag, Ticket, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "./AppProviders";
import { moreNavigation, navigation, socialLinks } from "@/data/site";
import AEWLogo from "../ui/AEWLogo";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, setCartOpen, setSearchOpen } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(
    typeof window !== "undefined" && window.scrollY > 24,
  );
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-white/10 bg-black/95 backdrop-blur-xl"
            : "border-transparent bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="shell flex h-20 items-center justify-between gap-6">
          <AEWLogo />

          <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`display relative py-2 text-sm tracking-wide transition-colors ${
                  isActive(item.href) ? "text-gold-bright" : "text-cream/75 hover:text-white"
                }`}
              >
                {item.label}
                {isActive(item.href) ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gold"
                  />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-3 border-r border-white/10 pr-4 lg:flex">
              {socialLinks.slice(0, 4).map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-[10px] font-black tracking-widest text-cream/45 transition hover:text-gold"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="flex size-10 items-center justify-center border border-white/15 text-cream/70 transition hover:border-gold hover:text-gold"
            >
              <Search size={17} />
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart with ${cartCount} items`}
              className="relative flex size-10 items-center justify-center border border-white/15 text-cream/70 transition hover:border-gold hover:text-gold"
            >
              <ShoppingBag size={17} />
              {cartCount > 0 ? (
                <span className="absolute -right-1.5 -top-1.5 flex min-w-5 items-center justify-center bg-gold px-1 text-[9px] font-black text-black">
                  {cartCount}
                </span>
              ) : null}
            </button>
            <a
              href="https://www.allelitewrestling.com/events"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold hidden !px-4 !py-2.5 !text-sm sm:inline-flex"
            >
              <Ticket size={15} /> Tickets
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="flex size-10 items-center justify-center border border-white/15 text-cream xl:hidden"
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -16 }}
            transition={{ duration: reduced ? 0.01 : 0.25 }}
            className="fixed inset-x-0 top-20 z-40 max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-white/10 bg-black/98 xl:hidden"
          >
            <div className="shell grid gap-8 py-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-gold">Navigate</p>
                <div className="mt-4 grid gap-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`display border-b border-white/10 py-3 text-2xl ${
                        isActive(item.href) ? "text-gold" : "text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="eyebrow text-gold">More from AEW</p>
                <div className="mt-4 grid gap-1">
                  {moreNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="display border-b border-white/10 py-3 text-xl text-cream/75"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white/15 px-3 py-2 text-[10px] font-black tracking-widest text-cream/60"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
