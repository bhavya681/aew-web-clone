import type { Metadata } from "next";
import { Play } from "lucide-react";
import { Suspense } from "react";
import VideoBrowser from "@/components/pages/VideoBrowser";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import { featuredVideo, videoCategories, videos } from "@/data/videos";

export const metadata: Metadata = {
  title: "Videos",
  description:
    "Watch AEW match highlights, full matches, interviews, promos, and behind-the-scenes features from the video vault.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function BrowserSkeleton() {
  return (
    <div className="space-y-8">
      <div className="h-28 animate-pulse border border-white/10 bg-panel/70" />
      <div className="h-[28rem] animate-pulse border border-white/10 bg-panel/40" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="h-80 animate-pulse border border-white/10 bg-panel/40" />
        ))}
      </div>
    </div>
  );
}

async function VideoContent({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestedCategory = firstValue(params.category) ?? "All";
  const initialCategory = videoCategories.some((item) => item === requestedCategory)
    ? requestedCategory
    : "All";
  const initialQuery = firstValue(params.search) ?? firstValue(params.q) ?? "";

  return (
    <VideoBrowser
      videos={videos}
      categories={videoCategories}
      featuredVideo={featuredVideo}
      initialCategory={initialCategory}
      initialQuery={initialQuery}
    />
  );
}

export default function VideosPage({ searchParams }: { searchParams: SearchParams }) {
  const availableCount = videos.filter((video) => video.youtubeId.trim()).length;

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-panel/40">
        <div className="pointer-events-none absolute -left-40 top-0 size-[30rem] rounded-full bg-gold/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-[26rem] rotate-45 border-[3rem] border-gold/5" />
        <div className="shell relative py-14 sm:py-20">
          <Reveal>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Videos" }]} />
            <p className="eyebrow mt-9 flex items-center gap-3 text-gold">
              <span className="flex size-6 items-center justify-center bg-gold text-black">
                <Play size={11} fill="currentColor" />
              </span>
              Watch all elite action
            </p>
            <h1 className="display mt-5 max-w-5xl break-words text-[clamp(3.5rem,10vw,8.5rem)] text-white">
              The Video <span className="text-gold">Vault</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/60 sm:text-lg">
              Relive the biggest matches, hear from the superstars, and go behind the scenes
              with AEW. Filter the archive and press play on available features.
            </p>
            <div className="mt-9 flex flex-wrap gap-x-9 gap-y-3 border-t border-white/10 pt-6 text-[11px] font-bold uppercase tracking-widest text-cream/40">
              <span>
                <strong className="display mr-2 text-2xl text-gold">{videos.length}</strong>
                Films
              </span>
              <span>
                <strong className="display mr-2 text-2xl text-gold">{videoCategories.length}</strong>
                Categories
              </span>
              <span>
                <strong className="display mr-2 text-2xl text-gold">{availableCount}</strong>
                Playable now
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell py-12 sm:py-16">
        <Suspense fallback={<BrowserSkeleton />}>
          <VideoContent searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}
