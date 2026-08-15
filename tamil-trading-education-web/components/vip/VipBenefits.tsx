"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ResponsiveCards from "@/components/shared/ResponsiveCards";
import { vipBenefits } from "@/lib/data";

/**
 * VIP benefit modules.
 *
 * MOBILE  → stacked 3D deck, swipeable.
 * DESKTOP  → clean centred 4-column grid.
 * Both render the same `BenefitCard`, so there's one source of truth.
 */
function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  const Icon = (Icons as unknown as Record<string, LucideIcon>)[icon] ?? Icons.Sparkles;
  return (
    <div className="glass-card card-notch h-full p-6 sm:p-7 flex flex-col justify-center border border-navy-500/25">
      <div className="w-[52px] h-[52px] rounded-xl2 bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 mb-4 shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="font-heading font-semibold text-lg sm:text-xl mb-2 min-w-0">{title}</h3>
      <p className="text-ink/55 text-sm leading-relaxed min-w-0">{description}</p>
    </div>
  );
}

export default function VipBenefits() {
  const cards = vipBenefits.map((b) => <BenefitCard key={b.title} {...b} />);

  return (
    <ResponsiveCards
      items={cards}
      variant="deck"
      desktopCols={4}
      ariaLabel="VIP benefits"
      carouselHeightClass="h-[300px]"
      carouselCardWidthClass="w-[84%] sm:w-[62%]"
    />
  );
}
