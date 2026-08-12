import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Target, Eye, Award, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import CTASection from "@/components/home/CTASection";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Tamil Trading Education is a professional Forex Trading Education and Community empowering traders through quality education, live market analysis and long-term mentorship.",
  path: "/about",
});

const values = [
  { icon: ShieldCheck, title: "Honesty", description: "We teach risk as seriously as reward. No guaranteed-profit claims, ever." },
  { icon: Target, title: "Clarity", description: "Complex concepts broken into simple, structured, sequential lessons." },
  { icon: Award, title: "Consistency", description: "Long-term skill-building over short-term excitement or hype." },
  { icon: Eye, title: "Transparency", description: "Clear course structure, clear pricing, clear expectations from day one." },
];

const milestones = [
  { year: "2019", text: "Weekly live sessions begin with a small group of local Tamil Nadu traders." },
  { year: "2021", text: "Structured Beginner and Intermediate courses launch; community crosses 1,000 members." },
  { year: "2023", text: "Advanced Forex, Price Action, ICT and Psychology courses added; daily market analysis begins." },
  { year: "2026", text: "5,000+ community members and 1,000+ students trained across India." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>Education first. <span className="gold-text">Hype, never.</span></>}
        description="Tamil Trading Education is a professional Forex Trading Education and Community dedicated to helping traders understand the financial markets through structured education, live market analysis, and continuous support."
        image={images.aboutTeam}
        crumbLabel="About Us"
      />

      <section className="section">
        <div className="container grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <span className="eyebrow">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5">
              Why we started Tamil Trading Education
            </h2>
            <p className="text-ink/60 mb-4 leading-relaxed">
              Too many aspiring traders learn from scattered videos and anonymous "signal" groups
              with no accountability. We built Tamil Trading Education to give beginners and
              professionals a single, structured place to learn — grounded in real market
              analysis, honest risk education, and long-term mentorship rather than promises of
              overnight profit.
            </p>
            <p className="text-ink/60 leading-relaxed">
              What began as small live sessions for a handful of local traders has grown into a
              community of thousands, built one honest lesson at a time.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="glass-card p-7">
                <span className="tag-pill mb-4 inline-block">Our Mission</span>
                <p className="font-heading font-semibold text-lg leading-snug">
                  Empower traders through quality, structured education.
                </p>
              </div>
              <div className="glass-card p-7">
                <span className="tag-pill mb-4 inline-block">Our Vision</span>
                <p className="font-heading font-semibold text-lg leading-snug">
                  Build one of India's most trusted Forex Trading communities.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-navy-800/20">
        <div className="container">
          <SectionHeading
            eyebrow="Our Values"
            title={<>What guides every session we teach</>}
            center
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="glass-card p-7 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-5">
                    <v.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                  <p className="text-ink/55 text-sm leading-relaxed">{v.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid lg:grid-cols-2 gap-14">
          <Reveal>
            <span className="eyebrow">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">
              From a small live session to a nationwide community
            </h2>
            <div className="space-y-8 border-l border-ink/10 pl-8">
              {milestones.map((m) => (
                <div key={m.year} className="relative">
                  <span className="absolute -left-[38px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold-500 shadow-[0_0_0_4px_rgba(201,162,75,0.18)]" />
                  <p className="font-heading font-semibold text-gold-700 mb-1">{m.year}</p>
                  <p className="text-ink/60 text-sm leading-relaxed">{m.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-card p-8 md:p-10">
              <span className="eyebrow">Company Registration</span>
              <h3 className="font-heading font-bold text-2xl mb-6">Registered Business Details</h3>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-up shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading font-semibold text-sm">Company Name</p>
                    <p className="text-ink/55 text-sm">{site.name}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-up shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading font-semibold text-sm">GST Number</p>
                    <p className="text-ink/55 text-sm font-mono">{site.gst}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <CheckCircle2 className="w-5 h-5 text-up shrink-0 mt-0.5" />
                  <div>
                    <p className="font-heading font-semibold text-sm">Registered Office Address</p>
                    <p className="text-ink/55 text-sm leading-relaxed">
                      {site.address.line1}, {site.address.line2}, {site.address.line3},{" "}
                      {site.address.district}, {site.address.state} - {site.address.pincode}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-navy-800/20">
        <div className="container">
          <SectionHeading eyebrow="Our Mentors" title={<>Learn from people who trade, not just teach</>} center />
          <div className="grid sm:grid-cols-2 max-w-2xl mx-auto gap-6">
            <Reveal>
              <div className="glass-card overflow-hidden">
                <div className="relative h-56 w-full">
                  <Image src="/mentor-kripson.jpg" alt="Mr. Kripson, Lead Mentor" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold">Mr. Kripson</h3>
                  <p className="text-sm text-ink/50">Lead Mentor · Technical Analysis</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="glass-card overflow-hidden">
                <div className="relative h-56 w-full">
                  <Image src={images.mentorSelva} alt="Mr. RN Selva, Mentor" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold">Mr. RN Selva</h3>
                  <p className="text-sm text-ink/50">Mentor · Risk & Psychology</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Join Us"
        title={<>Become part of a community built on real education</>}
      />
    </>
  );
}
