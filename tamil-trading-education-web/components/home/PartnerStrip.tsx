import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { ibPartners } from "@/lib/data";

export default function PartnerStrip() {
  return (
    <div className="border-y border-gold-500/15 bg-gold-500/[0.04]">
      <div className="container py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <span className="flex items-center gap-2 text-sm font-heading font-semibold text-gold-700">
          <BadgeCheck className="w-4 h-4" /> Official IB Partner
        </span>
        <span className="hidden sm:block w-px h-4 bg-ink/15" />
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-ink/60 font-heading">
          {ibPartners.map((p) => (
            <span key={p.name}>{p.name}</span>
          ))}
        </div>
        <span className="hidden sm:block w-px h-4 bg-ink/15" />
        <Link href="/broker-assistance" className="text-sm font-heading font-semibold text-gold-700 hover:text-gold-800 transition-colors">
          Get Free VIP Access →
        </Link>
      </div>
    </div>
  );
}
