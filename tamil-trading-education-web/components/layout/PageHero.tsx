import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/shared/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  image?: string;
  crumbLabel: string;
}

export default function PageHero({ eyebrow, title, description, image, crumbLabel }: PageHeroProps) {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden border-b border-ink/10">
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image src={image} alt="" fill priority className="object-cover opacity-[0.14]" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/85 to-navy-950" />
        </div>
      )}
      <div className="absolute -z-10 top-[-140px] right-[10%] w-80 h-80 rounded-full bg-gold-500/20 blur-[110px]" />
      <div className="absolute -z-10 bottom-[-160px] left-[5%] w-72 h-72 rounded-full bg-electric-500/20 blur-[110px]" />

      <div className="container">
        <p className="font-mono text-xs tracking-wider text-ink/40 mb-6">
          <Link href="/" className="hover:text-gold-700">Home</Link> / <span className="text-gold-700">{crumbLabel}</span>
        </p>
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05] mb-5 max-w-3xl">
            {title}
          </h1>
          <p className="text-lg text-ink/60 max-w-2xl">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
