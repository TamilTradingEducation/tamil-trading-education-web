import Reveal from "@/components/shared/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  center?: boolean;
}

export default function SectionHeading({ eyebrow, title, description, center }: SectionHeadingProps) {
  return (
    <Reveal className={center ? "max-w-2xl mx-auto text-center mb-14" : "max-w-2xl mb-14"}>
      <span className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</span>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-4">
        {title}
      </h2>
      {description && <p className="text-ink/60 text-lg">{description}</p>}
    </Reveal>
  );
}
