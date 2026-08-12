import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import FAQAccordion from "@/components/shared/FAQAccordion";
import Reveal from "@/components/shared/Reveal";
import CTASection from "@/components/home/CTASection";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { images } from "@/lib/images";
import { faqs } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about Forex trading, our courses, VIP community and broker account assistance.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }}
      />
      <PageHero
        eyebrow="FAQ"
        title={<>Common <span className="gold-text">questions</span>, answered honestly</>}
        description="Everything you need to know before joining a course or our trading community."
        image={images.modernOffice}
        crumbLabel="FAQ"
      />

      <section className="section">
        <div className="container max-w-3xl">
          <Reveal>
            <FAQAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Still Have Questions?"
        title={<>Our team is happy to answer anything we haven&apos;t covered</>}
      />
    </>
  );
}
