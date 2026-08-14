import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle, Send, Users, Radio, LineChart, ShieldCheck, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import Reveal from "@/components/shared/Reveal";
import CardSwiper from "@/components/shared/CardSwiper";
import CTASection from "@/components/home/CTASection";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "VIP Community",
  description:
    "Join the Tamil Trading Education VIP Community — daily market discussion, mentor access, live sessions and an active, accountable trading circle.",
  path: "/vip-community",
});

const perks = [
  { icon: Radio, title: "Daily Live Sessions", description: "Mentors break down live charts across major pairs, gold and indices every weekday." },
  { icon: Users, title: "Active Peer Group", description: "Discuss setups and ideas with hundreds of serious, like-minded traders in real time." },
  { icon: LineChart, title: "Priority Market Calls", description: "Get educational bias and structure notes before major sessions open." },
  { icon: ShieldCheck, title: "Accountability Check-ins", description: "Weekly reviews to keep your risk management and trading journal on track." },
];

const included = [
  "Private VIP Telegram & WhatsApp channels",
  "Daily market analysis and session recaps",
  "Direct mentor Q&A windows",
  "Monthly live group coaching call",
  "Priority access to new course releases",
  "A respectful, actively-moderated environment",
];

export default function VipCommunityPage() {
  return (
    <>
      <PageHero
        eyebrow="VIP Community"
        title={<>A community that actually <span className="gold-text">shows up</span></>}
        description="Trading can be isolating. Our VIP Community gives you daily market discussion, mentor access, and traders who hold each other accountable."
        image={images.vipCommunity}
        crumbLabel="VIP Community"
      />

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="What You Get" title={<>Built for traders who want more than a group chat</>} center />
          <CardSwiper gridClass="sm:grid-cols-2 lg:grid-cols-4" maxAngle={24}>
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07}>
                <div className="glass-card p-7 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-5">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-ink/55 text-sm leading-relaxed">{p.description}</p>
                </div>
              </Reveal>
            ))}
          </CardSwiper>
        </div>
      </section>

      <section className="section bg-navy-800/20">
        <div className="container grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative rounded-xl2 overflow-hidden h-96">
              <Image src={images.businessMeeting} alt="Traders discussing markets together" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">What&apos;s Included</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Everything inside the VIP Community
            </h2>
            <ul className="space-y-4 mb-9">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-ink/65">
                  <CheckCircle2 className="w-5 h-5 text-up shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-4">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle className="w-4 h-4" /> Join via WhatsApp
              </a>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn-telegram">
                <Send className="w-4 h-4" /> Join via Telegram
              </a>
              <a href={site.telegramDirect} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Send className="w-4 h-4" /> Message Kripson Directly
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to Join?"
        title={<>Your seat in the community is one message away</>}
        description="Reach out on WhatsApp or Telegram and our team will walk you through VIP access."
      />
    </>
  );
}
