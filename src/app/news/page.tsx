import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import { NewsBrowser } from "@/components/pages/VideoBrowser";
import { articles, newsCategories } from "@/data/news";

export const metadata: Metadata = {
  title: "News",
  description:
    "Breaking AEW news, match results, exclusive interviews, announcements, and stories from across the wrestling world.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function BrowserSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-28 animate-pulse border border-white/10 bg-panel/70" />
      <div className="h-96 animate-pulse border border-white/10 bg-panel/40" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-80 animate-pulse border border-white/10 bg-panel/40" />
        ))}
      </div>
    </div>
  );
}

async function NewsContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestedCategory = firstValue(params.category) ?? "All";
  const initialCategory = newsCategories.some((item) => item === requestedCategory)
    ? requestedCategory
    : "All";
  const initialQuery = firstValue(params.q) ?? firstValue(params.search) ?? "";

  return (
    <NewsBrowser
      articles={articles}
      categories={newsCategories}
      initialCategory={initialCategory}
      initialQuery={initialQuery}
    />
  );
}

export default function NewsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-panel/40">
        <div className="pointer-events-none absolute -right-32 -top-48 size-[34rem] rotate-12 border-[4rem] border-gold/5" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 size-[24rem] rounded-full bg-gold/5 blur-3xl" />
        <div className="shell relative py-14 sm:py-20">
          <Reveal>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "News" }]} />
            <p className="eyebrow mt-9 flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold" /> The latest from the universe
            </p>
            <h1 className="display mt-5 max-w-5xl break-words text-[clamp(3.5rem,10vw,8.5rem)] text-white">
              News &amp; <span className="text-gold">Stories</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/60 sm:text-lg">
              Breaking news, match results, exclusive interviews, and the stories shaping
              All Elite Wrestling week after week.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-9 gap-y-3 border-t border-white/10 pt-6 text-[11px] font-bold uppercase tracking-widest text-cream/40">
              <span>
                <strong className="display mr-2 text-2xl text-gold">{articles.length}</strong>
                Stories
              </span>
              <span>
                <strong className="display mr-2 text-2xl text-gold">{newsCategories.length}</strong>
                Categories
              </span>
              <span>Updated daily</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        <Suspense fallback={<BrowserSkeleton />}>
          <NewsContent searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
