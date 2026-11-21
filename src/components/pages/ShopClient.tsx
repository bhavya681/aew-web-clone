"use client";

import { Check, ChevronDown, SearchX, ShoppingBag, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/components/layout/AppProviders";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import {
  productCategories,
  products,
  type Product,
  type ProductCategory,
} from "@/data/products";

type SortOption = "featured" | "price-asc" | "price-desc" | "name";
type CategoryFilter = ProductCategory | "All";

const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  name: "Name: A to Z",
};

export default function ShopClient({ initialProductId }: { initialProductId?: string }) {
  const { addToCart, cartCount, setCartOpen } = useApp();
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [sort, setSort] = useState<SortOption>("featured");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(initialProductId ?? null);

  useEffect(() => {
    if (!selectedId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedId]);

  const visibleProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesTerm =
        !term ||
        `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });

    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, query, sort]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedId) ?? null,
    [selectedId],
  );

  const resetFilters = () => {
    setCategory("All");
    setSort("featured");
    setQuery("");
  };

  const handleAdd = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setSelectedId(null);
  };

  return (
    <>
      <div className="border-b border-white/10 bg-panel/60">
        <div className="shell py-8 sm:py-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="eyebrow flex items-center gap-3 text-gold">
                <span className="h-px w-8 bg-gold" /> The collection
              </p>
              <h2 className="display mt-3 text-4xl text-white sm:text-5xl">
                Gear up for the <span className="text-gold">Universe.</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="btn-outline !py-3 !text-sm"
            >
              <ShoppingBag size={16} /> View bag
              <span className="ml-1 bg-gold px-2 py-0.5 text-[10px] font-black text-black">
                {cartCount}
              </span>
            </button>
          </div>

          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
            {(["All", ...productCategories] as CategoryFilter[]).map((item) => {
              const active = item === category;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  aria-pressed={active}
                  className={`shrink-0 border px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] transition ${
                    active
                      ? "border-gold bg-gold text-black"
                      : "border-white/15 bg-black/40 text-cream/60 hover:border-gold/60 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <label htmlFor="shop-search" className="sr-only">Search products</label>
              <input
                id="shop-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the collection"
                className="w-full border border-white/15 bg-black/60 px-4 py-3 text-sm text-white outline-none transition placeholder:text-cream/30 focus:border-gold"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 transition hover:text-white"
                >
                  <X size={16} />
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-4">
              <p className="text-xs uppercase tracking-widest text-cream/40">
                {visibleProducts.length} {visibleProducts.length === 1 ? "item" : "items"}
              </p>
              <div className="relative">
                <SlidersHorizontal size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gold" />
                <label htmlFor="shop-sort" className="sr-only">Sort products</label>
                <select
                  id="shop-sort"
                  value={sort}
                  onChange={(event) => setSort(event.target.value as SortOption)}
                  className="appearance-none border border-white/15 bg-black/60 py-3 pl-9 pr-10 text-xs font-bold uppercase tracking-widest text-white outline-none transition focus:border-gold"
                >
                  {(Object.keys(sortLabels) as SortOption[]).map((option) => (
                    <option key={option} value={option} className="bg-panel text-white">
                      {sortLabels[option]}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cream/45" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="shell py-12 sm:py-16">
        {visibleProducts.length ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index, 8) * 0.05}>
                <article className="group flex h-full flex-col border border-white/10 bg-panel transition duration-300 hover:border-gold/60">
                  <div className="relative aspect-square overflow-hidden bg-black">
                    <button
                      type="button"
                      onClick={() => setSelectedId(product.id)}
                      aria-label={`Quick view ${product.name}`}
                      className="absolute inset-0 z-10 cursor-pointer"
                    />
                    <SafeImage
                      src={product.image}
                      alt={product.name}
                      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="transition duration-700 group-hover:scale-105"
                    />
                    {product.badge ? (
                      <span className="absolute left-2 top-2 z-20 bg-gold px-2 py-1 text-[9px] font-black uppercase tracking-widest text-black">
                        {product.badge}
                      </span>
                    ) : null}
                    <span className="absolute inset-x-3 bottom-3 z-20 translate-y-1 bg-black/85 py-2 text-center text-[10px] font-black uppercase tracking-[0.18em] text-gold opacity-100 backdrop-blur-sm transition sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100">
                      Quick view
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="eyebrow text-gold">{product.category}</p>
                    <button
                      type="button"
                      onClick={() => setSelectedId(product.id)}
                      className="mt-2 text-left text-sm font-bold leading-snug text-white transition hover:text-gold-bright"
                    >
                      {product.name}
                    </button>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                      <span className="display text-xl text-gold-bright">${product.price.toFixed(2)}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedId(product.id)}
                        aria-label={`View details for ${product.name}`}
                        className="flex size-8 shrink-0 items-center justify-center border border-white/15 text-cream/60 transition hover:border-gold hover:text-gold"
                      >
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="mx-auto flex max-w-xl flex-col items-center border border-dashed border-white/15 bg-panel/50 px-6 py-20 text-center">
              <SearchX size={38} className="text-gold" />
              <h3 className="display mt-6 text-3xl text-white">Nothing on the rack.</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/55">
                No products match those filters. Try another category or clear your search to see the full collection.
              </p>
              <button type="button" onClick={resetFilters} className="btn-gold mt-7 !py-3 !text-sm">
                Reset filters
              </button>
            </div>
          </Reveal>
        )}

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <Check size={13} className="text-gold" /> Officially licensed AEW merchandise
          </p>
          <p>Demo store only — no payment is processed.</p>
        </div>
      </section>

      {selectedProduct ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setSelectedId(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto grid w-full max-w-4xl grid-cols-1 border border-gold/40 bg-panel shadow-[0_40px_120px_rgba(0,0,0,0.9)] md:grid-cols-2"
          >
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              aria-label="Close quick view"
              className="absolute right-3 top-3 z-20 flex size-9 items-center justify-center border border-white/20 bg-black/70 text-cream/70 transition hover:border-gold hover:text-gold"
            >
              <X size={17} />
            </button>

            <div className="relative aspect-[5/4] overflow-hidden bg-black md:aspect-auto md:min-h-[26rem]">
              <SafeImage
                src={selectedProduct.image}
                alt={selectedProduct.name}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="transition duration-700"
              />
              {selectedProduct.badge ? (
                <span className="absolute left-4 top-4 bg-gold px-2 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                  {selectedProduct.badge}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col p-6 sm:p-9">
              <p className="eyebrow text-gold">{selectedProduct.category} · Quick view</p>
              <h2 id="quick-view-title" className="display mt-4 text-3xl leading-tight text-white sm:text-4xl">
                {selectedProduct.name}
              </h2>
              <p className="display mt-5 text-3xl text-gold-bright">${selectedProduct.price.toFixed(2)}</p>
              <p className="mt-5 text-sm leading-relaxed text-cream/60">{selectedProduct.description}</p>

              <div className="mt-7 space-y-3 border-y border-white/10 py-5 text-xs text-cream/50">
                <p className="flex items-center gap-2"><Check size={14} className="text-gold" /> Officially licensed merchandise</p>
                <p className="flex items-center gap-2"><Check size={14} className="text-gold" /> Ships from the AEW collection</p>
                <p className="flex items-center gap-2"><Check size={14} className="text-gold" /> Demo bag — checkout is disabled</p>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
                <button type="button" onClick={() => handleAdd(selectedProduct)} className="btn-gold flex-1">
                  <ShoppingBag size={16} /> Add to bag
                </button>
                <button type="button" onClick={() => setSelectedId(null)} className="btn-outline flex-1">
                  Keep browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
