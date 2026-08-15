"use client";

import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Carousel3D from "@/components/shared/Carousel3D";
import Tilt3D from "@/components/shared/Tilt3D";
import { vipBenefits } from "@/lib/data";

/**
 * VIP benefit modules.
 *
 * Mobile  → shared Carousel3D in `deck` mode (stacked 3D modules, swipeable).
 * Desktop → 3D tilt grid via the existing Tilt3D wrapper.
 *
 * Both paths render the same `BenefitCard`, so there's a single source of
 * truth for the visual design.
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
    <>
      <div className="lg:hidden">
        <Carousel3D
          items={cards}
          variant="deck"
          ariaLabel="VIP benefits"
          heightClass="h-[300px]"
          cardWidthClass="w-[84%] sm:w-[64%]"
        />
      </div>

      <div className="hidden lg:grid grid-cols-2 xl:grid-cols-4 gap-6">
        {vipBenefits.map((b, i) => (
          <Tilt3D key={b.title} delay={i * 0.06} intensity={9} entryRotate={14}>
            <BenefitCard {...b} />
          </Tilt3D>
        ))}
      </div>
    </>
  );
}
