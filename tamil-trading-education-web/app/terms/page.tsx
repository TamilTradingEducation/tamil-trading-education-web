import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "Terms & Conditions for using Tamil Trading Education's courses, community and website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Terms & <span className="gold-text">Conditions</span></>}
        description={`Last updated: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`}
        crumbLabel="Terms & Conditions"
      />
      <section className="section">
        <div className="container max-w-3xl space-y-10 text-ink/65 leading-relaxed">
          <Reveal>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing this website, enrolling in a course, or joining our WhatsApp/Telegram
              community, you agree to be bound by these Terms & Conditions and our{" "}
              <a href="/risk-disclaimer" className="text-gold-700 underline">Risk Disclaimer</a>.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">2. Educational Purpose Only</h2>
            <p>
              All courses, live sessions, market analysis, and community content provided by
              {" "}{site.name} are for educational purposes only. Nothing on this website
              constitutes financial, investment, tax or legal advice.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">3. Use of Content</h2>
            <p>
              Course materials, live session recordings and community content are licensed for
              your personal educational use only. They may not be redistributed, resold, or
              publicly shared without written permission from {site.name}.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">4. Community Conduct</h2>
            <p>
              We reserve the right to remove any member from our community channels whose
              conduct is disrespectful, disruptive, or violates the spirit of a supportive
              learning environment, without refund of any associated fees.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">5. Fees & Refunds</h2>
            <p>
              Fees paid for structured courses are subject to the refund terms communicated in
              writing at the time of enrollment. In the absence of a specific written refund
              policy for a course, fees are generally non-refundable once live session access has
              been granted.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">6. No Guarantee of Results</h2>
            <p>
              {site.name} does not guarantee trading profits, account performance, or any
              specific financial outcome as a result of completing a course or participating in
              our community. Trading outcomes depend on numerous factors outside our control.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, {site.name} shall not be liable for any
              trading losses, indirect, incidental or consequential damages arising from your use
              of our educational content, community, or website.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">8. Governing Law</h2>
            <p>
              These terms are governed by the laws of India, with courts in Tenkasi District,
              Tamil Nadu, having jurisdiction over any dispute.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
