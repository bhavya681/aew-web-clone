import type { Metadata } from "next";
import { ArrowRight, ShoppingBag, Sparkles, Trophy } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ShopClient from "@/components/pages/ShopClient";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SafeImage from "@/components/ui/SafeImage";
import { productCategories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Official AEW Shop",
  description:
    "Explore officially licensed AEW replica titles, apparel, hoodies, accessories, and collectibles.",
};

type ShopPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const featured = products[0];

async function ShopExperience({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const rawProduct = params.product;
  const productId = Array.isArray(rawProduct) ? rawProduct[0] : rawProduct;
  return <ShopClient initialProductId={productId} />;
}

function ShopFallback() {
  return (
    <div className="shell animate-pulse py-16">
      <div className="h-40 border-b border-white/10 bg-panel/60" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="border border-white/10 bg-panel">
            <div className="aspect-square bg-white/5" />
            <div className="space-y-3 p-4">
              <div className="h-2 w-16 bg-white/10" />
              <div className="h-4 w-full bg-white/10" />
              <div className="h-4 w-2/3 bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-black">
        <div className="pointer-events-none absolute -left-32 top-0 size-[30rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 size-[26rem] rotate-12 border-[3rem] border-gold/5" />
        <div className="shell relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="min-w-0">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
            <p className="eyebrow mt-10 flex items-center gap-3 text-gold-bright">
              <span className="inline-block size-2 animate-pulse bg-gold" /> Official AEW collection
            </p>
            <h1 className="display mt-5 text-[clamp(3.5rem,9vw,8rem)] text-white">
              Wear the <span className="text-gold">gold.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/65 sm:text-base">
              Replica titles, tour tees, heavyweight hoodies, and limited collectibles. Bring the
              arena energy home with gear built for the AEW Universe.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#collection" className="btn-gold">
                Shop the collection <ArrowRight size={16} />
              </a>
              <Link href="/champions" className="btn-outline">
                See the champions <Trophy size={16} />
              </Link>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
              <div>
                <p className="display text-3xl text-gold-bright">{products.length}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-cream/40">Pieces</p>
              </div>
              <div>
                <p className="display text-3xl text-gold-bright">{productCategories.length}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-cream/40">Categories</p>
              </div>
              <div>
                <p className="display flex items-center gap-2 text-3xl text-gold-bright">
                  <Sparkles size={22} /> 100%
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-cream/40">Licensed</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 border border-gold/25 sm:-inset-6" />
            <div className="relative aspect-[4/5] overflow-hidden border border-white/15 bg-panel shadow-[0_40px_100px_-40px_rgba(176,148,45,0.7)]">
              <SafeImage
                src={featured.image}
                alt={featured.name}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                position="center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="eyebrow text-gold-bright">Featured drop</p>
                <p className="display mt-2 text-2xl leading-tight text-white sm:text-3xl">
                  {featured.name}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="display text-2xl text-gold">${featured.price.toFixed(2)}</span>
                  <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-cream/55">
                    <ShoppingBag size={13} /> Add from the grid
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="collection" className="scroll-mt-20">
        <Suspense fallback={<ShopFallback />}>
          <ShopExperience searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
