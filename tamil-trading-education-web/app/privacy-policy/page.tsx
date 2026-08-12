import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import Reveal from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/data";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Tamil Trading Education — how we collect, use and protect your information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <span className="gold-text">Policy</span></>}
        description={`Last updated: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`}
        crumbLabel="Privacy Policy"
      />
      <section className="section">
        <div className="container max-w-3xl space-y-10 text-ink/65 leading-relaxed">
          <Reveal>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">1. Information We Collect</h2>
            <p>
              Tamil Trading Education (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects only the information you
              choose to share with us — such as your name, phone number and email address —
              when you fill an inquiry or enrollment form on this website, or contact us via
              WhatsApp, Telegram, email or phone. We do not collect payment card details through
              this website.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information you provide solely to respond to your inquiry, provide
              course and batch details, process enrollment requests, and share relevant community
              or market-update communications you have opted into. We do not sell or rent your
              personal information to third parties.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">3. Cookies & Analytics</h2>
            <p>
              This website may use standard analytics cookies to understand aggregate traffic
              patterns and improve site performance. No personally identifiable information is
              sold based on this data.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">4. Third-Party Widgets</h2>
            <p>
              Live market data on this website is provided via embedded TradingView widgets.
              TradingView may process standard technical data (such as IP address and browser
              type) in accordance with its own privacy policy, independent of Tamil Trading
              Education.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">5. Data Retention & Your Rights</h2>
            <p>
              We retain inquiry and enrollment information only as long as necessary to respond
              to you and maintain accurate business records. You may request that we delete your
              personal information at any time by contacting us at{" "}
              <a href={`tel:${site.phoneRaw}`} className="text-gold-700 underline">{site.phone}</a>.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <h2 className="text-xl font-heading font-bold text-ink mb-3">6. Contact</h2>
            <p>
              For any privacy-related questions, contact us at{" "}
              <a href={`tel:${site.phoneRaw}`} className="text-gold-700 underline">{site.phone}</a>{" "}
              or via WhatsApp.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
