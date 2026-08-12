import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, MessageCircle } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import CTASection from "@/components/home/CTASection";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { blogPosts, site } from "@/lib/data";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return buildMetadata({ title: "Article Not Found", description: "", path: "/blog" });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image,
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ])
          ),
        }}
      />

      <section className="relative pt-14 pb-10 border-b border-ink/10">
        <div className="container">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-gold-700 mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <Reveal>
            <span className="eyebrow">{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold leading-tight mb-6 max-w-3xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-ink/45">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container grid lg:grid-cols-[1fr_320px] gap-14">
          <Reveal>
            <div className="relative h-72 md:h-96 rounded-xl2 overflow-hidden mb-10">
              <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 800px" priority />
            </div>
            <div className="prose-custom space-y-6">
              {post.content.map((para, i) => (
                <p key={i} className="text-ink/70 leading-relaxed text-[1.05rem]">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.1}>
              <div className="glass-card p-6">
                <span className="eyebrow">Continue Reading</span>
                <div className="space-y-4 mt-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="block group">
                      <p className="font-heading font-medium text-sm group-hover:text-gold-700 transition-colors leading-snug">
                        {r.title}
                      </p>
                      <p className="text-xs text-ink/40 mt-1">{r.readTime}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="glass-card p-6 text-center">
                <p className="font-heading font-semibold mb-3">Have a question about this topic?</p>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
                  <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
