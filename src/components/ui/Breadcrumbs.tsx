import Link from "next/link";

type Props = {
  items: { label: string; href?: string }[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-cream/40">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`} className="flex items-center gap-2">
          {item.href ? (
            <Link href={item.href} className="transition hover:text-gold">
              {item.label}
            </Link>
          ) : (
            <span className="text-cream/75">{item.label}</span>
          )}
          {index < items.length - 1 ? <span className="text-gold">/</span> : null}
        </span>
      ))}
    </nav>
  );
}
