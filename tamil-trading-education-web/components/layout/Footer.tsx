import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Instagram, Youtube, LineChart, Twitter, MessageCircle, Send } from "lucide-react";
import { site, footerLinks } from "@/lib/data";

const socials = [
  { href: site.whatsapp, icon: MessageCircle, label: "WhatsApp" },
  { href: site.telegram, icon: Send, label: "Telegram" },
  { href: site.instagram, icon: Instagram, label: "Instagram" },
  { href: site.youtube, icon: Youtube, label: "YouTube" },
  { href: site.tradingview, icon: LineChart, label: "TradingView" },
  { href: site.x, icon: Twitter, label: "X" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-frame-950 pt-20 pb-8">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <span className="w-10 h-10 rounded-full overflow-hidden bg-white shrink-0 ring-1 ring-gold-500/30">
                <Image
                  src="/logo.png"
                  alt="Tamil Trading Education logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover object-top scale-125"
                />
              </span>
              <span className="font-heading font-bold text-[15px] text-white">{site.name}</span>
            </Link>
            <p className="text-white/50 text-sm max-w-xs leading-relaxed">
              Structured Forex education, live market analysis and a premium trading community
              built for beginners, professionals and working individuals across India.
            </p>
            <div className="flex gap-2.5 mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/60 hover:text-gold-300 hover:border-gold-500/50 hover:-translate-y-0.5 transition-all"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-gold-300 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/55 text-sm hover:text-gold-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-gold-300 mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/55 text-sm hover:text-gold-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-gold-300 mb-5">Reach Us</h4>
            <ul className="space-y-4 text-sm text-white/55">
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" />
                <a href={`tel:${site.phoneRaw}`} className="hover:text-gold-300">{site.phone}</a>
              </li>
              {site.email && (
                <li className="flex gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" />
                  <a href={`mailto:${site.email}`} className="hover:text-gold-300">{site.email}</a>
                </li>
              )}
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gold-400 shrink-0" />
                <span>
                  {site.address.line1}, {site.address.line2}, {site.address.line3},{" "}
                  {site.address.district}, {site.address.state} - {site.address.pincode}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/40">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved. &nbsp;|&nbsp; GST: {site.gst}
          </span>
          <span>Educational content only. Trading involves risk.</span>
        </div>
      </div>
    </footer>
  );
}
