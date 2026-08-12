import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center text-center px-6">
      <div>
        <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-700 mx-auto mb-6">
          <Compass className="w-8 h-8" />
        </div>
        <p className="font-mono text-gold-700 text-sm tracking-widest mb-3">ERROR 404</p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">This page moved markets.</h1>
        <p className="text-ink/55 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist. Let's get you back to something useful.
        </p>
        <Link href="/" className="btn-gold">Back to Home</Link>
      </div>
    </section>
  );
}
