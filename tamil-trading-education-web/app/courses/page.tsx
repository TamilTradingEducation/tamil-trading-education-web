import type { Metadata } from "next";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/shared/Reveal";
import CourseCarousel from "@/components/courses/CourseCarousel";
import EnrollmentForm from "@/components/forms/EnrollmentForm";
import { buildMetadata, courseSchema } from "@/lib/seo";
import { images } from "@/lib/images";
import { courses } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Forex Courses",
  description:
    "Beginner Forex, Intermediate Forex, Advanced Forex, Price Action, ICT Concepts, Scalping, Swing Trading, Risk Management and Trading Psychology courses for every level of trader.",
  path: "/courses",
});

export default function CoursesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courses.map((c) => courseSchema({ title: c.title, description: c.description }))),
        }}
      />
      <PageHero
        eyebrow="Forex Courses"
        title={<>A learning path for <span className="gold-text">every level</span></>}
        description="Structured, sequential courses — start where you are and build toward professional-level trading, one skill at a time."
        image={images.courseAdvanced}
        crumbLabel="Courses"
      />

      <section className="section">
        <div className="container">
          <CourseCarousel courses={courses} />

          <Reveal>
            <div className="flex gap-4 rounded-xl2 border border-red-400/25 bg-red-500/[0.06] p-5 max-w-4xl mx-auto">
              <AlertTriangle className="w-5 h-5 text-down shrink-0 mt-0.5" />
              <p className="text-sm text-red-800/80">
                All courses are educational in nature. Tamil Trading Education does not guarantee
                trading profits and does not provide personalised investment advice.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="enroll" className="section bg-navy-800/20 scroll-mt-24">
        <div className="container max-w-2xl">
          <div className="text-center mb-10">
            <span className="eyebrow justify-center">Course Enrollment</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Reserve your seat</h2>
            <p className="text-ink/60">
              Fill this in and our team will reach out with batch timings and next steps.
            </p>
          </div>
          <Reveal>
            <EnrollmentForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
