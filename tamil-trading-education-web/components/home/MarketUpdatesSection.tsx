import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import { blogPosts } from "@/lib/data";

export default function MarketUpdatesSection() {
  return (
    <section className="section bg-navy-800/20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
          <SectionHeading
            eyebrow="Latest Market Updates"
            title={
              <>
                Insight from our <span className="gold-text">mentor desk</span>
              </>
            }
          />
          <Link href="/blog" className="btn-outline mb-14 hidden sm:inline-flex">
            Visit the Blog
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link href={`/blog/${post.slug}`} className="glass-card overflow-hidden h-full flex flex-col group">
                <div className="relative h-44 w-full overflow-hidden">
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
                  <h3 className="font-heading font-semibold leading-snug mb-2 group-hover:text-gold-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-ink/50 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
                  <span className="mt-4 flex items-center gap-1.5 text-sm text-gold-700 font-heading">
                    Read More <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
