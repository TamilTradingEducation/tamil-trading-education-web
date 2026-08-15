"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Trophy } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import Carousel3D from "@/components/shared/Carousel3D";
import { images } from "@/lib/images";

/**
 * IMPORTANT — these are deliberately DIFFERENT people and DIFFERENT topics
 * from `testimonials` in lib/data.ts (which powers the /testimonials page).
 * Previously Ramesh K., Priya S. and Karthik B. appeared in both places,
 * which made the site look like it only had three students.
 *
 * Split of subject matter:
 *  - Success Stories (here) = concrete milestones and outcomes achieved.
 *  - Testimonials (/testimonials) = opinions on teaching, community, support.
 */
const stories = [
  {
    name: "Vignesh R.",
    location: "Erode, Tamil Nadu",
    image: images.studentsLearning,
    rating: 5,
    milestone: "Passed a funded-account evaluation in 4 months",
    detail:
      "Came in with no market background at all. Worked through the Beginner and Intermediate tracks in sequence, then cleared a proprietary firm's demo evaluation on his second attempt.",
  },
  {
    name: "Meena L.",
    location: "Thanjavur, Tamil Nadu",
    image: images.tradingClassroom,
    rating: 5,
    milestone: "Cut her average drawdown by more than half",
    detail:
      "Rebuilt her position sizing and stop-loss rules from scratch after the Risk Management specialisation. Same strategy, far less account volatility month to month.",
  },
  {
    name: "Ashok P.",
    location: "Vellore, Tamil Nadu",
    image: images.professionalTrader,
    rating: 4,
    milestone: "Trades part-time around a full-time job",
    detail:
      "Used the Swing Trading course to build a routine that needs about thirty minutes of chart time each evening — no watching screens through the working day.",
  },
  {
    name: "Kavitha D.",
    location: "Tiruppur, Tamil Nadu",
    image: images.businessMeeting,
    rating: 5,
    milestone: "Six straight months of following her own plan",
    detail:
      "Her breakthrough wasn't a strategy change — it was finally sticking to one. The accountability check-ins in the VIP community were what made the difference.",
  },
  {
    name: "Naveen S.",
    location: "Dindigul, Tamil Nadu",
    image: images.multipleMonitors,
    rating: 4,
    milestone: "Moved from random entries to a written playbook",
    detail:
      "Documented three specific XAUUSD setups he actually understands, and stopped taking everything else. Fewer trades, far clearer results to review.",
  },
  {
    name: "Bhuvana T.",
    location: "Kanyakumari, Tamil Nadu",
    image: images.modernOffice,
    rating: 5,
    milestone: "Recovered discipline after a costly losing streak",
    detail:
      "Came back from a rough stretch by dropping to minimum size for eight weeks while rebuilding her process — then scaled up only once the numbers justified it.",
  },
];

/**
 * 3D treatment: "coverflow" — the active story sits flat and centred, the
 * neighbours are pushed back and rotated away in 3D space. Swipeable by
 * touch or mouse drag on every device, with arrows and dots as alternatives.
 */
export default function SuccessStories() {
  const cards = stories.map((s) => (
    <div
      key={s.name}
      className="glass-card card-notch overflow-hidden h-full flex flex-col sm:flex-row select-none"
    >
      <div className="relative h-32 sm:h-auto sm:w-2/5 shrink-0">
        <Image
          src={s.image}
          alt={s.name}
          fill
          draggable={false}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-navy-950 via-navy-950/10 to-transparent" />
      </div>
      <div className="p-5 sm:p-6 flex-grow flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-2 mb-2.5">
          <span className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, k) => (
              <Star
                key={k}
                className={`w-3.5 h-3.5 ${
                  k < s.rating ? "fill-gold-400 text-gold-400" : "text-ink/20"
                }`}
              />
            ))}
          </span>
          <span className="font-mono text-xs text-ink/50">{s.rating.toFixed(1)}</span>
        </div>
        <p className="font-heading font-semibold text-gold-700 mb-2 flex items-start gap-2 text-sm sm:text-base">
          <Trophy className="w-4 h-4 mt-0.5 shrink-0" />
          <span className="min-w-0">{s.milestone}</span>
        </p>
        <p className="text-ink/55 text-sm leading-relaxed break-words">{s.detail}</p>
        <p className="mt-3 text-sm font-heading text-ink/70">
          — {s.name}
          <span className="text-ink/40 font-body text-xs"> · {s.location}</span>
        </p>
      </div>
    </div>
  ));

  return (
    <section className="section bg-navy-800/20 overflow-x-clip">
      <div className="container">
        <SectionHeading
          eyebrow="Student Success Stories"
          title={
            <>
              Real milestones from <span className="gold-text">real students</span>
            </>
          }
          description="Concrete outcomes our students have reached — not opinions, but things that actually changed in how they trade."
          center
        />

        <Carousel3D
          items={cards}
          variant="panel"
          ariaLabel="Student success stories"
          heightClass="h-[440px] sm:h-[380px] md:h-[350px]"
          cardWidthClass="w-[90%] sm:w-[82%] md:w-[72%]"
        />

        <div className="text-center mt-9">
          <Link href="/testimonials" className="btn-3d">
            Read Student Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}
