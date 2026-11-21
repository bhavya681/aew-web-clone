import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SafeImage from "@/components/ui/SafeImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { articles, getArticle } from "@/data/news";

export const instant = false;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    return { title: "Story not found" };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: article.href },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  const related = [
    ...articles.filter(
      (item) => item.category === article.category && item.slug !== article.slug,
    ),
    ...articles.filter(
      (item) => item.category !== article.category && item.slug !== article.slug,
    ),
  ].slice(0, 3);

  return (
    <>
      <section className="relative border-b border-white/10 bg-panel/40">
        <div className="shell py-12 sm:py-16">
          <Reveal>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "News", href: "/news" },
                {
                  label: article.category,
                  href: `/news?category=${encodeURIComponent(article.category)}`,
                },
                { label: article.title },
              ]}
            />
            <div className="mt-10 max-w-5xl">
              <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-gold">
                <span>{article.category}</span>
                <span className="text-cream/25">/</span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={13} /> {article.dateLabel}
                </span>
                <span className="text-cream/25">/</span>
                <span>By {article.author}</span>
              </p>
              <h1 className="display mt-6 break-words text-[clamp(3rem,8vw,7rem)] text-white">
                {article.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-cream/60 sm:text-xl">
                {article.excerpt}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell pt-10 sm:pt-14">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-black sm:aspect-[21/9]">
            <SafeImage
              src={article.image}
              alt={article.title}
              priority
              sizes="100vw"
              position="center 30%"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </Reveal>
      </section>

      <section className="shell grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="max-w-3xl">
          <Reveal>
            <div className="gold-rule h-0.5 w-24" />
            <div className="mt-8 space-y-7">
              {article.content.map((paragraph, index) => (
                <p
                  key={`${article.slug}-${index}`}
                  className={
                    index === 0
                      ? "text-xl font-medium leading-relaxed text-white sm:text-2xl"
                      : "text-base leading-[1.85] text-cream/70 sm:text-lg"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 border-t border-white/10 pt-7">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gold transition hover:text-gold-bright"
              >
                <ArrowRight size={15} className="rotate-180" /> Back to all news
              </Link>
            </div>
          </Reveal>
        </article>

        <aside className="h-fit border border-white/10 bg-panel p-6">
          <p className="eyebrow text-gold">Story details</p>
          <dl className="mt-5 space-y-5 text-sm">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-cream/35">
                Category
              </dt>
              <dd className="mt-1 font-semibold text-white">{article.category}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-cream/35">
                Published
              </dt>
              <dd className="mt-1 font-semibold text-white">{article.dateLabel}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-cream/35">
                Written by
              </dt>
              <dd className="mt-1 font-semibold text-white">{article.author}</dd>
            </div>
          </dl>
          <Link
            href={`/news?category=${encodeURIComponent(article.category)}`}
            className="mt-7 inline-flex items-center gap-2 border-t border-white/10 pt-5 text-[11px] font-black uppercase tracking-widest text-gold transition hover:text-gold-bright"
          >
            More in {article.category} <ArrowUpRight size={14} />
          </Link>
        </aside>
      </section>

      <section className="border-t border-white/10 bg-panel/30 py-16 sm:py-24">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Keep reading"
              title={<>More from the <span className="text-gold">Universe</span></>}
              description="The latest coverage from the same category and across All Elite Wrestling."
              action={
                <Link href="/news" className="btn-outline !py-3 !text-sm">
                  All news <ArrowUpRight size={15} />
                </Link>
              }
            />
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.08}>
                <Link
                  href={`/news/${item.slug}`}
                  className="group flex h-full flex-col border border-white/10 bg-panel transition hover:-translate-y-1 hover:border-gold/60"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-black">
                    <SafeImage
                      src={item.image}
                      alt={item.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 bg-black/80 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-gold">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="eyebrow text-cream/35">{item.dateLabel}</p>
                    <h3 className="display mt-2 text-xl leading-tight text-white transition group-hover:text-gold-bright">
                      {item.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-cream/55">
                      {item.excerpt}
                    </p>
                    <span className="mt-auto flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-widest text-gold">
                      Read story <ArrowUpRight size={13} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
