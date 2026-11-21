import Link from "next/link";

export default function AEWLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" aria-label="AEW home" className="group inline-flex items-center gap-2">
      <span className="relative inline-flex h-9 items-center justify-center overflow-hidden bg-gold px-2.5">
        <span className="display text-2xl leading-none text-black">AEW</span>
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/50" />
      </span>
      {!compact ? (
        <span className="hidden text-[9px] font-bold uppercase leading-tight tracking-[0.2em] text-cream/60 sm:block">
          All Elite
          <br />
          Wrestling
        </span>
      ) : null}
    </Link>
  );
}
