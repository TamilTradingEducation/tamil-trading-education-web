"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, CalendarCheck } from "lucide-react";
import { navLinks, site } from "@/lib/data";

// Primary items stay inline; the rest live in a "More" dropdown so the bar
// never overflows, no matter how many pages get added later.
const PRIMARY_COUNT = 7;
const primaryLinks = navLinks.slice(0, PRIMARY_COUNT);
const moreLinks = navLinks.slice(PRIMARY_COUNT);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const isMoreActive = moreLinks.some((l) => l.href === pathname);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 backdrop-blur-xl bg-frame-950/85 border-b border-white/10 ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group shrink-0 mr-6 2xl:mr-10">
          <span className="w-11 h-11 rounded-full overflow-hidden bg-white shrink-0 ring-1 ring-gold-500/30">
            <Image
              src="/logo.png"
              alt="Tamil Trading Education logo"
              width={88}
              height={88}
              className="w-full h-full object-cover object-top scale-125"
              priority
            />
          </span>
          <span className="font-heading font-bold leading-tight">
            <span className="block text-[15px] text-white whitespace-nowrap">{site.name}</span>
            <span className="hidden 2xl:block text-[10px] font-mono tracking-[0.16em] uppercase text-gold-300 font-normal whitespace-nowrap">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden 2xl:flex items-center gap-1 2xl:gap-2" style={{ perspective: 800 }}>
          {primaryLinks.map((link) => (
            <motion.div
              key={link.href}
              whileHover={{ y: -3, rotateX: -14, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              <Link
                href={link.href}
                className={`relative block px-3 py-1.5 rounded-lg text-[13px] 2xl:text-sm font-heading font-medium whitespace-nowrap transition-colors hover:bg-white/10 ${
                  pathname === link.href ? "text-gold-300" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-3 right-3 -bottom-0.5 h-px bg-gold-500"
                  />
                )}
              </Link>
            </motion.div>
          ))}

          {moreLinks.length > 0 && (
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setMoreOpen((v) => !v)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] 2xl:text-sm font-heading font-medium whitespace-nowrap transition-colors hover:bg-white/10 ${
                  isMoreActive ? "text-gold-300" : "text-white/70 hover:text-white"
                }`}
              >
                More
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-3 w-44 rounded-xl border border-white/10 bg-frame-900/95 backdrop-blur-xl shadow-soft py-2 z-50"
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2.5 text-sm font-heading transition-colors ${
                          pathname === link.href ? "text-gold-300" : "text-white/75 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        <div className="hidden 2xl:flex items-center gap-3 shrink-0 ml-6">
          <Link
            href="/contact"
            className="btn-gold relative text-sm py-3 px-5 whitespace-nowrap shadow-[0_0_0_0_rgba(201,162,75,0.55)] animate-[pulseGlow_2.4s_ease-in-out_infinite] hover:scale-105"
          >
            <CalendarCheck className="w-4 h-4" />
            Book Free Consultation
          </Link>
        </div>

        <button
          className="2xl:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-white/15 shrink-0 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="2xl:hidden overflow-hidden border-t border-white/10 bg-frame-950"
          >
            <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 flex flex-col gap-1 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 text-base font-heading font-medium border-b border-white/5 ${
                    pathname === link.href ? "text-gold-300" : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" className="btn-gold w-full mt-5">
                <CalendarCheck className="w-4 h-4" />
                Book Free Consultation
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
