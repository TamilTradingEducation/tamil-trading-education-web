import type { Metadata } from "next";
import { Phone, Mail, MapPin, Building2, FileText, ExternalLink } from "lucide-react";
import { Instagram, Youtube, LineChart, Twitter, MessageCircle, Send } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/shared/Reveal";
import ContactForm from "@/components/forms/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Contact Tamil Trading Education for course enrollment, community access, or partnership inquiries. Find our registered address, GST details and map location.",
  path: "/contact",
});

const socials = [
  { href: site.instagram, icon: Instagram, label: "Instagram" },
  { href: site.youtube, icon: Youtube, label: "YouTube" },
  { href: site.tradingview, icon: LineChart, label: "TradingView" },
  { href: site.x, icon: Twitter, label: "X" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s talk <span className="gold-text">trading</span></>}
        description="Questions about a course, the community, or partnership support — reach out and our team will respond promptly."
        image={images.contactOffice}
        crumbLabel="Contact"
      />

      <section className="section">
        <div className="container grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <span className="eyebrow">Get In Touch</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">Contact information</h2>

            <ul className="space-y-6 mb-9">
              <li className="flex gap-4">
                <span className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 shrink-0">
                  <Building2 className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-sm">{site.name}</p>
                  <p className="text-ink/50 text-sm">{site.businessType}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 shrink-0">
                  <FileText className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-sm">GST Number</p>
                  <p className="text-ink/50 text-sm font-mono">{site.gst}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-sm">Registered Address</p>
                  <p className="text-ink/50 text-sm leading-relaxed">
                    {site.address.line1}, {site.address.line2}, {site.address.line3},{" "}
                    {site.address.district}, {site.address.state} - {site.address.pincode}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 shrink-0">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold text-sm">Phone</p>
                  <a href={`tel:${site.phoneRaw}`} className="text-ink/50 text-sm hover:text-gold-700">{site.phone}</a>
                </div>
              </li>
              {site.email && (
                <li className="flex gap-4">
                  <span className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 shrink-0">
                    <Mail className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-heading font-semibold text-sm">Email</p>
                    <a href={`mailto:${site.email}`} className="text-ink/50 text-sm hover:text-gold-700">{site.email}</a>
                  </div>
                </li>
              )}
            </ul>

            <div className="flex flex-wrap gap-3 mb-6">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn-telegram">
                <Send className="w-4 h-4" /> Telegram Channel
              </a>
              <a href={site.telegramDirect} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <Send className="w-4 h-4" /> Chat Directly with Kripson
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl border border-ink/10 flex items-center justify-center text-ink/60 hover:text-gold-700 hover:border-gold-500/50 hover:-translate-y-0.5 transition-all"
                  aria-label={s.label}
                >
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <div>
                <span className="eyebrow">Find Us</span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold">Our registered location</h2>
              </div>
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm"
              >
                Open in Google Maps <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="rounded-xl2 overflow-hidden border border-ink/10 shadow-soft grayscale-[15%] contrast-[1.05]">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapEmbedQuery)}&output=embed`}
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tamil Trading Education Location Map"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
