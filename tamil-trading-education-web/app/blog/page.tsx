import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Educational articles on technical analysis, risk management, trading psychology and Smart Money Concepts from Tamil Trading Education mentors.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={<>Learn something new <span className="gold-text">every visit</span></>}
        description="In-depth, jargon-free articles from our mentor desk — on technical analysis, risk management, psychology and Smart Money Concepts."
        image={images.blogChart2}
        crumbLabel="Blog"
      />

      <section className="section">
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.07}>
              <Link href={`/blog/${post.slug}`} className="glass-card overflow-hidden h-full flex flex-col group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <span className="tag-pill w-fit mb-3">{post.category}</span>
                  <h2 className="font-heading font-semibold leading-snug mb-2 group-hover:text-gold-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-ink/50 text-sm leading-relaxed flex-grow mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-ink/40 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5 text-sm text-gold-700 font-heading">
                    Read Article <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
